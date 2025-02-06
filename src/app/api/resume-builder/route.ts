import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Fetch resume templates or user's resumes
    return NextResponse.json({ 
      message: 'Resume Builder API',
      status: 'operational'
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch resume data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const resumeData = await request.json();
    // Validate and save resume data
    return NextResponse.json({ 
      message: 'Resume created successfully',
      data: resumeData
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to create resume',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 });
  }
}