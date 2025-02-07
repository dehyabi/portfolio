import { Resume } from '@/lib/interfaces/resume-builder.interface';
import { MongoDBConnectionManager } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export class ResumeBuilderRepository {
  private connectionManager: MongoDBConnectionManager;
  private collectionName = 'resumes';

  constructor() {
    this.connectionManager = MongoDBConnectionManager.getInstance();
  }

  async create(resume: Resume): Promise<Resume> {
    try {
      const connection = await this.connectionManager.connect();
      const collection = connection.db.collection(this.collectionName);

      // Remove undefined fields
      const cleanedResume = JSON.parse(JSON.stringify(resume));

      const result = await collection.insertOne(cleanedResume);
      return { ...cleanedResume, id: result.insertedId.toString() };
    } catch (error) {
      console.error('Error creating resume:', error);
      throw error;
    }
  }

  async getAll(filter: Partial<Resume> = {}): Promise<Resume[]> {
    try {
      const connection = await this.connectionManager.connect();
      const collection = connection.db.collection(this.collectionName);

      // Convert userId to ObjectId if present
      if (filter.userId) {
        filter.userId = new ObjectId(filter.userId).toString();
      }

      const resumes = await collection.find(filter).toArray();
      return resumes.map(resume => ({
        ...resume,
        id: resume._id.toString()
      }));
    } catch (error) {
      console.error('Error retrieving resumes:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<Resume | null> {
    try {
      const connection = await this.connectionManager.connect();
      const collection = connection.db.collection(this.collectionName);

      const resume = await collection.findOne({ _id: new ObjectId(id) });
      return resume ? { ...resume, id: resume._id.toString() } : null;
    } catch (error) {
      console.error('Error retrieving resume by ID:', error);
      throw error;
    }
  }

  async update(id: string, updates: Partial<Resume>): Promise<Resume | null> {
    try {
      const connection = await this.connectionManager.connect();
      const collection = connection.db.collection(this.collectionName);

      updates.updatedAt = new Date();

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updates },
        { returnDocument: 'after' }
      );

      return result ? { ...result, id: result._id.toString() } : null;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const connection = await this.connectionManager.connect();
      const collection = connection.db.collection(this.collectionName);

      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    }
  }
}