export interface Task {
  id?: string;  // Optional, as it might be generated by the database
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed' | 'on-hold';
  priority?: 'low' | 'medium' | 'high';
  projectId?: string;
  assignedTo?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}