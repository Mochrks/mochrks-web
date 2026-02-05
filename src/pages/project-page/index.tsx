import React, { useEffect, useState } from "react";
import { CardProject } from "@/components/demo/CardProject";
import ScrollToTopButton from "@/components/demo/ScrollToTopButton";
import { FlipLinkTitle } from "@/components/demo/Title";
import { getGithubRepos } from "@/services/project-service";
import { LoadingContent } from "@/components/demo/LoadingContent";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GitHubProject, MappedProject } from "@/types/github";

export default function ProjectIndex() {
  const [projects, setProjects] = useState<MappedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await getGithubRepos(1000);

        const fetchedProjects: GitHubProject[] = response ?? [];

        const mappedProjects: MappedProject[] = fetchedProjects.map((project: GitHubProject) => ({
          id: project.id,
          name: project.name,
          full_name: project.full_name ?? "",
          description: project.description ?? "No description",
          html_url: project.html_url ?? "",
          homepage: project.homepage ?? "",
          topics: project.topics ?? [],
          created_at: project.created_at ?? new Date().toISOString(),
          updated_at: project.updated_at ?? new Date().toISOString(),
        }));

        const sortedProjects = mappedProjects.sort(
          (a: MappedProject, b: MappedProject) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

        setProjects(sortedProjects);
        setIsLoading(false);
      } catch (err: unknown) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects");
        setIsLoading(false);
        setProjects([]);
      }
    };

    fetchProjects();
  }, []);

  const ProjectEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="relative w-72 h-72 md:w-96 md:h-96 mb-8">
        <svg
          className="w-full h-full"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>

          <circle cx="200" cy="200" r="180" fill="url(#bgGradient)" />

          <rect
            x="120"
            y="120"
            width="160"
            height="120"
            rx="20"
            fill="url(#mainGradient)"
            fillOpacity="0.3"
            stroke="url(#mainGradient)"
            strokeWidth="2"
          />

          <rect x="140" y="140" width="80" height="8" rx="4" fill="#60A5FA" />
          <rect x="140" y="160" width="100" height="8" rx="4" fill="#8B5CF6" />
          <rect x="140" y="180" width="60" height="8" rx="4" fill="#3B82F6" />
          <rect x="140" y="200" width="120" height="8" rx="4" fill="#60A5FA" />

          <g className="floating">
            <rect x="80" y="80" width="40" height="40" rx="8" fill="#3B82F6" fillOpacity="0.2">
              <animate attributeName="y" values="80;70;80" dur="3s" repeatCount="indefinite" />
            </rect>

            <circle cx="300" cy="100" r="20" fill="#8B5CF6" fillOpacity="0.2">
              <animate attributeName="cy" values="100;90;100" dur="2.5s" repeatCount="indefinite" />
            </circle>

            <rect x="320" y="280" width="30" height="30" rx="6" fill="#10B981" fillOpacity="0.2">
              <animate attributeName="y" values="280;270;280" dur="3.5s" repeatCount="indefinite" />
            </rect>
          </g>

          <line
            x1="160"
            y1="160"
            x2="90"
            y2="100"
            stroke="#6B7280"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <line
            x1="240"
            y1="180"
            x2="300"
            y2="120"
            stroke="#6B7280"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <line
            x1="220"
            y1="220"
            x2="335"
            y2="295"
            stroke="#6B7280"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="max-w-2xl">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          No Projects Available
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-400 mb-2"
        >
          It seems there are no projects to display at the moment.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 mb-8"
        >
          This could be due to a connection issue or there might be no repositories in the account.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 border-2 border-gray-600 text-white font-medium rounded-lg transition-all duration-300 hover:bg-blue-500/10"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh Projects
            </span>
          </button>

          <a
            href="https://github.com/mochrks"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-gray-600 text-white font-medium rounded-lg transition-all duration-300 hover:bg-gray-800/50 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Visit GitHub
          </a>

          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 border-2 border-gray-600 text-white font-medium rounded-lg transition-all duration-300 hover:bg-gray-800/50 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
        </motion.div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center ">
        <LoadingContent />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ProjectEmptyState />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="pb-20">
        <div className="w-full">
          <div className="flex flex-col place-content-center gap-2 bg-white px-8 py-14 lg:py-24 dark:bg-gray-900">
            <div className="text-black dark:text-white">
              <FlipLinkTitle>ALL </FlipLinkTitle>
              <FlipLinkTitle>PROJECT.</FlipLinkTitle>
            </div>
            <div>
              <InteractiveHoverButton
                onClick={() => navigate("/")}
                className="text-sm md:text-lg xs font-medium mt:2"
              >
                Back
              </InteractiveHoverButton>
            </div>
          </div>
        </div>
        <ProjectEmptyState />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="w-full">
        <div className="flex flex-col place-content-center gap-2 bg-white dark:bg-gray-900 px-8 py-14 lg:py-24 ">
          <div className="text-black dark:text-white">
            <FlipLinkTitle>ALL </FlipLinkTitle>
            <FlipLinkTitle>PROJECT.</FlipLinkTitle>
          </div>
          <div>
            <InteractiveHoverButton
              onClick={() => navigate("/")}
              className="text-sm md:text-lg xs font-medium mt:2"
            >
              Back
            </InteractiveHoverButton>
          </div>
        </div>
      </div>
      <div className="w-full h-full px-4 py-8 md:px-6 md:py-12 lg:px-20 lg:py-16 ">
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Code Innovation
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl">
            A collection of coding projects, open-source contributions, and technical experiments
            pushing the boundaries of web development.
          </p>
        </div>
        <div className="w-full flex items-center justify-center ">
          <div className="max-w-full mx-auto ">
            <CardProject items={projects} cols={3} />
          </div>
        </div>
        <div className="flex justify-center mb-20">
          <InteractiveHoverButton onClick={() => navigate("/")} className="text-lg font-medium">
            Back to Previous Page
          </InteractiveHoverButton>
        </div>
        <ScrollToTopButton />
      </div>
    </div>
  );
}
