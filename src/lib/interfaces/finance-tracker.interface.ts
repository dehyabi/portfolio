export interface FinanceEntry {
  id?: string;
  amount: number;
  category: string;
  date: Date | string;
  description?: string;  // Optional description field
  type: 'income' | 'expense';
}

export interface IFinanceTrackerRepository {
  create(entry: FinanceEntry): Promise<FinanceEntry>;
  getById(id: string): Promise<FinanceEntry | null>;
  update(id: string, entry: Partial<FinanceEntry>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  getAll(filter?: Partial<FinanceEntry>): Promise<FinanceEntry[]>;
  createCategory(category: string): Promise<{
    name: string;
    existed: boolean;
  }>;
  getAllCategories(): Promise<string[]>;
}