import { NextRequest, NextResponse } from 'next/server';
import { protectedRoute } from '@/lib/auth/middleware';

export async function GET(request: NextRequest) {
  // Apply token protection
  const authResult = await protectedRoute(request);
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