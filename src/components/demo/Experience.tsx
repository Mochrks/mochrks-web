import React from "react";
import { cn } from "@/lib/utils";
import { experiece } from "@/apis/experience";

export function Experience() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-20 px-2 max-w-7xl mx-auto  ">
      {experiece.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  datePeriode,
  index,
}: {
  title: string;
  description: string;
  datePeriode: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-12 relative group/feature dark:border-neutral-800 cursor-pointer ",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-500",
        index < 4 && "lg:border-b dark:border-neutral-500"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-600 dark:from-slate-100 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-gray-600 dark:from-slate-100 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-slate-100 dark:text-gray-600 ">
        <img src={icon} alt={title} className="w-10 h-10" />
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-9 group-hover/feature:h-16 w-1.5 rounded-tr-full rounded-full bg-neutral-300 dark:bg-neutral-100 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block  text-md md:text-lg text-slate-100 dark:text-neutral-100 ">
          {title}
        </span>
      </div>
      <p className="text-base md:text-lg text-neutral-100 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
      <p className="text-base md:text-lg text-neutral-100 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {datePeriode}
      </p>
    </div>
  );
};
