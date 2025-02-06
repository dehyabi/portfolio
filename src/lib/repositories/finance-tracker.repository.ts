import { MongoClient, ObjectId } from 'mongodb';
import { MongoDBConnectionManager } from '../mongodb';
import { IFinanceTrackerRepository, FinanceEntry } from '../interfaces/finance-tracker.interface';

export class FinanceTrackerRepository implements IFinanceTrackerRepository {
  private collectionName = 'finance_tracker';

  private async getCollection() {
    const connection = await MongoDBConnectionManager.getInstance().connect();
    return connection.db.collection(this.collectionName);
  }

  async create(entry: FinanceEntry): Promise<FinanceEntry> {
    const collection = await this.getCollection();
    
    // Ensure date is a Date object
    const entryWithDate = {
      ...entry,
      date: entry.date instanceof Date ? entry.date : new Date(entry.date)
    };

    // Log the entry being inserted (for debugging)
    console.log('Inserting Finance Entry:', entryWithDate);

    const result = await collection.insertOne(entryWithDate);
    return { 
      ...entryWithDate, 
      id: result.insertedId.toString() 
    };
  }

  async getById(id: string): Promise<FinanceEntry | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) }) as FinanceEntry | null;
  }

  async update(id: string, entry: Partial<FinanceEntry>): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: entry }
    );
    return result.modifiedCount > 0;
  }

  async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async getAll(filter: Partial<FinanceEntry> = {}): Promise<FinanceEntry[]> {
    const collection = await this.getCollection();
    return await collection.find(filter).toArray() as FinanceEntry[];
  }
}