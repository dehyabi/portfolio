import { NextRequest, NextResponse } from 'next/server';
import { checkRouteSecret } from '@/lib/auth/middleware';

export async function GET(request: NextRequest) {
  // Check route secret
  const authResult = checkRouteSecret(request);
  if (authResult) return authResult;

  try {
    // Your protected route logic here
    return NextResponse.json({ 
      message: 'Finance data accessed successfully',
      data: []
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch finance data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}