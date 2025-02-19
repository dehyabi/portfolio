import React, { useState, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Resume, ResumeFormProps } from "../types/resume";

export const ResumeForm: React.FC<
  ResumeFormProps & { isCreatingNew?: boolean }
> = ({ resume, onSubmit, onCancel, isCreatingNew = false }) => {
  // Add a log or use isCreatingNew to satisfy the linter
  const formMode = isCreatingNew ? "create" : "edit";
  console.log(`Form mode: ${formMode}`);

  // State initialization
  const [formData, setFormData] = useState<Resume>({
    id: resume?.id || uuidv4(),
    title: resume?.title || "",
    personalInfo: resume?.personalInfo || {
      fullName: "",
      email: "",
      phone: "",
      location: "",
    },
    summary: resume?.summary || "",
    education: resume?.education || [],
    workExperience: resume?.workExperience || [],
    skills: resume?.skills || [],
    certifications: resume?.certifications || [],
    projects: resume?.projects || [],
    achievements: resume?.achievements || [],
    volunteerExperience: resume?.volunteerExperience || [],
    relevantTools: resume?.relevantTools || [],
    relevantTechnologies: resume?.relevantTechnologies || [],
    languages: resume?.languages || [],
    hobbies: resume?.hobbies || [],
    references: resume?.references || [],
    createdAt: resume?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Handle form field change
  const handleChange = <K extends keyof Resume>(field: K, value: Resume[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Specific handler for nested arrays like education
  const handleEducationChange = (
    index: number,
    field: keyof Resume["education"][0],
    value: string | number | undefined
  ) => {
    const newEducation = [...formData.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value === "" ? undefined : value,
    };
    handleChange("education", newEducation);
  };

  const handleNestedChange = (
    field: keyof Resume["personalInfo"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, updatedAt: new Date().toISOString() });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-purple-600">
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
            Resume Builder
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg shadow-md border"
        >
          {/* Title */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">
              Resume Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Resume Title"
              required
              className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          {/* Personal Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={formData.personalInfo.fullName}
              onChange={(e) => handleNestedChange("fullName", e.target.value)}
              placeholder="Full Name"
              required
              className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) => handleNestedChange("email", e.target.value)}
              placeholder="Email"
              required
              className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              value={formData.personalInfo.phone}
              onChange={(e) => handleNestedChange("phone", e.target.value)}
              placeholder="Phone"
              className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={formData.personalInfo.location}
              onChange={(e) => handleNestedChange("location", e.target.value)}
              placeholder="Location"
              className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          {/* Summary */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">
              Professional Summary
            </label>
            <textarea
              value={formData.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
              placeholder="Professional Summary"
              rows={4}
              className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          {/* Education Section */}
          <div className="col-span-full">
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            {formData.education.map((edu, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "institution",
                        e.target.value
                      )
                    }
                    placeholder="e.g., Stanford University"
                    className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      handleEducationChange(index, "degree", e.target.value)
                    }
                    placeholder="e.g., Master of Science in Computer Science"
                    className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) =>
                      handleEducationChange(index, "startDate", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) =>
                      handleEducationChange(index, "endDate", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    GPA (optional)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="4.0"
                    value={edu.gpa || ""}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "gpa",
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                    placeholder="e.g., 3.9"
                    className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleChange("education", [
                  ...formData.education,
                  { institution: "", degree: "", startDate: "", endDate: "" },
                ])
              }
              className="text-blue-600 hover:text-blue-800"
            >
              + Add Education
            </button>
          </div>

          {/* Work Experience Section */}
          <div className="col-span-full">
            <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
            {formData.workExperience.map((work, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={work.company}
                  onChange={(e) => {
                    const newWorkExperience = [...formData.workExperience];
                    newWorkExperience[index].company = e.target.value;
                    handleChange("workExperience", newWorkExperience);
                  }}
                  placeholder="Company"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="text"
                  value={work.position}
                  onChange={(e) => {
                    const newWorkExperience = [...formData.workExperience];
                    newWorkExperience[index].position = e.target.value;
                    handleChange("workExperience", newWorkExperience);
                  }}
                  placeholder="Position"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="date"
                  value={work.startDate}
                  onChange={(e) => {
                    const newWorkExperience = [...formData.workExperience];
                    newWorkExperience[index].startDate = e.target.value;
                    handleChange("workExperience", newWorkExperience);
                  }}
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="date"
                  value={work.endDate}
                  onChange={(e) => {
                    const newWorkExperience = [...formData.workExperience];
                    newWorkExperience[index].endDate = e.target.value;
                    handleChange("workExperience", newWorkExperience);
                  }}
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <textarea
                  value={work.responsibilities.join("\n")}
                  onChange={(e) => {
                    const newWorkExperience = [...formData.workExperience];
                    newWorkExperience[index].responsibilities =
                      e.target.value.split("\n");
                    handleChange("workExperience", newWorkExperience);
                  }}
                  placeholder="Responsibilities (one per line)"
                  className="col-span-2 mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleChange("workExperience", [
                  ...formData.workExperience,
                  {
                    company: "",
                    position: "",
                    startDate: "",
                    endDate: "",
                    responsibilities: [],
                  },
                ])
              }
              className="text-blue-600 hover:text-blue-800"
            >
              + Add Work Experience
            </button>
          </div>

          {/* Skills Section */}
          <div className="col-span-full">
            <label className="text-lg font-semibold mb-4">Skills</label>
            <textarea
              value={formData.skills.join("\n")}
              onChange={(e) =>
                handleChange("skills", e.target.value.split("\n"))
              }
              placeholder="Enter skills (one per line)"
              rows={3}
              className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          {/* Certifications Section */}
          <div className="col-span-full">
            <h3 className="text-lg font-semibold mb-4">Certifications</h3>
            {formData.certifications?.map((cert, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => {
                    const newCertifications = [
                      ...(formData.certifications || []),
                    ];
                    newCertifications[index].name = e.target.value;
                    handleChange("certifications", newCertifications);
                  }}
                  placeholder="Certification Name"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="text"
                  value={cert.issuingOrganization}
                  onChange={(e) => {
                    const newCertifications = [
                      ...(formData.certifications || []),
                    ];
                    newCertifications[index].issuingOrganization =
                      e.target.value;
                    handleChange("certifications", newCertifications);
                  }}
                  placeholder="Issuing Organization"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="date"
                  value={cert.date}
                  onChange={(e) => {
                    const newCertifications = [
                      ...(formData.certifications || []),
                    ];
                    newCertifications[index].date = e.target.value;
                    handleChange("certifications", newCertifications);
                  }}
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleChange("certifications", [
                  ...(formData.certifications || []),
                  { name: "", issuingOrganization: "", date: "" },
                ])
              }
              className="text-blue-600 hover:text-blue-800"
            >
              + Add Certification
            </button>
          </div>

          {/* Projects Section */}
          <div className="col-span-full">
            <h3 className="text-lg font-semibold mb-4">Projects</h3>
            {formData.projects?.map((project, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => {
                    const newProjects = [...(formData.projects || [])];
                    newProjects[index].name = e.target.value;
                    handleChange("projects", newProjects);
                  }}
                  placeholder="Project Name"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="text"
                  value={project.url}
                  onChange={(e) => {
                    const newProjects = [...(formData.projects || [])];
                    newProjects[index].url = e.target.value;
                    handleChange("projects", newProjects);
                  }}
                  placeholder="Project URL"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <textarea
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...(formData.projects || [])];
                    newProjects[index].description = e.target.value;
                    handleChange("projects", newProjects);
                  }}
                  placeholder="Project Description"
                  className="col-span-2 mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="date"
                  value={project.startDate}
                  onChange={(e) => {
                    const newProjects = [...(formData.projects || [])];
                    newProjects[index].startDate = e.target.value;
                    handleChange("projects", newProjects);
                  }}
                  placeholder="Start Date"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="date"
                  value={project.endDate}
                  onChange={(e) => {
                    const newProjects = [...(formData.projects || [])];
                    newProjects[index].endDate = e.target.value;
                    handleChange("projects", newProjects);
                  }}
                  placeholder="End Date"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleChange("projects", [
                  ...(formData.projects || []),
                  {
                    name: "",
                    description: "",
                    url: "",
                    startDate: "",
                    endDate: "",
                  },
                ])
              }
              className="text-blue-600 hover:text-blue-800"
            >
              + Add Project
            </button>
          </div>

          {/* Achievements Section */}
          <div className="col-span-full">
            <label className="text-lg font-semibold mb-4">Achievements</label>
            <textarea
              value={formData.achievements?.join("\n") || ""}
              onChange={(e) =>
                handleChange("achievements", e.target.value.split("\n"))
              }
              placeholder="Enter achievements (one per line)"
              rows={3}
              className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          {/* Volunteer Experience Section */}
          <div className="col-span-full">
            <h3 className="text-lg font-semibold mb-4">Volunteer Experience</h3>
            {formData.volunteerExperience?.map((volunteer, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={volunteer.organization}
                  onChange={(e) => {
                    const newVolunteerExperience = [
                      ...(formData.volunteerExperience || []),
                    ];
                    newVolunteerExperience[index].organization = e.target.value;
                    handleChange("volunteerExperience", newVolunteerExperience);
                  }}
                  placeholder="Organization"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="text"
                  value={volunteer.position}
                  onChange={(e) => {
                    const newVolunteerExperience = [
                      ...(formData.volunteerExperience || []),
                    ];
                    newVolunteerExperience[index].position = e.target.value;
                    handleChange("volunteerExperience", newVolunteerExperience);
                  }}
                  placeholder="Position"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="date"
                  value={volunteer.startDate}
                  onChange={(e) => {
                    const newVolunteerExperience = [
                      ...(formData.volunteerExperience || []),
                    ];
                    newVolunteerExperience[index].startDate = e.target.value;
                    handleChange("volunteerExperience", newVolunteerExperience);
                  }}
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="date"
                  value={volunteer.endDate}
                  onChange={(e) => {
                    const newVolunteerExperience = [
                      ...(formData.volunteerExperience || []),
                    ];
                    newVolunteerExperience[index].endDate = e.target.value;
                    handleChange("volunteerExperience", newVolunteerExperience);
                  }}
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <textarea
                  value={volunteer.responsibilities.join("\n")}
                  onChange={(e) => {
                    const newVolunteerExperience = [
                      ...(formData.volunteerExperience || []),
                    ];
                    newVolunteerExperience[index].responsibilities =
                      e.target.value.split("\n");
                    handleChange("volunteerExperience", newVolunteerExperience);
                  }}
                  placeholder="Responsibilities (one per line)"
                  className="col-span-2 mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleChange("volunteerExperience", [
                  ...(formData.volunteerExperience || []),
                  {
                    organization: "",
                    position: "",
                    startDate: "",
                    endDate: "",
                    responsibilities: [],
                  },
                ])
              }
              className="text-blue-600 hover:text-blue-800"
            >
              + Add Volunteer Experience
            </button>
          </div>

          {/* Relevant Tools Section */}
          <div className="col-span-full">
            <label className="text-lg font-semibold mb-4">Relevant Tools</label>
            <textarea
              value={formData.relevantTools?.join("\n") || ""}
              onChange={(e) =>
                handleChange("relevantTools", e.target.value.split("\n"))
              }
              placeholder="Enter relevant tools (one per line)"
              rows={2}
              className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          {/* Relevant Technologies Section */}
          <div className="col-span-full">
            <label className="text-lg font-semibold mb-4">
              Relevant Technologies
            </label>
            <textarea
              value={formData.relevantTechnologies?.join("\n") || ""}
              onChange={(e) =>
                handleChange("relevantTechnologies", e.target.value.split("\n"))
              }
              placeholder="Enter relevant technologies (one per line)"
              rows={2}
              className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          {/* Languages Section */}
          <div className="col-span-full">
            <label className="text-lg font-semibold mb-4">Languages</label>
            <textarea
              value={formData.languages?.join("\n") || ""}
              onChange={(e) =>
                handleChange("languages", e.target.value.split("\n"))
              }
              placeholder="Enter languages (one per line)"
              rows={2}
              className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          {/* Hobbies Section */}
          <div className="col-span-full">
            <label className="text-lg font-semibold mb-4">Hobbies</label>
            <textarea
              value={formData.hobbies?.join("\n") || ""}
              onChange={(e) =>
                handleChange("hobbies", e.target.value.split("\n"))
              }
              placeholder="Enter hobbies (one per line)"
              rows={2}
              className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          {/* References Section */}
          <div className="col-span-full">
            <h3 className="text-lg font-semibold mb-4">References</h3>
            {formData.references?.map((reference, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={reference.name}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index].name = e.target.value;
                    handleChange("references", newReferences);
                  }}
                  placeholder="Name"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="text"
                  value={reference.title}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index].title = e.target.value;
                    handleChange("references", newReferences);
                  }}
                  placeholder="Title"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="text"
                  value={reference.company}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index].company = e.target.value;
                    handleChange("references", newReferences);
                  }}
                  placeholder="Company"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="tel"
                  value={reference.phone}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index].phone = e.target.value;
                    handleChange("references", newReferences);
                  }}
                  placeholder="Phone"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
                <input
                  type="email"
                  value={reference.email}
                  onChange={(e) => {
                    const newReferences = [...(formData.references || [])];
                    newReferences[index].email = e.target.value;
                    handleChange("references", newReferences);
                  }}
                  placeholder="Email"
                  className="mt-1 block w-full border border-gray-300 outline-blue-500 rounded-md shadow-sm py-2 px-3"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleChange("references", [
                  ...(formData.references || []),
                  { name: "", title: "", company: "", phone: "", email: "" },
                ])
              }
              className="text-blue-600 hover:text-blue-800"
            >
              + Add Reference
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <button
              type="submit"
              className="w-full sm:w-1/2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 border border-transparent transition-colors"
            >
              {resume?.id ? "Update Resume" : "Create Resume"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-1/2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 outline-blue-500 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
