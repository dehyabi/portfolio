import { NextRequest, NextResponse } from 'next/server';
import { FinanceTrackerRepository } from '@/lib/repositories/finance-tracker.repository';
import { FinanceEntry } from '@/lib/interfaces/finance-tracker.interface';
import { MongoDBConnectionManager } from '@/lib/mongodb';
import { checkRouteSecret } from '@/lib/auth/middleware';

const repository = new FinanceTrackerRepository();

export async function POST(request: NextRequest) {
  // Check route secret first
  const authResult = checkRouteSecret(request);
  if (authResult) return authResult;

  try {
    // Log the incoming request body for debugging
    const rawBody = await request.text();
    console.log('Incoming Request Body:', rawBody);

    // Parse the JSON manually
    let entry: FinanceEntry;
    try {
      entry = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('JSON Parsing Error:', parseError);
      return NextResponse.json({ 
        error: 'Invalid JSON', 
        details: parseError instanceof Error ? parseError.message : 'Unknown parsing error' 
      }, { status: 400 });
    }

    // Validate required fields
    const requiredFields: (keyof FinanceEntry)[] = ['amount', 'category', 'type'];
    const missingFields = requiredFields.filter(field => !entry[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: 'Missing required fields', 
        missingFields 
      }, { status: 400 });
    }

    // Ensure date is set if not provided
    entry.date = entry.date || new Date();

    // Attempt to create the entry
    const createdEntry = await repository.create(entry);
    
    return NextResponse.json(createdEntry, { status: 201 });
  } catch (error) {
    // Log the full error for server-side debugging
    console.error('Entry Creation Error:', {
      errorName: error instanceof Error ? error.name : 'Unknown Error',
      errorMessage: error instanceof Error ? error.message : 'No error message',
      errorStack: error instanceof Error ? error.stack : 'No stack trace'
    });

    // Return a generic error response
    return NextResponse.json({ 
      error: 'Failed to create entry',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    const filter: Partial<FinanceEntry> = {};
    if (category) filter.category = category;
    if (type) filter.type = type as 'income' | 'expense';

    const entries = await repository.getAll(filter);
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Entries Retrieval Error:', error);
    return NextResponse.json({ 
      error: 'Failed to retrieve entries',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}