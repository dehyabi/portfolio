'use client';
import { TaskList } from './components/TaskList';

export default function TaskManagerPage() {
  return (
    <div className='bg-white text-gray-800 antialiased'>
      <TaskList />
    </div>
  );
}