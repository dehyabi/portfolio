import React from "react";
import Image from "next/image";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaFileLines, FaListCheck, FaChartSimple } from "react-icons/fa6";

export default function HomePage() {
  const skills = [
    "Laravel",
    "Next.js",
    "Vue.js",
    "Node.js",
    "PHP",
    "Python",
    "JavaScript",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "MySQL",
    "PostgreSQL",
    "Supabase",
    "Redis",
    "Go",
    "Git",
  ];

  const personalProjects = [
    {
      name: "Resume Builder",
      icon: FaFileLines,
      link: "/resume-builder",
    },
    {
      name: "Task Manager",
      icon: FaListCheck,
      link: "/task-manager",
    },
    {
      name: "Finance Tracker",
      icon: FaChartSimple,
      link: "/finance-tracker",
    },
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      link: "mailto:dehyafullstack@gmail.com",
    },
    {
      icon: FaLinkedin,
      link: "https://linkedin.com/in/dehyabi",
    },
    {
      icon: FaGithub,
      link: "https://github.com/dehyabi",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-full space-y-8 bg-gray-800/50 backdrop-blur-lg p-10 shadow-2xl border border-gray-700/50 rounded-lg">
        <div className="flex justify-center mb-6">
          <Image
            src="/dehya-qalbi.webp"
            alt="Dehya Qalbi Profile"
            width={200}
            height={200}
            className="rounded-full border-4 border-cyan-500/50 shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-8">
          DEHYA QALBI
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400 text-center">
            ABOUT
          </h2>
          <p className="text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
            A full-stack developer with three years of professional experience
            specializing in web development, project management, agile
            methodology, and quality assurance testing. Adept at coordinating
            effectively with development teams, clients, and non-technical
            stakeholders to execute complex web development projects.
          </p>
        </section>

        <div className="space-y-8 max-w-4xl mx-auto">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400 text-center">
              SKILLS
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-1 bg-gray-700/50 rounded-full text-sm font-medium hover:bg-cyan-600/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400 text-center">
              PROJECTS
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {personalProjects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <a
                    key={index}
                    href={project.link}
                    className="flex items-center justify-center bg-gray-700/50 rounded-lg p-3 hover:bg-cyan-600/30 transition-colors space-x-2"
                  >
                    <Icon className="text-2xl" />
                    <span>{project.name}</span>
                  </a>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400 text-center">
              CONTACT
            </h2>
            <div className="flex justify-center items-center space-x-6">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    <Icon className="text-3xl" />
                  </a>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
