import React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PiGlobeSimpleBold } from "react-icons/pi";
import { VscGithub } from "react-icons/vsc";
import { Badge } from "../ui/badge";
import { formatDate } from "@/utils/date";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { profile } from "@/assets";

export const CardProject = ({
  items,
  className,
  cols = 3,
}: {
  items: {
    id: number;
    name: string;
    full_name: string;
    description: string;
    html_url?: string;
    homepage: string;
    img: string;
    topics: string[];
    created_at: string;
  }[];
  className?: string;
  cols?: number;
}) => {
  const EmptyStateIllustration = () => (
    <svg
      className="w-64 h-64 md:w-80 md:h-80 mx-auto mb-6"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="90" fill="url(#gradient1)" fillOpacity="0.1" />

      <rect
        x="50"
        y="60"
        width="100"
        height="70"
        rx="15"
        fill="url(#gradient1)"
        fillOpacity="0.3"
        stroke="url(#gradient1)"
        strokeWidth="2"
      />

      <text
        x="80"
        y="95"
        fontFamily="monospace"
        fontSize="24"
        fill="#60A5FA"
        fontWeight="bold"
      >{`{`}</text>
      <text
        x="110"
        y="95"
        fontFamily="monospace"
        fontSize="24"
        fill="#60A5FA"
        fontWeight="bold"
      >{`}`}</text>

      <circle cx="40" cy="80" r="8" fill="url(#gradient2)" opacity="0.7">
        <animate attributeName="cy" values="80;70;80" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="120" r="6" fill="url(#gradient2)" opacity="0.7">
        <animate attributeName="cy" values="120;110;120" dur="2.5s" repeatCount="indefinite" />
      </circle>

      <circle
        cx="100"
        cy="150"
        r="25"
        fill="none"
        stroke="#6B7280"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line x1="120" y1="170" x2="140" y2="190" stroke="#6B7280" strokeWidth="2" />

      <g opacity="0.5">
        <line x1="30" y1="140" x2="40" y2="140" stroke="#8B5CF6" strokeWidth="2" />
        <line x1="35" y1="135" x2="35" y2="145" stroke="#8B5CF6" strokeWidth="2" />
        <line x1="170" y1="60" x2="180" y2="60" stroke="#3B82F6" strokeWidth="2" />
        <line x1="175" y1="55" x2="175" y2="65" stroke="#3B82F6" strokeWidth="2" />
      </g>
    </svg>
  );

  return (
    <React.Fragment>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <EmptyStateIllustration />
          <div className="max-w-md">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-300 mb-3">No Projects Found</h3>
            <p className="text-gray-400 mb-6">
              It looks like there are no projects available at the moment. Check back later or
              explore other repositories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://github.com/mochrks"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-600 hover:border-gray-400 text-gray-300 font-medium rounded-lg transition-all duration-300 hover:bg-gray-800/30"
              >
                Visit GitHub Profile
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            `grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-${cols} py-10 gap-3 px-2`,
            className
          )}
        >
          {items.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

const ProjectCard = ({ item }: { item: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={item?.html_url}
      className="relative group block p-2 h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-white/10 dark:bg-white/[0.05] block rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, ease: "easeIn" },
            }}
          />
        )}
      </AnimatePresence>
      <Card>
        <CardTitle>
          <div className="flex justify-between border-b border-white/10 my-4 py-2">
            {item.name}
            <div className="flex gap-1">
              <a href={item.homepage}>
                <PiGlobeSimpleBold className="w-[3rem] h-[3rem] p-1 rounded-full bg-black hover:bg-cyan-800 transition-colors" />
              </a>
              <a href={item.html_url}>
                <VscGithub className="w-[3rem] h-[3rem] p-1 rounded-full bg-black hover:bg-cyan-800 transition-colors" />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-1 ">
            <Avatar className="w-7 h-7">
              <AvatarImage src={profile} alt="@mochrks" />
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
            <p className="text-sm text-gray-300 font-thin">{item.full_name}</p>
          </div>
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
        <CardContent>
          <div className="flex flex-wrap gap-2 items-center">
            {item.topics.map((topic: any, topicIndex: number) => (
              <Badge key={topicIndex}>{topic}</Badge>
            ))}
          </div>
        </CardContent>
        <p className="text-sm text-gray-300 font-thin mt-2">
          {" "}
          Created : {formatDate(item.created_at)}
        </p>
      </Card>
    </a>
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
        "rounded-3xl h-full w-full p-5 overflow-hidden bg-gradient-to-br from-white/15 to-white/0 backdrop-blur-3xl border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_32px_0_rgba(0,0,0,0.36)] group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_15px_40px_0_rgba(0,0,0,0.5)] group-hover:border-white/20 hover:-translate-y-1 transition-transform duration-300 ease-out relative z-20",
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
      <div className="relative z-50">{children}</div>
    </div>
  );
};
