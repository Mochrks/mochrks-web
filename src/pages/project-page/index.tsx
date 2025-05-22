import React, { useEffect, useState } from "react";
import { CardProject } from "@/components/demo/CardProject";
import ScrollToTopButton from "@/components/demo/ScrollToTopButton";
import { FlipLinkTitle } from "@/components/demo/Title";
import { GihubData } from "@/services/projectService";
import { LoadingContent } from "@/components/demo/LoadingContent";

export default function index() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await GihubData(1000);

        console.log('Raw Response:', response);

        const fetchedProjects = response ?? [];

        const mappedProjects = fetchedProjects.map(project => ({
          id: project.id,
          name: project.name,
          full_name: project.full_name ?? '',
          description: project.description ?? 'No description',
          html_url: project.html_url ?? '',
          homepage: project.homepage ?? '',
          topics: project.topics ?? [],
          created_at: project.created_at ?? new Date().toISOString(),
          updated_at: project.updated_at ?? new Date().toISOString(),
        }));

        console.log('Mapped Projects:', mappedProjects);

        // Sort projects by updated_at in descending order
        const sortedProjects = mappedProjects.sort((a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

        console.log('Sorted Projects:', sortedProjects);

        setProjects(sortedProjects);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects');
        setIsLoading(false);
        setProjects([]);
      }
    };

    fetchProjects();
  }, []);

  console.log('Projects State:', projects);

  if (isLoading) {
    return <div className="flex w-full h-screen justify-center items-center "><LoadingContent /></div>
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="w-full">
        {/* title */}
        <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
          <FlipLinkTitle>ALL </FlipLinkTitle>
          <FlipLinkTitle>PROJECT.</FlipLinkTitle>
        </section>
      </div>
      <div className="max-w-[90rem] 2xl:max-w-full mx-auto px-10 py-10 2xl:py-20">
        <CardProject items={projects} cols={3} />
        <ScrollToTopButton />
      </div>
    </React.Fragment>
  );
}




