import React, { useEffect, useState } from "react";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { useNavigate } from "react-router-dom";
import { CardProject } from "@/components/demo/CardProject";
import GitHubCalendar from 'react-github-calendar';
import { GihubData } from "@/services/projectService";
import { LoadingContent } from "./LoadingContent";
export function RecentProject() {
  const navigate = useNavigate();
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleProject = () => {
    navigate("/project");
  };

  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        setIsLoading(true);
        const response = await GihubData(1000);

        console.log("Raw Response:", response);


        const fetchedProjects = response || [];

        const mappedProjects = fetchedProjects.map(project => ({
          id: project.id,
          name: project.name,
          full_name: project.full_name || '',
          description: project.description || 'No description',
          html_url: project.html_url || '',
          homepage: project.homepage || '',
          topics: project.topics || [],
          created_at: project.created_at || new Date().toISOString(),
          updated_at: project.updated_at || new Date().toISOString(),
        }));

        console.log('Mapped Projects:', mappedProjects);

        // Sort projects by updated_at in descending order
        const sortedProjects = mappedProjects.sort((a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

        // slice to 4 projects
        const latestProjects = sortedProjects.slice(0, 4);

        console.log("Sorted and Filtered Projects:", latestProjects);
        setRecentProjects(latestProjects);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setIsLoading(false);
      }
    };

    fetchRecentProjects();
  }, []);

  if (isLoading) {
    return <LoadingContent />;
  }



  return (
    <React.Fragment>
      <div className="hidden md:flex flex-col w-full items-center justify-center mt-20 ">
        <h4 className="scroll-m-20 text-xl  tracking-tight py-5">
          @mochrks on GitHub
        </h4>
        <GitHubCalendar username="mochrks" fontSize={16} colorScheme="dark" blockRadius={13} maxLevel={9} />
      </div>
      <div className="relative flex w-full h-full flex-col items-center overflow-hidden justify-center gap-10 pt-20 ">
        <div className="container flex items-center justify-center ">
          <div className="max-w-full mx-auto ">
            <CardProject items={recentProjects} cols={2} />
          </div>

        </div>

        <div className="pt-10 text-center">
          <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            See Other Project
          </h2>
        </div>
        <div>
          <ShimmerButton className="shadow-2xl" onClick={handleProject}>
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Load More
            </span>
          </ShimmerButton>
        </div>
      </div>
    </React.Fragment>
  );
}




