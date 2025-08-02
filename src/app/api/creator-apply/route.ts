import { NextRequest, NextResponse } from 'next/server';
import { addApplication, getSpotsRemaining } from '@/lib/admin-data';

interface CreatorApplicationInput {
  name: string;
  email: string;
  subCount: string;
  platformLink: string;
  agency?: string;
  kinkContentType?: string[];
  location?: string;
  additionalInfo?: string;
  ip?: string;
  country?: string;
  timestamp?: string;
}

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip);

  if (!clientData || now - clientData.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  clientData.count++;
  return false;
}

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || '127.0.0.1';
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string, maxLength: number = 1000): string {
  return input.trim().substring(0, maxLength);
}

async function getCountryFromIP(ip: string): Promise<string> {
  try {
    const geoipUrl = process.env.GEOIP_API_URL;
    if (geoipUrl) {
      const response = await fetch(`${geoipUrl}/${ip}`);
      if (response.ok) {
        const data = await response.json();
        return data.country || '';
      }
    }
  } catch (error) {
    console.error('Error fetching country from IP:', error);
  }
  return '';
}

async function saveToGoogleSheets(data: CreatorApplicationInput): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets webhook failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
}

async function saveToSupabase(data: CreatorApplicationInput): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) return;

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/creator_waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        sub_count: data.subCount,
        platform_links: Array.isArray(data.platformLink) ? data.platformLink : data.platformLink.split('\n').map(link => link.trim()).filter(Boolean),
        agency: data.agency,
        kink_types: data.kinkContentType,
        location: data.location,
        ip: data.ip,
        country: data.country,
        timestamp: data.timestamp,
        additional_info: data.additionalInfo,
      }),
    });

    if (!response.ok) {
      throw new Error(`Supabase insert failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error saving to Supabase:', error);
    throw error;
  }
}

async function sendNotificationEmail(data: CreatorApplicationInput): Promise<void> {
  const notifyEmail = process.env.NOTIFY_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;
  
  if (!notifyEmail || !resendApiKey) return;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'noreply@solsinister.com',
        to: notifyEmail,
        subject: 'New Creator Application — SolSinister',
        html: `
          <h2>New Creator Application</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subscriber Count:</strong> ${data.subCount}</p>
          <p><strong>Platform Links:</strong></p>
          <pre>${data.platformLink}</pre>
          <p><strong>Agency:</strong> ${data.agency || 'N/A'}</p>
          <p><strong>Content Types:</strong> ${data.kinkContentType?.join(', ') || 'N/A'}</p>
          <p><strong>Location:</strong> ${data.location || 'N/A'}</p>
          <p><strong>Additional Info:</strong> ${data.additionalInfo || 'N/A'}</p>
          <p><strong>IP:</strong> ${data.ip}</p>
          <p><strong>Country:</strong> ${data.country}</p>
          <p><strong>Timestamp:</strong> ${data.timestamp}</p>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email notification failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error sending notification email:', error);
    // Don't throw here - email notification failure shouldn't block the application
  }
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP and check rate limiting
    const clientIP = getClientIP(req);
    
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await req.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.subCount || !body.platformLink) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get country from Cloudflare header or IP lookup
    let country = req.headers.get('cf-ipcountry') || '';
    if (!country) {
      country = await getCountryFromIP(clientIP);
    }

    // Sanitize and prepare data
    const applicationData: CreatorApplicationInput = {
      name: sanitizeInput(body.name, 100),
      email: sanitizeInput(body.email, 255),
      subCount: sanitizeInput(body.subCount, 50),
      platformLink: sanitizeInput(body.platformLink, 2000),
      agency: body.agency ? sanitizeInput(body.agency, 100) : undefined,
      kinkContentType: Array.isArray(body.kinkContentType) ? body.kinkContentType : [],
      location: body.location ? sanitizeInput(body.location, 200) : undefined,
      additionalInfo: body.additionalInfo ? sanitizeInput(body.additionalInfo, 1000) : undefined,
      ip: clientIP,
      country,
      timestamp: new Date().toISOString(),
    };

    // Save to configured services
    const savePromises: Promise<void>[] = [];
    
    if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      savePromises.push(saveToGoogleSheets(applicationData));
    }
    
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      savePromises.push(saveToSupabase(applicationData));
    }

    // Wait for all saves to complete
    await Promise.all(savePromises);

    // Store application in shared tracking system
    const applicationId = addApplication(applicationData);

    // Send notification email (non-blocking)
    if (process.env.NOTIFY_EMAIL && process.env.RESEND_API_KEY) {
      sendNotificationEmail(applicationData).catch(console.error);
    }

    return NextResponse.json({ ok: true, applicationId });

  } catch (error) {
    console.error('Error processing creator application:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return current spots remaining for dynamic updates
  return NextResponse.json({
    spotsRemaining: getSpotsRemaining(),
    totalSpots: 100
  });
}
