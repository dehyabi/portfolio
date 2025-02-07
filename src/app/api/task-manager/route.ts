import { NextRequest, NextResponse } from 'next/server';
import { TaskManagerRepository } from '@/lib/repositories/task-manager.repository';
import { Task } from '@/lib/interfaces/task-manager.interface';
import { checkRouteSecret } from '@/lib/auth/middleware';

const repository = new TaskManagerRepository();

export async function GET(request: NextRequest) {
  try {
    // Fetch tasks
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const projectId = searchParams.get('projectId');

    const filter: Partial<Task> = {};
    if (status) filter.status = status as Task['status'];
    if (projectId) filter.projectId = projectId;

    const tasks = await repository.getAll(filter);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Tasks Retrieval Error:', error);
    return NextResponse.json({ 
      error: 'Failed to retrieve tasks',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Check route secret first
  const authResult = checkRouteSecret(request);
  if (authResult) return authResult;

  try {
    // Log the incoming request body for debugging
    const rawBody = await request.text();
    console.log('Incoming Request Body:', rawBody);

    // Parse the JSON manually
    let task: Task;
    try {
      task = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('JSON Parsing Error:', parseError);
      return NextResponse.json({ 
        error: 'Invalid JSON', 
        details: parseError instanceof Error ? parseError.message : 'Unknown parsing error' 
      }, { status: 400 });
    }

    // Validate required fields
    const requiredFields: (keyof Task)[] = ['title', 'status'];
    const missingFields = requiredFields.filter(field => !task[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: 'Missing required fields', 
        missingFields 
      }, { status: 400 });
    }

    // Ensure date is set if not provided
    task.createdAt = task.createdAt || new Date();
    task.updatedAt = new Date();

    // Attempt to create the task
    const createdTask = await repository.create(task);
    
    return NextResponse.json(createdTask, { status: 201 });
  } catch (error) {
    // Log the full error for server-side debugging
    console.error('Task Creation Error:', {
      errorName: error instanceof Error ? error.name : 'Unknown Error',
      errorMessage: error instanceof Error ? error.message : 'No error message',
      errorStack: error instanceof Error ? error.stack : 'No stack trace'
    });

    // Return a generic error response
    return NextResponse.json({ 
      error: 'Failed to create task',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}