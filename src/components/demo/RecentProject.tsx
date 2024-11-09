import React from "react";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { useNavigate } from "react-router-dom";
import { CardProject } from "@/components/demo/CardProject";
import { recentProjects } from "@/apis/project";

export function RecentProject() {
  const navigate = useNavigate();

  const handleProject = () => {
    navigate("/project");
  };

  return (
    <>
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




