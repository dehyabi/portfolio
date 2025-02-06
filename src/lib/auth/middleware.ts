import { NextRequest, NextResponse } from 'next/server';

export function checkRouteSecret(req: NextRequest) {
  // Get the route secret from environment variables
  const routeSecret = process.env.ROUTE_SECRET;

  // Get the secret from the request headers
  const requestSecret = req.headers.get('ROUTE_SECRET');

  // Check if either the environment variable or the request secret is missing
  if (!routeSecret) {
    console.error('ROUTE_SECRET is not set in environment variables');
    return NextResponse.json(
      { error: 'Server configuration error' }, 
      { status: 500 }
    );
  }

  // Compare the secrets
  if (!requestSecret || requestSecret !== routeSecret) {
    console.warn('Unauthorized access attempt', {
      expectedSecretLength: routeSecret.length,
      receivedSecret: requestSecret ? 'PRESENT' : 'NOT PROVIDED'
    });

    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    );
  }

  // Secret is valid, allow the request to proceed
  return null;
}