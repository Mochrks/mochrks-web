import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { OrbitingCircle } from "./OrbitingCircle";
import useBreakpoints from "../../hooks/useBreakpoints";

export function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const { isMd } = useBreakpoints();
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-start justify-center gap-4  p-4">
          <div className="flex justify-center w-full md:w-auto ">
            {isMd && <OrbitingCircle />}
          </div>
          <div className="max-w-md w-full h-full mx-auto rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Contact me
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Feel free to reach out to me for any inquiries or collaboration
              opportunities.
            </p>
            <form className="my-8" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                  <Label htmlFor="firstname">First name</Label>
                  <Input id="firstname" placeholder="John" type="text" />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastname">Last name</Label>
                  <Input id="lastname" placeholder="Tyler" type="text" />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  placeholder="youremail@email.com"
                  type="email"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="subject email" type="text" />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="message">Message</Label>
                <Input
                  id="message"
                  placeholder="Type your message here"
                  className="input-class"
                />
              </LabelInputContainer>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Send &rarr;
                <BottomGradient />
              </button>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
