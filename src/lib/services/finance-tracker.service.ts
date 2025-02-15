// File: /media/dehyabi/DATA/portfolio/src/lib/services/finance-tracker.service.ts
import { FinanceTrackerRepository } from '../repositories/finance-tracker.repository';
import { FinanceEntry } from '../interfaces/finance-tracker.interface';

export class FinanceTrackerService {
  private repository: FinanceTrackerRepository;

  constructor() {
    this.repository = new FinanceTrackerRepository();
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
    // Direct pass-through to repository
    return this.repository.getAllEntries(filter, options);
  }

  async createEntry(entry: FinanceEntry) {
    // Validate entry before creating
    const requiredFields: (keyof FinanceEntry)[] = ['amount', 'category', 'type', 'date'];
    const missingFields = requiredFields.filter(field => !entry[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate amount
    const amount = Number(entry.amount);
    if (isNaN(amount) || amount < 0) {
      throw new Error('Invalid amount');
    }

    // Ensure date is a valid Date object
    const date = entry.date instanceof Date 
      ? entry.date 
      : new Date(entry.date);
    
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    // Prepare sanitized entry
    const sanitizedEntry: FinanceEntry = {
      ...entry,
      amount: amount,
      date: date,
    };

    return this.repository.createEntry(sanitizedEntry);
  }

  async updateEntry(id: string, updateData: Partial<FinanceEntry>) {
    // Validate update data if needed
    return this.repository.updateEntry(id, updateData);
  }

  async deleteEntry(id: string) {
    return this.repository.deleteEntry(id);
  }

  async getUniqueCategories() {
    console.log('Getting unique categories from service');
    try {
      // On the client side, fetch from repository
      if (typeof window !== 'undefined') {
        const categories = await this.repository.getUniqueCategories();
        console.log('Categories from repository:', categories);
        return categories;
      }
      
      // On the server side, fetch from API
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/finance-tracker?type=categories`);
      const categories = await response.json();
      console.log('Categories from server:', categories);
      return categories;
    } catch (error) {
      console.error('Error getting unique categories:', error);
      return [];
    }
  }

  // Method to get categories (now using localStorage)
  getCategories(): string[] {
    try {
      const categoriesJson = localStorage.getItem('financeCategories');
      return categoriesJson ? JSON.parse(categoriesJson) : [];
    } catch (error) {
      console.error('Error retrieving categories:', error);
      return [];
    }
  }

  // Method to create a new category (using localStorage)
  createCategory(categoryName: string): string {
    try {
      // Trim and validate the category name
      const trimmedCategory = categoryName.trim();
      
      if (!trimmedCategory) {
        throw new Error('Category name cannot be empty');
      }

      // Get current categories
      const currentCategories = this.getCategories();

      // Check for duplicate category (case-insensitive)
      const isDuplicate = currentCategories.some(
        (cat) => cat.toLowerCase().trim() === trimmedCategory.toLowerCase()
      );

      if (isDuplicate) {
        throw new Error(`Category "${trimmedCategory}" already exists`);
      }

      // Add new category
      const updatedCategories = [...currentCategories, trimmedCategory];
      
      // Save to localStorage
      localStorage.setItem('financeCategories', JSON.stringify(updatedCategories));

      return trimmedCategory;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  // Method to delete a category (now using localStorage)
  async deleteCategory(categoryName: string) {
    // Validate category name
    if (!categoryName || typeof categoryName !== 'string' || categoryName.trim() === '') {
      throw new Error('Invalid category name');
    }

    try {
      // Get current categories from localStorage
      const currentCategories = this.getCategories();

      // Remove the category
      const updatedCategories = currentCategories.filter(cat => cat !== categoryName);

      // Save updated categories
      localStorage.setItem('financeCategories', JSON.stringify(updatedCategories));

      return { 
        message: 'Category deleted successfully', 
        category: categoryName 
      };
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
}