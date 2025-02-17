import React, { useState } from "react";
import { Task } from "../types/Task";
import ConfirmDelete from "./ConfirmDelete";

export interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "in-progress":
        return "text-blue-500";
      case "completed":
        return "text-green-500";
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowConfirmDelete(false);
  };

  return (
    <>
      {showConfirmDelete && (
        <ConfirmDelete
          taskName={task.title}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmDelete(false)}
        />
      )}
      <div
        className={`task-item group relative p-4 bg-white shadow-md rounded-lg transition-all hover:shadow-lg 
        border-l-4 border-t-2 border
        ${
          task.status === "pending"
            ? "border-yellow-500 border-opacity-40 hover:bg-yellow-50"
            : task.status === "in-progress"
            ? "border-blue-500 border-opacity-40 hover:bg-blue-50"
            : task.status === "completed"
            ? "border-green-500 border-opacity-40 hover:bg-green-50"
            : ""
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex-grow pr-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate max-w-[80%]">
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {task.description}
            </p>
            <div
              className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(
                task.status
              )} bg-opacity-20 ${
                task.status === "pending"
                  ? "bg-yellow-500"
                  : task.status === "in-progress"
                  ? "bg-blue-500"
                  : task.status === "completed"
                  ? "bg-green-500"
                  : ""
              }`}
            >
              {task.status.replace("-", " ")}
            </div>
          </div>
          <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4">
            <button
              onClick={() => onEdit(task)}
              className="text-blue-500 hover:text-blue-700 text-sm bg-blue-50 hover:bg-blue-100 p-1 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✏️
            </button>
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="text-red-500 hover:text-red-700 text-sm bg-red-50 hover:bg-red-100 p-1 rounded-full w-8 h-8 flex items-center justify-center"
            >
              🗑️
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2 text-right">
          {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </div>
    </>
  );
};
