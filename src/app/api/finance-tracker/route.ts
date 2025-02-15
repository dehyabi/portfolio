import { NextRequest, NextResponse } from 'next/server';
import { FinanceTrackerService } from '@/lib/services/finance-tracker.service';
import { FinanceEntry } from '@/lib/interfaces/finance-tracker.interface';

const financeTrackerService = new FinanceTrackerService();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  try {
    const filter = Object.fromEntries(searchParams.entries());
    
    // Extract pagination parameters
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 5;
    const sortBy = searchParams.get('sortBy') || 'date';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';

    // Remove pagination params from filter to prevent conflicts
    delete filter.page;
    delete filter.limit;
    delete filter.sortBy;
    delete filter.sortOrder;

    const result = await financeTrackerService.getAllEntries(filter, {
      page,
      limit,
      sortBy,
      sortOrder
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch finance entries',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Check if request is for creating a category
    if (data.type === 'category') {
      // Validate category
      if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
        console.error('Invalid category:', data.name);
        return NextResponse.json({ 
          error: 'Invalid category name', 
          category: data.name 
        }, { status: 400 });
      }

      const newCategory = await financeTrackerService.createCategory(data.name.trim());
      
      return NextResponse.json({ category: newCategory }, { status: 201 });
    }
    
    // Original entry creation logic
    const entry: FinanceEntry = data;
    
    // Validate required fields
    const requiredFields: (keyof FinanceEntry)[] = ['amount', 'category', 'type', 'date'];
    const missingFields = requiredFields.filter(field => !entry[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return NextResponse.json({ 
        error: 'Missing required fields', 
        missingFields 
      }, { status: 400 });
    }

    // Validate amount
    const amount = Number(entry.amount);
    if (isNaN(amount) || amount < 0) {
      console.error('Invalid amount:', entry.amount);
      return NextResponse.json({ 
        error: 'Invalid amount', 
        amount: entry.amount 
      }, { status: 400 });
    }

    // Ensure date is a valid Date object
    const date = entry.date instanceof Date 
      ? entry.date 
      : new Date(entry.date);
    
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', entry.date);
      return NextResponse.json({ 
        error: 'Invalid date', 
        date: entry.date 
      }, { status: 400 });
    }

    // Prepare sanitized entry
    const sanitizedEntry: FinanceEntry = {
      ...entry,
      amount: amount,
      date: date,
    };

    console.log('Creating finance entry:', sanitizedEntry);

    const createdEntry = await financeTrackerService.createEntry(sanitizedEntry);
    
    console.log('Entry created successfully:', createdEntry);
    
    return NextResponse.json(createdEntry, { status: 201 });
  } catch (error) {
    console.error('Detailed error in finance entry/category creation:', error);
    return NextResponse.json({ 
      error: 'Failed to create finance entry or category',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json();
    
    // Use id if provided, otherwise throw an error
    if (!id) {
      return NextResponse.json({ error: 'ID is required for update' }, { status: 400 });
    }

    const updated = await financeTrackerService.updateEntry(id, updateData);
    return NextResponse.json({ updated }, { status: 200 });
  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json({ 
      error: 'Failed to update finance entry',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Try to get ID from query parameters first
    const searchParams = request.nextUrl.searchParams;
    let id = searchParams.get('id');

    // If not in query params, try to get from request body
    if (!id) {
      const body = await request.json();
      id = body.id;
    }
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required for deletion' }, { status: 400 });
    }

    const deleted = await financeTrackerService.deleteEntry(id);
    return NextResponse.json({ deleted }, { status: 200 });
  } catch (error) {
    console.error('Delete Error:', error);
    return NextResponse.json({ 
      error: 'Failed to delete finance entry',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}