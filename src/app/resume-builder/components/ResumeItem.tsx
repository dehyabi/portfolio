import React, { useState } from "react";
import { Resume, ResumeItemProps } from "../types/resume";
import jsPDF from "jspdf";
import { PreviewResume } from "./PreviewResume";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export const ResumeItem: React.FC<
  ResumeItemProps & { onCopyResume?: (resume: Resume) => void }
> = ({ resume, onEdit, onDelete, onCopyResume }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Utility function to truncate long text
  const truncate = (text: string, maxLength: number = 100) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  // Format date for better readability
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Determine resume color based on last update
  const getResumeColor = () => {
    const daysSinceUpdate =
      (new Date().getTime() - new Date(resume.updatedAt).getTime()) /
      (1000 * 3600 * 24);

    if (daysSinceUpdate <= 7) return "border-gray-300";
    if (daysSinceUpdate <= 30) return "border-gray-300";
    return "border-gray-300";
  };

  // PDF Download Handler
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Margins
    const margin = 15;
    let currentY = margin;

    // Fonts and Styling
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);

    // Check if content might exceed a single page
    const maxContentHeight = pageHeight - 2 * margin;

    // Personal Info
    doc.text(resume.personalInfo.fullName, margin, currentY);
    currentY += 10;
    doc.setFontSize(10);
    doc.text(`Email: ${resume.personalInfo.email}`, margin, currentY);
    currentY += 7;
    doc.text(
      `Location: ${resume.personalInfo.location || "N/A"}`,
      margin,
      currentY
    );
    currentY += 10;

    // Summary
    if (resume.summary) {
      doc.setFontSize(12);
      doc.text("Professional Summary", margin, currentY);
      currentY += 7;
      doc.setFontSize(10);
      doc.text(resume.summary, margin, currentY, {
        maxWidth: pageWidth - 2 * margin,
      });
      currentY += 15;
    }

    // Education
    if (resume.education && resume.education.length > 0) {
      doc.setFontSize(12);
      doc.text("Education", margin, currentY);
      currentY += 7;
      doc.setFontSize(10);
      resume.education.forEach((edu) => {
        doc.text(`${edu.institution} - ${edu.degree}`, margin, currentY);
        currentY += 7;
        doc.text(
          `${edu.startDate} - ${edu.endDate}${
            edu.gpa ? ` | GPA: ${edu.gpa}` : ""
          }`,
          margin,
          currentY
        );
        currentY += 10;

        // Add new page if content might exceed page height
        if (currentY > maxContentHeight) {
          doc.addPage();
          currentY = margin;
        }
      });
    }

    // Work Experience
    if (resume.workExperience && resume.workExperience.length > 0) {
      doc.setFontSize(12);
      doc.text("Work Experience", margin, currentY);
      currentY += 7;
      doc.setFontSize(10);
      resume.workExperience.forEach((work) => {
        doc.text(`${work.company} - ${work.position}`, margin, currentY);
        currentY += 7;
        doc.text(`${work.startDate} - ${work.endDate}`, margin, currentY);
        currentY += 7;
        work.responsibilities.forEach((resp) => {
          doc.text(`• ${resp}`, margin + 5, currentY);
          currentY += 5;

          // Add new page if content might exceed page height
          if (currentY > maxContentHeight) {
            doc.addPage();
            currentY = margin;
          }
        });
        currentY += 5;
      });
    }

    // Skills
    if (resume.skills && resume.skills.length > 0) {
      doc.setFontSize(12);
      doc.text("Skills", margin, currentY);
      currentY += 7;
      doc.setFontSize(10);
      doc.text(resume.skills.join(" • "), margin, currentY);
    }

    // Save the PDF
    doc.save(`${resume.personalInfo.fullName}_Resume.pdf`);
  };

  // Escape quotes in text
  const escapeQuotes = (text: string) => {
    return text.replace(/"/g, "&quot;");
  };

  // Copy Resume Handler
  const handleCopyResume = () => {
    if (!onCopyResume) return;

    // Create a new resume with a new UUID and updated timestamps
    const copiedResume: Resume = {
      ...resume,
      id: uuidv4(), // Generate a new unique ID
      title: `Copy of ${resume.title}`, // Modify title to indicate it's a copy
      createdAt: new Date().toISOString(), // Set new creation timestamp
      updatedAt: new Date().toISOString(), // Set new update timestamp
    };

    onCopyResume(copiedResume);

    // Show a toast notification
    toast.success("Resume copied successfully!", {
      style: {
        background: "#E6F3E6", // Very light green
        color: "#2E7D32", // Dark green text
        border: "1px solid #4CAF50", // Subtle green border
      },
      position: "top-right",
      duration: 3000,
    });
  };

  return (
    <>
      <div
        className={`group relative bg-white rounded-xl border border-gray-200 p-5 
        transition-all duration-300 
        shadow-md hover:shadow-[0_10px_25px_-10px_rgba(0,0,0,0.1)] 
        hover:border-blue-100 
        hover:scale-[1.02]
        hover:bg-blue-50
        ${getResumeColor()}
        transform origin-center
        ring-1 ring-gray-100/50`}
      >
        {/* Actions */}
        <div
          className="absolute top-4 right-4 flex space-x-2 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 
          bg-white/80 backdrop-blur-sm 
          rounded-full p-1
        "
        >
          {/* Preview Button */}
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="text-gray-500 hover:text-blue-600 
              transition-colors 
              bg-gray-100/50 hover:bg-blue-100/50 
              rounded-full p-1.5"
            title="Preview Resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>

          {/* Copy Resume Button */}
          <button
            onClick={handleCopyResume}
            className="text-gray-500 hover:text-purple-600 
              transition-colors 
              bg-gray-100/50 hover:bg-purple-100/50 
              rounded-full p-1.5"
            title="Copy Resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>

          {/* Existing edit and download buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent any parent event handlers
              onEdit(resume);
            }}
            className="text-gray-500 hover:text-blue-600 
              transition-colors 
              bg-gray-100/50 hover:bg-blue-100/50 
              rounded-full p-1.5"
            title="Edit Resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(resume.id)}
            className="text-gray-500 hover:text-red-600 
              transition-colors 
              bg-gray-100/50 hover:bg-red-100/50 
              rounded-full p-1.5"
            title="Delete Resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="text-gray-500 hover:text-green-600 
              transition-colors 
              bg-gray-100/50 hover:bg-green-100/50 
              rounded-full p-1.5"
            title="Download PDF"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>

        {/* Resume Header */}
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h2
              className="text-lg font-semibold text-gray-800 mb-1 
              group-hover:text-blue-700 transition-colors"
            >
              {escapeQuotes(resume.title)}
            </h2>
            <p className="text-xs text-gray-500">
              {escapeQuotes("Updated: ") + formatDate(resume.updatedAt)}
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            {escapeQuotes(resume.personalInfo.fullName)}
          </h3>
          <div className="text-xs text-gray-500 space-y-1">
            <p>{escapeQuotes(resume.personalInfo.email)}</p>
            {resume.personalInfo.location && (
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 mr-1.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {escapeQuotes(resume.personalInfo.location)}
              </p>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {resume.summary && (
          <div className="mb-4">
            <p className="text-xs text-gray-600 italic">
              &quot;{escapeQuotes(truncate(resume.summary, 150))}&quot;
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div
          className="grid grid-cols-4 gap-1 text-xs text-gray-500 
          border-t border-gray-100 pt-3 
          group-hover:border-blue-100 
          transition-colors"
        >
          <div className="text-center group/stat hover:bg-blue-50/50 rounded-lg py-1 transition-colors">
            <span
              className="block font-medium text-gray-600 
              group-hover/stat:text-blue-700"
            >
              {resume.skills?.length || 0}
            </span>
            Skills
          </div>
          <div className="text-center group/stat hover:bg-blue-50/50 rounded-lg py-1 transition-colors">
            <span
              className="block font-medium text-gray-600 
              group-hover/stat:text-blue-700"
            >
              {resume.workExperience?.length || 0}
            </span>
            Jobs
          </div>
          <div className="text-center group/stat hover:bg-blue-50/50 rounded-lg py-1 transition-colors">
            <span
              className="block font-medium text-gray-600 
              group-hover/stat:text-blue-700"
            >
              {resume.education?.length || 0}
            </span>
            Education
          </div>
          <div className="text-center group/stat hover:bg-blue-50/50 rounded-lg py-1 transition-colors">
            <span
              className="block font-medium text-gray-600 
              group-hover/stat:text-blue-700"
            >
              {resume.projects?.length || 0}
            </span>
            Projects
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <PreviewResume
          resume={resume}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </>
  );
};
