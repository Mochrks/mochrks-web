import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { OrbitingCircle } from "./OrbitingCircle";
import useBreakpoints from "../../hooks/useBreakpoints";
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from "../ui/textarea";
import emailjs from '@emailjs/browser';
import { FloatingAlert } from "./FloatingAlert";
import { formSchema } from "@/schema";
import { z } from "zod";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_EMAILJS_SERVICE_ID: string;
      VITE_EMAILJS_TEMPLATE_ID: string;
      VITE_EMAILJS_USER_ID: string;
    }
  }
}


type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          firstname: data.firstname,
          lastname: data.lastname,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          current_year: new Date().getFullYear(),
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );


      setIsLoading(true)

      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
      setShowAlert(true);
      reset();
    } catch (error) {
      console.error('Failed to send email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const { isMd } = useBreakpoints();
  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-start justify-center gap-4  p-4">
          <div className="flex justify-center w-full md:w-auto ">
            {isMd && <OrbitingCircle />}
          </div>
          <div className="max-w-md w-full h-full mx-auto rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 py-4">
              Contact me
            </h2>
            <p className="text-neutral-600 text-base md:text-md max-w-sm mt-2 dark:text-neutral-300">
              Feel free to reach out to me for any inquiries or collaboration
              opportunities.
            </p>
            <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                  <Label htmlFor="firstname">First name</Label>
                  <Input id="firstname" placeholder="John" type="text" {...register("firstname")} />
                  {errors.firstname && <p className="text-red-600">{errors.firstname.message}</p>}
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastname">Last name</Label>
                  <Input id="lastname" placeholder="Tyler" type="text" {...register("lastname")} />
                  {errors.lastname && <p className="text-red-600">{errors.lastname.message}</p>}
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" placeholder="youremail@email.com" type="email" {...register("email")} />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="subject email" type="text" {...register("subject")} />
                {errors.subject && <p className="text-red-600">{errors.subject.message}</p>}
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here"
                  className="input-class  "
                  {...register("message")}
                />
                {errors.message && <p className="text-red-600">{errors.message.message}</p>}
              </LabelInputContainer>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
                disabled={isLoading}
              >
                <div className="flex items-center justify-center">

                  {isLoading && (
                    <motion.div
                      className="w-3 h-3 border-2 mr-2 border-white rounded-full border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  Send
                  &rarr;
                </div>
                <BottomGradient />
              </button>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            </form>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAlert && <FloatingAlert />}
      </AnimatePresence>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <React.Fragment>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </React.Fragment>
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


