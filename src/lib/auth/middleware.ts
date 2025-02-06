import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function verifyToken(req: NextRequest) {
  // Extract token from Authorization header
  const token = req.headers.get('authorization')?.split('Bearer ')[1];

  if (!token) {
    return NextResponse.json(
      { error: 'No token provided' }, 
      { status: 401 }
    );
  }

  try {
    // Use environment variable for secret key
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    // Verify the token
    const { payload } = await jwtVerify(token, secret);

    // Optional: Additional payload validation
    if (!payload.userId) {
      throw new Error('Invalid token payload');
    }

    return payload;
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid or expired token' }, 
      { status: 401 }
    );
  }
}

// Middleware for protected routes
export async function protectedRoute(req: NextRequest) {
  const tokenPayload = await verifyToken(req);

  // If tokenPayload is a NextResponse, it means verification failed
  if (tokenPayload instanceof NextResponse) {
    return tokenPayload;
  }

  // Token is valid, proceed with the route logic
  return null;
}