import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import { LenisContext } from "@/contexts/lenis-context";
import { SmoothScrollProps } from "@/types/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

// Re-export useLenis for convenience (backwards compat)
export { useLenis } from "@/hooks/use-lenis";

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06,
      duration: 1.4,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
      syncTouch: true,
      infinite: false,
    });

    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      <div className="w-full min-h-screen">{children}</div>
    </LenisContext.Provider>
  );
};

export default SmoothScroll;
