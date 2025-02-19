# Dehya Qalbi - Personal Portfolio

## 🚀 Overview

A modern, responsive personal portfolio website showcasing my skills, experience, and projects, built with cutting-edge web technologies.

## 🛠 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## ✨ Features

- Minimalist and futuristic design
- Responsive layout
- Detailed skills showcase
- Personal projects overview

## 🌟 Sections

- About Me
- Skills
- Personal Projects

## 📬 Contact

- Email: dehyafullstack@gmail.com
- LinkedIn: linkedin.com/in/dehyabi
- GitHub: github.com/dehyabi

# Portfolio Projects

## 🚀 Overview

This portfolio contains three sophisticated web applications demonstrating modern web development practices and user-centric design.

## 🔧 Tech Stack

- **Frontend**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Deployment**: Vercel
- **Storage**: Local Storage (Client-side)

## 1. 💰 Finance Tracker

### 🌟 Project Description

A comprehensive personal finance management application designed to help users track their income and expenses with intuitive features and detailed insights.

### 🔑 Key Features

- **Entry Management**

  - Add, edit, and delete financial entries
  - Support for income and expense tracking
  - Categorize financial transactions

- **Advanced Filtering**

  - Filter entries by type (income/expense)
  - Amount range filtering
  - Date range selection
  - Multi-category filtering

- **Pagination**

  - Display 5 entries per page
  - Easy navigation between pages

- **Responsive Design**
  - Mobile and desktop-friendly interface
  - Adaptive UI components

### 🛠 Technical Highlights

- Local storage for persistent data
- Dynamic category management
- Comprehensive error handling
- Toast notifications for user feedback

### 📊 Data Model

```typescript
interface FinanceEntry {
  id: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: Date;
  description: string;
}
```

## 2. 📋 Task Manager

### 🌟 Project Description

A powerful task management application that helps users organize, prioritize, and track their tasks efficiently.

### 🔑 Key Features

- **Task Operations**

  - Create, update, and delete tasks
  - Set priorities and due dates
  - Mark tasks as complete

- **Advanced Filtering**

  - Filter by task status
  - Priority-based filtering
  - Date range selection
  - Tag-based organization

- **Task Categorization**

  - Custom tag creation
  - Color-coded tags
  - Drag-and-drop task management

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layout for various screen sizes

### 🛠 Technical Highlights

- Local storage for data persistence
- Dynamic tag management
- Comprehensive form validation
- Intuitive user interactions

### 📊 Data Model

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  tags: string[];
}
```

## 3. 📄 Resume Builder

### 🌟 Project Description

An intelligent resume creation tool that guides users through building professional, well-structured resumes with real-time preview and export capabilities.

### 🔑 Key Features

- **Resume Sections**

  - Personal Information
  - Education
  - Work Experience
  - Skills
  - Projects
  - Certifications

- **Dynamic Form Management**

  - Add/remove sections dynamically
  - Inline editing
  - Drag-and-drop section reordering

- **Preview Functionality**

  - Real-time resume preview
  - Instant visual feedback
  - Responsive design

- **Export Options**
  - PDF generation
  - Printable format
  - Shareable link generation

### 🛠 Technical Highlights

- Local storage for draft saving
- Form state management
- Dynamic component rendering
- Comprehensive validation

### 📊 Data Model

```typescript
interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    graduationDate: Date;
  }>;
  workExperience: Array<{
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    responsibilities: string[];
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}
```

## 🌐 Deployment

- **Platform**: Vercel
- **Domain**: [Your Portfolio Domain]

## 🔒 Security

- Client-side data storage
- No sensitive information persistence
- Secure, randomized local storage keys

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/dehyabi/portfolio.git
cd portfolio
npm install
npm run dev
```

## 📜 License

MIT License

Copyright (c) 2025 Dehya Qalbi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
