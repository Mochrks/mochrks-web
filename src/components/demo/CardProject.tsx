import React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PiGlobeSimpleBold } from "react-icons/pi";
import { VscGithub } from "react-icons/vsc";

export const CardProject = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    web: string;
    git: string;
    img: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>


      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 py-10 gap-3 ",
          className
        )}
      >
        {items.map((item, idx) => (
          <a
            href={item?.link}
            key={item?.link}
            className="relative group  block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-gradient-to-r from-gray-600  dark:bg-slate-800/[0.8] to-transparent  block  rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <CardTitle>
                <div className="flex justify-between">
                  {item.title}

                  <div className="flex gap-1">
                    <a href={item.web}><PiGlobeSimpleBold className="w-[3rem] h-[3rem] p-1 rounded-full bg-black hover:bg-cyan-800 " /></a>
                    <a href={item.git}><VscGithub className="w-[3rem] h-[3rem] p-1 rounded-full bg-black hover:bg-cyan-800 " /></a>
                  </div>
                </div>
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <CardContent><img src={item.img} alt={item.title} /></CardContent>
            </Card>
          </a>
        ))}
      </div>
    </>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-[30rem] lg:h-[40rem] w-full p-4 overflow-hidden bg-gradient-to-t from-black dark:from-slate-100 to-transparant block border-transparent dark:border-white/[0.2] group-hover:border-slate-500 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-zinc-100 text-xl md:text-2xl lg:text-3xl font-bold tracking-wide mt-4 ",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 text-base md:text-md tracking-wide leading-relaxed ",
        className
      )}
    >
      {children}
    </p>
  );
};
export const CardContent = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        " h-full w-full mt-2 p-2 overflow-hidden  border border-transparent  relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
};
