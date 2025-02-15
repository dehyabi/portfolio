import { FinanceEntry } from '../interfaces/finance-tracker.interface';

// Type definition for financeEntries
type FinanceEntriesData = { 
  entries: FinanceEntry[], 
  categories: string[] 
};

// Extend global object with a type-safe method
interface GlobalWithFinanceEntries extends globalThis.Object {
  __financeEntries?: FinanceEntriesData;
}

// Type guard to check and initialize global finance entries
function ensureFinanceEntries(global: GlobalWithFinanceEntries): FinanceEntriesData {
  if (!global.__financeEntries) {
    global.__financeEntries = { 
      entries: [], 
      categories: [] 
    };
  }
  return global.__financeEntries;
}

export class FinanceTrackerRepository {
  private storageKey = 'financeTrackerData';

  private getStorageData() {
    // Server-side: use global variable
    if (typeof window === 'undefined') {
      return ensureFinanceEntries(globalThis as GlobalWithFinanceEntries);
    }

    // Client-side: use localStorage
    const existingData = localStorage.getItem(this.storageKey);
    if (!existingData) {
      const defaultData: FinanceEntriesData = { 
        entries: [], 
        categories: [] 
      };
      localStorage.setItem(this.storageKey, JSON.stringify(defaultData));
      return defaultData;
    }
    
    return JSON.parse(existingData);
  }

  private setStorageData(data: FinanceEntriesData) {
    // Server-side: update global variable
    if (typeof window === 'undefined') {
      const globalExt = globalThis as GlobalWithFinanceEntries;
      globalExt.__financeEntries = data;
      return;
    }

    // Client-side: update localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  async getAllEntries(
    filter: Partial<FinanceEntry> = {}, 
    options: { 
      page?: number, 
      limit?: number, 
      sortBy?: string, 
      sortOrder?: 'asc' | 'desc' 
    } = {}
  ) {
    const { entries } = this.getStorageData();
    
    // Apply filter
    const filteredEntries = entries.filter((entry: FinanceEntry) => {
      return Object.entries(filter).every(([key, value]) => entry[key as keyof FinanceEntry] === value);
    });

    // Sort entries
    const { sortBy = 'date', sortOrder = 'desc' } = options;
    filteredEntries.sort((a: FinanceEntry, b: FinanceEntry) => {
      const valueA = a[sortBy as keyof FinanceEntry];
      const valueB = b[sortBy as keyof FinanceEntry];
      
      if (valueA === undefined || valueB === undefined) return 0;
      
      if (valueA instanceof Date) {
        return sortOrder === 'asc' 
          ? new Date(valueA).getTime() - new Date(valueB).getTime()
          : new Date(valueB).getTime() - new Date(valueA).getTime();
      }
      
      return sortOrder === 'asc' 
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });

    // Pagination
    const { page = 1, limit = 5 } = options;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return {
      entries: filteredEntries.slice(startIndex, endIndex),
      total: filteredEntries.length,
      page,
      limit
    };
  }

  async createEntry(entry: FinanceEntry) {
    const storageData = this.getStorageData();
    
    // Generate unique ID if not provided
    const newEntry = {
      ...entry,
      id: entry.id || `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: entry.date instanceof Date ? entry.date : new Date(entry.date)
    };

    // Add new entry
    storageData.entries.push(newEntry);
    this.setStorageData(storageData);

    return newEntry;
  }

  async updateEntry(id: string, updateData: Partial<FinanceEntry>) {
    const storageData = this.getStorageData();
    const entryIndex = storageData.entries.findIndex((entry: FinanceEntry) => entry.id === id);

    if (entryIndex === -1) {
      throw new Error('Entry not found');
    }

    // Update entry
    storageData.entries[entryIndex] = {
      ...storageData.entries[entryIndex],
      ...updateData
    };

    this.setStorageData(storageData);
    return storageData.entries[entryIndex];
  }

  async deleteEntry(id: string) {
    const storageData = this.getStorageData();
    const initialLength = storageData.entries.length;
    
    storageData.entries = storageData.entries.filter((entry: FinanceEntry) => entry.id !== id);
    
    if (storageData.entries.length === initialLength) {
      throw new Error('Entry not found');
    }

    this.setStorageData(storageData);
    return id;
  }

  async getUniqueCategories() {
    const { entries } = this.getStorageData();
    return [...new Set(entries.map((entry: FinanceEntry) => entry.category))];
  }

  async createCategory(name: string) {
    const storageData = this.getStorageData();
    
    // Check if category already exists
    if (storageData.categories.includes(name)) {
      return { existed: true, category: name };
    }

    // Add new category
    storageData.categories.push(name);
    this.setStorageData(storageData);

    return { existed: false, category: name };
  }
}