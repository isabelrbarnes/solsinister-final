import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllApplications, 
  getApplicationStats, 
  updateApplicationStatus, 
  deleteApplication, 
  setSpotsRemaining, 
  decrementSpots 
} from '@/lib/admin-data';

// Simple auth check
function isAuthorized(req: NextRequest): boolean {
  const adminKey = req.headers.get('x-admin-key') || req.nextUrl.searchParams.get('adminKey');
  return adminKey === process.env.ADMIN_KEY;
}

export async function GET(req: NextRequest) {
  // Check authorization
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid admin key' },
      { status: 401 }
    );
  }

  try {
    const stats = getApplicationStats();
    const applications = getAllApplications();

    return NextResponse.json({
      success: true,
      stats,
      applications,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  // Check authorization
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid admin key' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { action } = body;

    switch (action) {
      case 'approve_creator':
        const { applicationId } = body;
        const stats = getApplicationStats();
        
        if (stats.spotsRemaining > 0) {
          const spotsLeft = decrementSpots();
          const success = updateApplicationStatus(applicationId, 'approved');
          
          if (success) {
            return NextResponse.json({
              success: true,
              message: 'Creator approved and spots decremented',
              spotsRemaining: spotsLeft
            });
          } else {
            return NextResponse.json({
              error: 'Application not found'
            }, { status: 404 });
          }
        } else {
          return NextResponse.json({
            error: 'No founding creator spots remaining'
          }, { status: 400 });
        }

      case 'reject_creator':
        const { rejectionId } = body;
        const success = updateApplicationStatus(rejectionId, 'rejected');
        
        if (success) {
          return NextResponse.json({
            success: true,
            message: 'Creator application rejected'
          });
        } else {
          return NextResponse.json({
            error: 'Application not found'
          }, { status: 404 });
        }

      case 'set_spots':
        const { spots } = body;
        if (typeof spots === 'number' && spots >= 0 && spots <= 100) {
          setSpotsRemaining(spots);
          return NextResponse.json({
            success: true,
            message: 'Spots count updated',
            spotsRemaining: spots
          });
        } else {
          return NextResponse.json({
            error: 'Invalid spots value (must be 0-100)'
          }, { status: 400 });
        }

      case 'delete_application':
        const { deleteId } = body;
        const deleteSuccess = deleteApplication(deleteId);
        
        if (deleteSuccess) {
          return NextResponse.json({
            success: true,
            message: 'Application deleted'
          });
        } else {
          return NextResponse.json({
            error: 'Application not found'
          }, { status: 404 });
        }

      default:
        return NextResponse.json({
          error: 'Invalid action'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Dashboard action error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Note: Application management is now handled by the shared data store in @/lib/admin-data
