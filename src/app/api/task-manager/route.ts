import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Fetch tasks
    return NextResponse.json({ 
      message: 'Task Manager API',
      status: 'operational'
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch tasks',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const taskData = await request.json();
    // Validate and save task
    return NextResponse.json({ 
      message: 'Task created successfully',
      data: taskData
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to create task',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 });
  }
}