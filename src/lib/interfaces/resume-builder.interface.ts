export interface Resume {
  id?: string;
  userId: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate?: Date;
    isCurrently?: boolean;
  }>;
  workExperience: Array<{
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    isCurrently?: boolean;
    responsibilities?: string[];
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications?: Array<{
    name: string;
    issuedBy: string;
    issueDate: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}