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
        id: resume._id.toString(),
        userId: resume.userId || '',
        personalInfo: resume.personalInfo || { fullName: '', email: '' },
        education: resume.education || [],
        workExperience: resume.workExperience || [],
        skills: resume.skills || [],
        projects: resume.projects || [],
        certifications: resume.certifications || [],
        createdAt: resume.createdAt || new Date(),
        updatedAt: resume.updatedAt || new Date()
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
      return resume ? {
        id: resume._id.toString(),
        userId: resume.userId || '',
        personalInfo: resume.personalInfo || { fullName: '', email: '' },
        education: resume.education || [],
        workExperience: resume.workExperience || [],
        skills: resume.skills || [],
        projects: resume.projects || [],
        certifications: resume.certifications || [],
        createdAt: resume.createdAt || new Date(),
        updatedAt: resume.updatedAt || new Date()
      } : null;
    } catch (error) {
      console.error('Error retrieving resume by ID:', error);
      throw error;
    }
  }

  async update(id: string, updates: Partial<Resume>): Promise<Resume | null> {
    try {
      const connection = await this.connectionManager.connect();
      const collection = connection.db.collection(this.collectionName);

      // Remove undefined fields
      const cleanedResume = JSON.parse(JSON.stringify(updates));

      cleanedResume.updatedAt = new Date();

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: cleanedResume },
        { returnDocument: 'after' }
      );

      return result ? {
        id: result.value._id.toString(),
        userId: result.value.userId || '',
        personalInfo: result.value.personalInfo || { fullName: '', email: '' },
        education: result.value.education || [],
        workExperience: result.value.workExperience || [],
        skills: result.value.skills || [],
        projects: result.value.projects || [],
        certifications: result.value.certifications || [],
        createdAt: result.value.createdAt || new Date(),
        updatedAt: result.value.updatedAt || new Date()
      } : null;
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