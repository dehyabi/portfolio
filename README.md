# Dehya Qalbi - Personal Portfolio

## 🚀 Overview

A modern, responsive personal portfolio website showcasing my skills, experience, and projects, built with cutting-edge web technologies.

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
  - Date range selection
  - Category filtering

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

A comprehensive resume creation tool that provides a flexible, feature-rich platform for crafting professional resumes with extensive customization options.

### 🔑 Key Features

- **Comprehensive Resume Sections**

  - Personal Information
    - Full Name
    - Contact Details (Email, Phone)
    - Location
  - Professional Summary
  - Education History
    - Institutions
    - Degrees
    - Academic Dates
    - Optional GPA
  - Work Experience
    - Companies
    - Positions
    - Detailed Responsibilities
    - Employment Dates
  - Skills Showcase
  - Optional Advanced Sections:
    - Certifications
    - Projects
    - Achievements
    - Volunteer Experience
    - Relevant Tools & Technologies
    - Languages
    - Hobbies
    - Professional References

- **Dynamic Form Management**

  - Fully customizable resume structure
  - Add/remove sections dynamically
  - Flexible entry management
  - Inline editing with validation

- **Export and Customization**
  - Comprehensive PDF generation
  - Multiple resume templates
  - Responsive design
  - Instant preview

### 🛠 Technical Implementation

- **Data Model**: Robust TypeScript interface with optional fields
- **Frontend**: Next.js 15 with TypeScript
- **State Management**: React Hooks and Context API
- **Form Handling**: Dynamic, type-safe form management
- **Styling**: Tailwind CSS for responsive design
- **Deployment**: GitHub Page
- **Storage**: Local Storage (Client-side)

### 🎯 User Experience

Empowers users to create detailed, professional resumes with maximum flexibility. Supports everything from basic job applications to comprehensive professional portfolios.

## 🌐 Deployment

- **Platform**: GitHub Page
- **Domain**: https://dehyabi.github.io

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
