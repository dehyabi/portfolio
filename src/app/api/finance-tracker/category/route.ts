import { NextResponse } from 'next/server';

// Removed server-side category management
export async function GET() {
  return NextResponse.json({ 
    error: 'Category management is now client-side' 
  }, { status: 400 });
}