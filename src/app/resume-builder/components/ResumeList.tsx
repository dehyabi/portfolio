import React, { useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Resume } from "../types/resume";
import { ResumeItem } from "./ResumeItem";
import { ResumeForm } from "./ResumeForm";
import { ConfirmDelete } from "./ConfirmDelete";
import { useLocalStorage } from "../hooks/useLocalStorage";
import toast, { Toaster } from "react-hot-toast";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";

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

export const ResumeList: React.FC<{
  onEditResume?: (resume: Resume) => void;
  onCreateNewResume?: () => void;
}> = ({ onEditResume, onCreateNewResume }) => {
  // Local storage hook for persisting resumes
  const [resumes, setResumes] = useLocalStorage<Resume[]>("resumes", []);

  // State for managing resume editing and pagination
  const [editingResume, setEditingResume] = useState<Resume | undefined>(
    undefined
  );
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<keyof Resume>("updatedAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);
  const resumesPerPage = 6;

  // Ensure consistent rendering on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Resume management functions
  const addResume = (resume: Resume) => {
    const newResume = {
      ...resume,
      id: resume.id || uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setResumes([...resumes, newResume]);
    setEditingResume(undefined);
    setCurrentPage(1);

    toast.success("Resume created successfully!", {
      position: "top-right",
      style: {
        background: "#E6F3E6", // Very light green
        color: "#2E7D32", // Dark green text
        border: "1px solid #4CAF50", // Subtle green border
      },
      duration: 3000,
    });
  };

  const copyResume = (resumeToCopy: Resume) => {
    const newResume = {
      ...resumeToCopy,
      id: uuidv4(), // Generate a new unique ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setResumes([...resumes, newResume]);
    setCurrentPage(1); // Go to first page to show the new resume

    // Removed toast notification
  };

  const updateResume = (updatedResume: Resume) => {
    setResumes(
      resumes.map((resume) =>
        resume.id === updatedResume.id
          ? { ...updatedResume, updatedAt: new Date().toISOString() }
          : resume
      )
    );
    setEditingResume(undefined);

    toast.success("Resume updated successfully!", {
      style: {
        background: "#E6F3E6", // Very light green
        color: "#2E7D32", // Dark green text
        border: "1px solid #4CAF50", // Subtle green border
      },
      position: "top-right",
      duration: 3000,
    });
  };

  const deleteResume = (id: string) => {
    const updatedResumes = resumes.filter((resume) => resume.id !== id);
    setResumes(updatedResumes);
    toast.success("Resume deleted successfully!", {
      style: {
        background: "#E6F3E6", // Very light green
        color: "#2E7D32", // Dark green text
        border: "1px solid #4CAF50", // Subtle green border
      },
      duration: 3000,
    });

    // Adjust current page if needed
    const newTotalPages = Math.ceil(updatedResumes.length / resumesPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }

    // Reset delete confirmation
    setResumeToDelete(null);
  };

  // Filtering and sorting logic
  const filteredAndSortedResumes = useMemo(() => {
    if (!isClient) return [];
    return resumes
      .filter(
        (resume) =>
          filter === "all" ||
          resume.title.toLowerCase().includes(filter.toLowerCase())
      )
      .sort(
        (a, b) =>
          new Date(b[sortBy] as string).getTime() -
          new Date(a[sortBy] as string).getTime()
      );
  }, [resumes, filter, sortBy, isClient]);

  // Pagination logic
  const paginatedResumes = useMemo(() => {
    if (!isClient) return [];
    const startIndex = (currentPage - 1) * resumesPerPage;
    const endIndex = startIndex + resumesPerPage;
    return filteredAndSortedResumes.slice(startIndex, endIndex);
  }, [filteredAndSortedResumes, currentPage, resumesPerPage, isClient]);

  const totalPages = isClient
    ? Math.ceil(filteredAndSortedResumes.length / resumesPerPage)
    : 0;

  // Pagination handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Scroll to top utility
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Add Toaster component for toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#4CAF50", // Green
              color: "#fff", // White text
              border: "1px solid #3e8e41", // Green border
            },
          },
          error: {
            style: {
              background: "#F44336", // Red
              color: "#fff", // White text
              border: "1px solid #e91e63", // Red border
            },
          },
          // Default style for neutral toasts
          style: {
            background: "#2196F3", // Blue
            color: "#fff", // White text
            border: "1px solid #1A237E", // Blue border
          },
        }}
      />

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-purple-600">
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
            Resume Builder
          </h1>
        </div>

        <div className="p-4 sm:p-6">
          {/* Filtering and Sorting Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 pb-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mb-4 sm:mb-0">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0"
              >
                <option value="all">All Resumes</option>
                {/* You might want to customize these options based on your resume filtering needs */}
                {isClient &&
                  Array.from(
                    new Set(resumes.map((resume) => resume.title.toLowerCase()))
                  ).map((title) => (
                    <option key={title} value={title}>
                      {title.charAt(0).toUpperCase() + title.slice(1)}
                    </option>
                  ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as keyof Resume)}
                className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="updatedAt">Recently Updated</option>
                <option value="createdAt">Recently Created</option>
              </select>
            </div>
            {onCreateNewResume && (
              <button
                onClick={onCreateNewResume}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 border border-transparent transition-colors"
              >
                Create New Resume
              </button>
            )}
          </div>

          {/* Resume Form for Creating/Editing */}
          {editingResume !== undefined && (
            <ResumeForm
              resume={editingResume}
              onSubmit={editingResume.id ? updateResume : addResume}
              onCancel={() => setEditingResume(undefined)}
            />
          )}

          {/* Empty State */}
          {paginatedResumes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <FileText
                className="w-24 h-24 text-gray-300 mb-6"
                strokeWidth={1}
              />
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                No Resumes Yet
              </h2>
              <p className="text-gray-500 mb-6">
                Create your first resume to get started
              </p>
            </div>
          )}

          {/* Resume List */}
          {paginatedResumes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {paginatedResumes.map((resume) => (
                <ResumeItem
                  key={resume.id}
                  resume={resume}
                  onEdit={() => onEditResume && onEditResume(resume)}
                  onDelete={() => setResumeToDelete(resume.id)}
                  onCopyResume={copyResume}
                />
              ))}
            </div>
          )}

          {/* Confirm Delete Modal */}
          {resumeToDelete && (
            <ConfirmDelete
              taskName={
                resumes.find((r) => r.id === resumeToDelete)?.title || "Resume"
              }
              onConfirm={() => deleteResume(resumeToDelete)}
              onCancel={() => setResumeToDelete(null)}
            />
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
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
