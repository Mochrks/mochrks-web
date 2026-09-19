import { useEffect, useState } from "react";
import { CardProject } from "@/components/ui/card-project";
import ScrollToTopButton from "@/components/layout/scroll-to-top-button";
import { FlipLinkTitle } from "@/components/ui/title";
import { getGithubRepos } from "@/services/project-service";
import { LoadingContent } from "@/components/layout/loading-content";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GitHubProject, MappedProject } from "@/types/github";
import { REAL_PROJECTS } from "@/apis/real-projects";
import SEO from "@/components/layout/seo";
import { FolderArchive, RefreshCcw, Github, ArrowLeft } from "lucide-react";

export default function ProjectIndex() {
  const [githubProjects, setGithubProjects] = useState<MappedProject[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
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

        setGithubProjects(sortedProjects);
        setIsLoading(false);
      } catch (err: unknown) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects");
        setIsLoading(false);
        setGithubProjects([]);
      }
    };

    fetchProjects();
  }, []);

  const ProjectEmptyState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[70vh] relative"
    >
      {/* Huge Outline 404 Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <div
          className="text-[clamp(8rem,30vw,22rem)] font-black text-transparent whitespace-nowrap"
          style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.08)", lineHeight: 1 }}
        >
          404
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, type: "spring", bounce: 0.4 }}
        className="relative mb-10 z-10"
      >
        <div className="absolute inset-0 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        {/* Cute Alien Character SVG */}
        <svg
          width="240"
          height="240"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto drop-shadow-2xl relative z-10 overflow-visible"
        >
          <g>
            {/* Body */}
            <path
              d="M100 40 C 50 40, 40 90, 40 130 C 40 160, 60 170, 75 160 C 85 150, 95 170, 100 170 C 105 170, 115 150, 125 160 C 140 170, 160 160, 160 130 C 160 90, 150 40, 100 40 Z"
              fill="#10B981"
            />

            {/* Big Eye */}
            <circle cx="100" cy="85" r="28" fill="white" />
            <circle cx="100" cy="85" r="12" fill="#1F2937">
              <animate attributeName="cx" values="95;105;95" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="105" cy="80" r="4" fill="white" />

            {/* Sad/Ooh Mouth */}
            <circle cx="100" cy="130" r="8" fill="#047857" opacity="0.6" />

            {/* Antennas */}
            <path
              d="M85 43 C 70 20, 60 10, 70 15"
              stroke="#10B981"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="70" cy="15" r="7" fill="#F59E0B" className="animate-pulse" />

            <path
              d="M115 43 C 130 20, 140 10, 130 15"
              stroke="#10B981"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="130" cy="15" r="7" fill="#3B82F6" className="animate-pulse" />

            {/* Little arms */}
            <path
              d="M45 100 Q 20 120 30 130"
              stroke="#10B981"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M155 100 Q 180 120 170 130"
              stroke="#10B981"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          </g>
          {/* Shadow */}
          <ellipse cx="100" cy="185" rx="55" ry="12" fill="black" opacity="0.25" />
        </svg>
      </motion.div>

      <div className="max-w-md mx-auto relative z-10">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4 font-sans tracking-tight"
        >
          No Projects Found
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-zinc-400 text-sm md:text-base leading-relaxed mb-10"
        >
          Oops! Our little monster couldn't find any repositories to display right now. This might
          be due to a connection issue or an empty portfolio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => window.location.reload()}
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-900 hover:bg-white font-medium rounded-xl transition-all duration-300 hover:scale-105 text-sm whitespace-nowrap w-full sm:w-auto"
          >
            <RefreshCcw className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
            Refresh
          </button>

          <a
            href="https://github.com/mochrks"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:bg-zinc-800 text-sm whitespace-nowrap w-full sm:w-auto"
          >
            <Github className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
            GitHub
          </a>

          <button
            onClick={() => navigate("/")}
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-white/30 text-white hover:text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:border-white/70 hover:bg-white/5 text-sm whitespace-nowrap w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center ">
        <SEO
          title="Moch. Rizki Kurniawan  |  Projects & Open Source Portfolio"
          description="Explore the personal, open-source, and professional enterprise web development projects created by Moch. Rizki Kurniawan (@mochrks). Featuring Fullstack React, Node.js, and ASP.NET Core apps."
          keywords="Moch. Rizki Kurniawan, software projects, github portfolio, React portfolio, ASP.NET Core projects, fullstack apps, mochrks"
          path="/project"
        />
        <LoadingContent />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SEO
          title="Moch. Rizki Kurniawan  |  Projects & Open Source Portfolio"
          description="Explore the personal, open-source, and professional enterprise web development projects created by Moch. Rizki Kurniawan (@mochrks). Featuring Fullstack React, Node.js, and ASP.NET Core apps."
          keywords="Moch. Rizki Kurniawan, software projects, github portfolio, React portfolio, ASP.NET Core projects, fullstack apps, mochrks"
          path="/project"
        />
        <ProjectEmptyState />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <SEO
        title=" Moch. Rizki Kurniawan  | Projects & Open Source Portfolio"
        description="Explore the personal, open-source, and professional enterprise web development projects created by Moch. Rizki Kurniawan (@mochrks). Featuring Fullstack React, Node.js, and ASP.NET Core apps."
        keywords="Moch. Rizki Kurniawan, software projects, github portfolio, React portfolio, ASP.NET Core projects, fullstack apps, mochrks"
        path="/project"
      />
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
        {/* Real Projects Section */}
        <div className="mb-16 md:mb-24">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Production Experience
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl">
              A showcase of professional projects developed for major institutions, focusing on
              large-scale enterprise applications and industrial solutions.
            </p>
          </div>
          <div className="w-full flex items-center justify-center ">
            <div className="max-w-full mx-auto ">
              <CardProject items={REAL_PROJECTS} cols={3} />
            </div>
          </div>
        </div>

        {/* GitHub Projects Section */}
        <div className="mb-16 md:mb-24">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Code Innovation
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl">
              A collection of coding projects, open-source contributions, and technical experiments
              from my GitHub repository.
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-center ">
            <div className="max-w-full mx-auto w-full">
              <CardProject items={githubProjects.slice(0, visibleCount)} cols={3} />
            </div>
            {visibleCount < githubProjects.length && (
              <div className="mt-8 mb-8">
                <InteractiveHoverButton
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="text-sm md:text-lg font-medium"
                >
                  Load More Projects
                </InteractiveHoverButton>
              </div>
            )}
          </div>
        </div>

        {/* <div className="flex justify-center mb-20">
          <InteractiveHoverButton onClick={() => navigate("/")} className="text-lg font-medium">
            Back to Previous Page
          </InteractiveHoverButton>
        </div> */}
        <ScrollToTopButton />
      </div>
    </div>
  );
}
