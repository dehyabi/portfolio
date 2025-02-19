import React from "react";
import { Resume } from "../types/resume";

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
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
      bg-black bg-opacity-50 backdrop-blur-sm 
      transition-all duration-300 ease-in-out"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-[90%] max-w-4xl max-h-[90vh] 
        overflow-y-auto relative p-8 
        transform transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 
          hover:text-red-600 transition-colors"
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

        {/* Resume Preview Content */}
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-6">
            {resume.title || "Resume Preview"}
          </h1>

          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Full Name:</strong> {resume.personalInfo.fullName}
              </div>
              <div>
                <strong>Email:</strong> {resume.personalInfo.email}
              </div>
              <div>
                <strong>Phone:</strong> {resume.personalInfo.phone}
              </div>
              <div>
                <strong>Location:</strong> {resume.personalInfo.location}
              </div>
            </div>
          </section>

          {/* Professional Summary */}
          {resume.summary && (
            <section>
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                Professional Summary
              </h2>
              <p>{resume.summary}</p>
            </section>
          )}

          {/* Education */}
          {resume.education && resume.education.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                Education
              </h2>
              {resume.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{edu.institution}</h3>
                    <span className="text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <p>{edu.degree}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Work Experience */}
          {resume.workExperience && resume.workExperience.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                Work Experience
              </h2>
              {resume.workExperience.map((work, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">
                      {work.company} - {work.position}
                    </h3>
                    <span className="text-gray-600">
                      {work.startDate} - {work.endDate}
                    </span>
                  </div>
                  <ul className="list-disc list-inside">
                    {work.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {resume.skills && resume.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {resume.certifications && resume.certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                Certifications
              </h2>
              {resume.certifications.map((cert, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{cert.name}</h3>
                    <span className="text-gray-600">{cert.date}</span>
                  </div>
                  <p>{cert.issuingOrganization}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {resume.projects && resume.projects.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                Projects
              </h2>
              {resume.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">
                      {project.name}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 text-sm hover:underline"
                        >
                          View Project
                        </a>
                      )}
                    </h3>
                    <span className="text-gray-600">
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>
                  <p>{project.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
