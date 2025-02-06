import { NextRequest, NextResponse } from 'next/server';
import { FinanceTrackerRepository } from '@/lib/repositories/finance-tracker.repository';
import { FinanceEntry } from '@/lib/interfaces/finance-tracker.interface';
import { MongoDBConnectionManager } from '@/lib/mongodb';

const repository = new FinanceTrackerRepository();

export async function POST(request: NextRequest) {
  try {
    const entry: FinanceEntry = await request.json();
    const createdEntry = await repository.create(entry);
    return NextResponse.json(createdEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 });
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
    return NextResponse.json({ error: 'Failed to retrieve entries' }, { status: 500 });
  }
}

export async function HEAD(request: NextRequest) {
  try {
    console.log('Initiating MongoDB connection test...');
    
    const connectionManager = MongoDBConnectionManager.getInstance();
    const isConnected = await connectionManager.testConnection();
    
    console.log(`MongoDB Connection Test Result: ${isConnected ? 'Success' : 'Failure'}`);
    
    return NextResponse.json({ 
      status: 'success', 
      connected: isConnected,
      timestamp: new Date().toISOString()
    }, { 
      status: isConnected ? 200 : 500 
    });
  } catch (error) {
    console.error('Comprehensive Connection Test Error:', {
      errorType: error instanceof Error ? error.name : 'Unknown Error',
      errorMessage: error instanceof Error ? error.message : 'No message',
      errorStack: error instanceof Error ? error.stack : 'No stack trace',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ 
      status: 'error', 
      message: error instanceof Error 
        ? error.message 
        : 'Unknown connection error',
      errorDetails: error instanceof Error 
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack
          }
        : null,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}