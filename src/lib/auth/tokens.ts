import { SignJWT } from 'jose';

export async function generateToken(userId: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secret);
}