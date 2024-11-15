import React from "react";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { useNavigate } from "react-router-dom";
import { CardProject } from "@/components/demo/CardProject";
import { recentProjects } from "@/apis/project";
import GitHubCalendar from 'react-github-calendar';
export function RecentProject() {
  const navigate = useNavigate();

  const handleProject = () => {
    navigate("/project");
  };

  return (
    <>
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
    </>
  );
}




