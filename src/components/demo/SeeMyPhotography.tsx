import React from "react";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { useNavigate } from "react-router-dom";
export function SeeMyPhotography() {
  const navigate = useNavigate();

  const handlePhotography = () => {
    navigate("/photography");
  };
  return (
    <div className="flex flex-col items-end justify-end  pb-20">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <ShimmerButton className="shadow-2xl" onClick={handlePhotography}>
          <span className="whitespace-pre-wrap text-end text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            Check out more &rarr;
          </span>
        </ShimmerButton>
      </div>
    </div>
  );
}
