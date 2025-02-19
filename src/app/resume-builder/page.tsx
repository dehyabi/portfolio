"use client";
import { ResumeList } from "./components/ResumeList";
import { ResumeForm } from "./components/ResumeForm";
import { useState } from "react";
import { Resume } from "./types/resume";
import toast, { Toaster } from "react-hot-toast";

export default function ResumeBuilderPage() {
  const [isEditingResume, setIsEditingResume] = useState<boolean>(false);
  const [isCreatingNewResume, setIsCreatingNewResume] =
    useState<boolean>(false);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  const handleEditResume = (resume: Resume) => {
    setSelectedResume(resume);
    setIsEditingResume(true);
    setIsCreatingNewResume(false);
  };

  const handleCreateNewResume = () => {
    setSelectedResume(null);
    setIsEditingResume(true);
    setIsCreatingNewResume(true);
  };

  const handleCancelEdit = () => {
    setSelectedResume(null);
    setIsEditingResume(false);
    setIsCreatingNewResume(false);
  };

  const handleSubmitResume = (updatedResume: Resume) => {
    try {
      // Get existing resumes from local storage
      const existingResumes = JSON.parse(
        localStorage.getItem("resumes") || "[]"
      ) as Resume[];

      // Check if this is a new resume or an existing one being updated
      const existingResumeIndex = existingResumes.findIndex(
        (r) => r.id === updatedResume.id
      );

      if (existingResumeIndex !== -1) {
        // Update existing resume
        existingResumes[existingResumeIndex] = updatedResume;
        toast.success("Resume updated successfully!", {
          style: {
            border: "1px solid #4CAF50",
            padding: "16px",
            color: "#4CAF50",
            backgroundColor: "#E8F5E9",
          },
          iconTheme: {
            primary: "#4CAF50",
            secondary: "white",
          },
        });
      } else {
        // Add new resume
        existingResumes.push(updatedResume);
        toast.success("New resume created successfully!", {
          style: {
            border: "1px solid #4CAF50",
            padding: "16px",
            color: "#4CAF50",
            backgroundColor: "#E8F5E9",
          },
          iconTheme: {
            primary: "#4CAF50",
            secondary: "white",
          },
        });
      }

      // Save updated resumes back to local storage
      localStorage.setItem("resumes", JSON.stringify(existingResumes));

      // Reset states
      setIsEditingResume(false);
      setIsCreatingNewResume(false);
      setSelectedResume(null);
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume. Please try again.", {
        style: {
          border: "1px solid #F44336",
          padding: "16px",
          color: "#F44336",
          backgroundColor: "#FFEBEE",
        },
        iconTheme: {
          primary: "#F44336",
          secondary: "white",
        },
      });
    }
  };

  return (
    <div className="bg-white text-gray-800 antialiased">
      <Toaster position="top-right" reverseOrder={false} />
      {!isEditingResume && (
        <ResumeList
          onEditResume={handleEditResume}
          onCreateNewResume={handleCreateNewResume}
        />
      )}
      {isEditingResume && (
        <ResumeForm
          resume={selectedResume ?? undefined}
          onSubmit={handleSubmitResume}
          onCancel={handleCancelEdit}
          isCreatingNew={isCreatingNewResume}
        />
      )}
    </div>
  );
}
