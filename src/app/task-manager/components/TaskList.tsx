import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { Task } from "../types/Task";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TaskItem } from "./TaskItem";
import { TaskForm } from "./TaskForm";
import { Clipboard, ChevronLeft, ChevronRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Dynamically import drag and drop components
const DragDropContext = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);
const Droppable = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.Draggable),
  { ssr: false }
);

// Client-side Pagination Component
const ClientPaginationControls = ({
  currentPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
}: {
  currentPage: number;
  totalPages: number;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="p-2 rounded-full bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [filter, setFilter] = useState<Task["status"] | "all">("all");
  const [sortBy, setSortBy] = useState<"createdAt" | "updatedAt">("createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Number of tasks to display per page

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter((task) => filter === "all" || task.status === filter)
      .sort(
        (a, b) => new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime()
      );
  }, [tasks, filter, sortBy]);

  // Pagination logic
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    return filteredAndSortedTasks.slice(startIndex, endIndex);
  }, [filteredAndSortedTasks, currentPage, tasksPerPage]);

  const totalPages = Math.ceil(filteredAndSortedTasks.length / tasksPerPage);

  const addTask = (task: Task) => {
    const newTask = {
      ...task,
      id: task.id || crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    setEditingTask(undefined);
    // Reset to first page when a new task is added
    setCurrentPage(1);

    // Add success toast with responsive positioning
    toast.success("Task created successfully!", {
      position: "top-right",
      duration: 3000,
    });
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((t) =>
        t.id === updatedTask.id
          ? {
              ...updatedTask,
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
    setEditingTask(undefined);

    // Add success toast with responsive positioning
    toast.success("Task updated successfully!", {
      position: "top-right",
      duration: 3000,
    });
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find((t) => t.id === id);

    if (!taskToDelete) {
      toast.error("Task not found", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    setTasks(tasks.filter((t) => t.id !== id));

    // Adjust current page if the last task on the current page is deleted
    if (
      paginatedTasks.length === 1 &&
      currentPage > 1 &&
      currentPage > totalPages
    ) {
      setCurrentPage(currentPage - 1);
    }

    // Add success toast with responsive positioning
    toast.success("Task deleted successfully!", {
      position: "top-right",
      duration: 3000,
    });
  };

  const onDragEnd = (result: {
    source: { index: number };
    destination: { index: number } | null;
  }) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(filteredAndSortedTasks);
    const [reorderedItem] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, reorderedItem);
    setTasks(reorderedTasks);

    // Add success toast with responsive positioning
    toast.success("Task reordered successfully!", {
      position: "top-right",
      duration: 3000,
    });
  };

  // Pagination handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Add Toaster component for toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#E6F3E6", // Very light green
              color: "#2E7D32", // Dark green text
              border: "1px solid #4CAF50", // Subtle green border
            },
          },
          error: {
            style: {
              background: "#FFEBEE", // Very light red
              color: "#D32F2F", // Dark red text
              border: "1px solid #F44336", // Subtle red border
            },
          },
          // Default style for neutral toasts
          style: {
            background: "#F5F5F5", // Light gray
            color: "#333", // Dark gray text
            border: "1px solid #E0E0E0", // Subtle border
          },
        }}
      />

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-purple-600">
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
            Task Manager
          </h1>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 pb-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mb-4 sm:mb-0">
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as Task["status"] | "all")
                }
                className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "createdAt" | "updatedAt")
                }
                className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="createdAt">Created Date</option>
                <option value="updatedAt">Updated Date</option>
              </select>
            </div>
            {editingTask === undefined && (
              <button
                onClick={() => setEditingTask({} as Task)}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg transition-all transform hover:-translate-y-1 shadow-lg text-sm sm:text-base hover:from-blue-600 hover:to-purple-700 border border-transparent"
              >
                + New Task
              </button>
            )}
          </div>

          {editingTask !== undefined && (
            <TaskForm
              task={editingTask}
              onSubmit={editingTask.id ? updateTask : addTask}
              onCancel={() => setEditingTask(undefined)}
            />
          )}

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {filteredAndSortedTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                      <Clipboard className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-2 sm:mb-4" />
                      <p className="text-lg sm:text-xl text-gray-600 font-semibold mb-1 sm:mb-2">
                        No Tasks Yet
                      </p>
                      <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
                        Get started by creating your first task
                      </p>
                    </div>
                  ) : (
                    paginatedTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskItem
                              task={task}
                              onEdit={() => {
                                setEditingTask(task);
                                scrollToTop();
                              }}
                              onDelete={() => deleteTask(task.id)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* Pagination Controls */}
          {filteredAndSortedTasks.length > tasksPerPage && (
            <ClientPaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};
