import { ObjectId } from 'mongodb';
import { MongoDBConnectionManager } from '../mongodb';
import { Task } from '../interfaces/task-manager.interface';

export class TaskManagerRepository {
  private collectionName = 'tasks';

  private async getCollection() {
    const connection = await MongoDBConnectionManager.getInstance().connect();
    return connection.db.collection(this.collectionName);
  }

  async create(task: Task): Promise<Task> {
    const collection = await this.getCollection();
    
    // Ensure dates are Date objects
    const taskWithDates = {
      ...task,
      createdAt: task.createdAt instanceof Date ? task.createdAt : new Date(task.createdAt),
      updatedAt: task.updatedAt instanceof Date ? task.updatedAt : new Date(task.updatedAt),
      dueDate: task.dueDate ? (task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate)) : undefined
    };

    // Log the task being inserted (for debugging)
    console.log('Inserting Task:', taskWithDates);

    const result = await collection.insertOne(taskWithDates);
    return { 
      ...taskWithDates, 
      id: result.insertedId.toString() 
    };
  }

  async getById(id: string): Promise<Task | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) }) as Task | null;
  }

  async update(id: string, task: Partial<Task>): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...task, updatedAt: new Date() } }
    );
    return result.modifiedCount > 0;
  }

  async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async getAll(filter: Partial<Task> = {}): Promise<Task[]> {
    const collection = await this.getCollection();
    const tasks = await collection.find(filter).toArray();
    return tasks.map(task => {
      // Ensure all required Task properties are present
      return {
        id: task._id.toString(),
        title: task.title || '',
        status: task.status || 'todo',
        createdAt: task.createdAt instanceof Date ? task.createdAt : new Date(task.createdAt || Date.now()),
        updatedAt: task.updatedAt instanceof Date ? task.updatedAt : new Date(task.updatedAt || Date.now()),
        
        // Optional properties with default values
        description: task.description || '',
        priority: task.priority || 'low',
        projectId: task.projectId || '',
        assignedTo: task.assignedTo || '',
        tags: task.tags || [],
        dueDate: task.dueDate ? (task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate)) : undefined
      } as Task;
    });
  }
}