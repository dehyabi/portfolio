import React, { useState, useEffect } from "react";
import { Resume } from "../types/resume";
import jsPDF from "jspdf";

interface PreviewResumeProps {
  resume: Resume;
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewResume: React.FC<PreviewResumeProps> = ({
  resume,
  isOpen,
  onClose,
}) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Generate PDF when modal opens
      const generatePDF = () => {
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        // Page dimensions
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        let currentY = margin;

        // Fonts and Styling
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        // Helper function to add new page if needed
        const checkPageBreak = (requiredSpace: number) => {
          if (currentY + requiredSpace > pageHeight - margin) {
            doc.addPage();
            currentY = margin;
          }
        };

        // Title
        doc.setFontSize(16);
        doc.text(resume.title || "Resume", pageWidth / 2, currentY, {
          align: "center",
        });
        currentY += 10;

        // Personal Information
        doc.setFontSize(12);
        checkPageBreak(20);
        doc.text(`Name: ${resume.personalInfo.fullName}`, margin, currentY);
        currentY += 7;
        doc.text(`Email: ${resume.personalInfo.email}`, margin, currentY);
        currentY += 7;
        doc.text(
          `Phone: ${resume.personalInfo.phone || "N/A"}`,
          margin,
          currentY
        );
        currentY += 7;
        doc.text(
          `Location: ${resume.personalInfo.location || "N/A"}`,
          margin,
          currentY
        );
        currentY += 10;

        // Professional Summary
        if (resume.summary) {
          checkPageBreak(20);
          doc.setFontSize(14);
          doc.text("Professional Summary", margin, currentY);
          currentY += 7;
          doc.setFontSize(10);
          doc.text(
            doc.splitTextToSize(resume.summary, pageWidth - 2 * margin),
            margin,
            currentY
          );
          currentY += 15;
        }

        // Education
        if (resume.education && resume.education.length > 0) {
          checkPageBreak(20);
          doc.setFontSize(14);
          doc.text("Education", margin, currentY);
          currentY += 7;
          doc.setFontSize(10);
          resume.education.forEach((edu) => {
            checkPageBreak(20);
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
          });
        }

        // Work Experience
        if (resume.workExperience && resume.workExperience.length > 0) {
          checkPageBreak(20);
          doc.setFontSize(14);
          doc.text("Work Experience", margin, currentY);
          currentY += 7;
          doc.setFontSize(10);
          resume.workExperience.forEach((work) => {
            checkPageBreak(30);
            doc.text(`${work.company} - ${work.position}`, margin, currentY);
            currentY += 7;
            doc.text(`${work.startDate} - ${work.endDate}`, margin, currentY);
            currentY += 7;
            work.responsibilities.forEach((resp) => {
              doc.text(`• ${resp}`, margin + 5, currentY);
              currentY += 5;
            });
            currentY += 5;
          });
        }

        // Skills
        if (resume.skills && resume.skills.length > 0) {
          checkPageBreak(20);
          doc.setFontSize(14);
          doc.text("Skills", margin, currentY);
          currentY += 7;
          doc.setFontSize(10);
          doc.text(resume.skills.join(" • "), margin, currentY);
          currentY += 10;
        }

        // Certifications
        if (resume.certifications && resume.certifications.length > 0) {
          checkPageBreak(20);
          doc.setFontSize(14);
          doc.text("Certifications", margin, currentY);
          currentY += 7;
          doc.setFontSize(10);
          resume.certifications.forEach((cert) => {
            checkPageBreak(20);
            doc.text(`${cert.name}`, margin, currentY);
            currentY += 7;
            doc.text(
              `Issued by: ${cert.issuingOrganization} | Date: ${cert.date}`,
              margin,
              currentY
            );
            currentY += 10;
          });
        }

        // Projects
        if (resume.projects && resume.projects.length > 0) {
          checkPageBreak(20);
          doc.setFontSize(14);
          doc.text("Projects", margin, currentY);
          currentY += 7;
          doc.setFontSize(10);
          resume.projects.forEach((project) => {
            checkPageBreak(30);
            doc.text(`${project.name}`, margin, currentY);
            currentY += 7;
            if (project.url) {
              doc.text(`URL: ${project.url}`, margin, currentY);
              currentY += 7;
            }
            doc.text(
              `${project.startDate} - ${project.endDate}`,
              margin,
              currentY
            );
            currentY += 7;
            doc.text(
              doc.splitTextToSize(project.description, pageWidth - 2 * margin),
              margin,
              currentY
            );
            currentY += 10;
          });
        }

        // Achievements
        if (resume.achievements && resume.achievements.length > 0) {
          checkPageBreak(20);
          doc.setFontSize(14);
          doc.text("Achievements", margin, currentY);
          currentY += 7;
          doc.setFontSize(10);
          resume.achievements.forEach((achievement) => {
            doc.text(`• ${achievement}`, margin, currentY);
            currentY += 7;
          });
          currentY += 5;
        }

        // Volunteer Experience
        if (
          resume.volunteerExperience &&
          resume.volunteerExperience.length > 0
        ) {
          checkPageBreak(20);
          doc.setFontSize(14);
          doc.text("Volunteer Experience", margin, currentY);
          currentY += 7;
          doc.setFontSize(10);
          resume.volunteerExperience.forEach((volunteer) => {
            checkPageBreak(30);
            doc.text(
              `${volunteer.organization} - ${volunteer.position}`,
              margin,
              currentY
            );
            currentY += 7;
            doc.text(
              `${volunteer.startDate} - ${volunteer.endDate}`,
              margin,
              currentY
            );
            currentY += 7;
            volunteer.responsibilities.forEach((resp) => {
              doc.text(`• ${resp}`, margin + 5, currentY);
              currentY += 5;
            });
            currentY += 5;
          });
        }

        // Relevant Tools
        if (resume.relevantTools && resume.relevantTools.length > 0) {
          checkPageBreak(20);
          doc.setFontSize(14);
          doc.text("Relevant Tools", margin, currentY);
          currentY += 7;
          doc.setFontSize(10);
          doc.text(resume.relevantTools.join(" • "), margin, currentY);
          currentY += 10;
        }

        // Relevant Technologies
        if (
          resume.relevantTechnologies &&
          resume.relevantTechnologies.length > 0
        ) {
          checkPageBreak(20);
          doc.setFontSize(14);
          doc.text("Relevant Technologies", margin, currentY);
          currentY += 7;
          doc.setFontSize(10);
          doc.text(resume.relevantTechnologies.join(" • "), margin, currentY);
          currentY += 10;
        }

        // Languages
        if (resume.languages && resume.languages.length > 0) {
          checkPageBreak(20);
          doc.setFontSize(14);
          doc.text("Languages", margin, currentY);
          currentY += 7;
          doc.setFontSize(10);
          doc.text(resume.languages.join(" • "), margin, currentY);
          currentY += 10;
        }

        // Hobbies
        if (resume.hobbies && resume.hobbies.length > 0) {
          checkPageBreak(20);
          doc.setFontSize(14);
          doc.text("Hobbies", margin, currentY);
          currentY += 7;
          doc.setFontSize(10);
          doc.text(resume.hobbies.join(" • "), margin, currentY);
          currentY += 10;
        }

        // References
        if (resume.references && resume.references.length > 0) {
          checkPageBreak(20);
          doc.setFontSize(14);
          doc.text("References", margin, currentY);
          currentY += 7;
          doc.setFontSize(10);
          resume.references.forEach((ref) => {
            checkPageBreak(30);
            doc.text(`${ref.name}`, margin, currentY);
            currentY += 7;
            doc.text(`${ref.title}, ${ref.company}`, margin, currentY);
            currentY += 7;
            doc.text(`Phone: ${ref.phone}`, margin, currentY);
            currentY += 7;
            doc.text(`Email: ${ref.email}`, margin, currentY);
            currentY += 10;
          });
        }

        // Generate PDF URL
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
      };

      generatePDF();
    }

    // Cleanup function to revoke URL
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [isOpen, resume]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
      bg-black bg-opacity-50 backdrop-blur-sm 
      transition-all duration-300 ease-in-out"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-[90%] max-w-4xl h-[90vh] 
        relative p-8 overflow-hidden
        transform transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 
          hover:text-red-600 transition-colors z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* PDF Viewer */}
        {pdfUrl && (
          <div className="w-full h-full p-3">
            <iframe
              src={pdfUrl}
              width="100%"
              height="100%"
              title="Resume Preview"
              className="border-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};
