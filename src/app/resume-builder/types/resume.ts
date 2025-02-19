export interface Resume {
  id: string;
  title: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  education: Array<{
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    gpa?: number;
  }>;
  workExperience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
  }>;
  skills: string[];
  certifications?: Array<{
    name: string;
    issuingOrganization: string;
    date: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    url: string;
    startDate: string;
    endDate: string;
  }>;
  achievements?: string[];
  volunteerExperience?: Array<{
    organization: string;
    position: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
  }>;
  relevantTools?: string[];
  relevantTechnologies?: string[];
  languages?: string[];
  hobbies?: string[];
  references?: Array<{
    name: string;
    title: string;
    company: string;
    phone: string;
    email: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeFormProps {
  resume?: Resume;
  onSubmit: (resume: Resume) => void;
  onCancel: () => void;
}

export interface ResumeItemProps {
  resume: Resume;
  onEdit: (resume: Resume) => void;
  onDelete: (id: string) => void;
}