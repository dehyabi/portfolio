import { NextRequest, NextResponse } from 'next/server';
import { checkRouteSecret } from '@/lib/auth/middleware';
import { ResumeBuilderRepository } from '@/lib/repositories/resume-builder.repository';
import { Resume } from '@/lib/interfaces/resume-builder.interface';

const repository = new ResumeBuilderRepository();

export async function GET(request: NextRequest) {
  try {
    // Removed route secret check for public access
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const resumes = await repository.getAll(userId ? { userId } : {});

    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Resumes Retrieval Error:', error);
    return NextResponse.json({ 
      error: 'Failed to retrieve resumes',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Keep route secret check for POST method
  const authResult = checkRouteSecret(request);
  if (authResult) return authResult;

  try {
    // Log the incoming request body for debugging
    const rawBody = await request.text();
    console.log('Incoming Resume Request Body:', rawBody);

    // Parse the JSON manually
    let resume: Resume;
    try {
      resume = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('JSON Parsing Error:', parseError);
      return NextResponse.json({ 
        error: 'Invalid JSON', 
        details: parseError instanceof Error ? parseError.message : 'Unknown parsing error' 
      }, { status: 400 });
    }

    // Validate required fields
    const requiredFields: (keyof Resume)[] = ['userId', 'personalInfo', 'education', 'workExperience', 'skills'];
    const missingFields = requiredFields.filter(field => !resume[field]);

    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: 'Missing required fields', 
        details: missingFields 
      }, { status: 400 });
    }

    // Set timestamps
    resume.createdAt = new Date();
    resume.updatedAt = new Date();

    const savedResume = await repository.create(resume);

    return NextResponse.json({ 
      message: 'Resume created successfully',
      data: savedResume 
    }, { status: 201 });
  } catch (error) {
    console.error('Resume Creation Error:', error);
    return NextResponse.json({ 
      error: 'Failed to create resume',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}