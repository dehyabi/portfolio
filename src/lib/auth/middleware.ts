import { NextRequest, NextResponse } from 'next/server';

export function checkRouteSecret(req: NextRequest) {
  // Get the secret from query parameters or headers
  const routeSecret = req.nextUrl.searchParams.get('secret') || 
                      req.headers.get('x-route-secret');

  // Compare with environment variable
  if (routeSecret !== process.env.JWT_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized access' }, 
      { status: 401 }
    );
  }

  return null;
}