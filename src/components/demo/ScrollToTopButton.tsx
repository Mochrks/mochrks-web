import React from "react";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLenis } from "./SmoothScroll";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis) {
      // Fallback if Lenis is not active
      const toggleVisibility = () => {
        setIsVisible(window.pageYOffset > 300);
      };
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }

    // Use Lenis scroll event
    const toggleLenisVisibility = ({ scroll }: any) => {
      setIsVisible(scroll > 300);
    };

    lenis.on("scroll", toggleLenisVisibility);
    return () => lenis.off("scroll", toggleLenisVisibility);
  }, [lenis]);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-6 right-5 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="rounded-full shadow-lg"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
