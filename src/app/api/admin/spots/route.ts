import { NextRequest, NextResponse } from 'next/server';

// This should be moved to a database in production
let FOUNDING_CREATOR_SPOTS_REMAINING = 88;

export async function GET() {
  return NextResponse.json({
    spotsRemaining: FOUNDING_CREATOR_SPOTS_REMAINING,
    totalSpots: 100
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, adminKey } = body;

    // Simple admin authentication - in production use proper auth
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (action === 'approve_creator') {
      if (FOUNDING_CREATOR_SPOTS_REMAINING > 0) {
        FOUNDING_CREATOR_SPOTS_REMAINING--;
        return NextResponse.json({
          ok: true,
          spotsRemaining: FOUNDING_CREATOR_SPOTS_REMAINING,
          message: 'Creator approved, spots decremented'
        });
      } else {
        return NextResponse.json({
          ok: false,
          error: 'No founding creator spots remaining'
        });
      }
    }

    if (action === 'set_spots') {
      const { spots } = body;
      if (typeof spots === 'number' && spots >= 0 && spots <= 100) {
        FOUNDING_CREATOR_SPOTS_REMAINING = spots;
        return NextResponse.json({
          ok: true,
          spotsRemaining: FOUNDING_CREATOR_SPOTS_REMAINING,
          message: 'Spots updated'
        });
      } else {
        return NextResponse.json({
          ok: false,
          error: 'Invalid spots value'
        });
      }
    }

    return NextResponse.json(
      { ok: false, error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
