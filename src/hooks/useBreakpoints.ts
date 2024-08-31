import { useState, useEffect } from "react";

export default function useBreakpoints() {
  // Default export
  const breakpoints = {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    "2xl": "(min-width: 1536px)",
  }; 

  const [isSm, setIsSm] = useState<boolean>(
    window.matchMedia(breakpoints.sm).matches
  );
  const [isMd, setIsMd] = useState<boolean>(
    window.matchMedia(breakpoints.md).matches
  );
  const [isLg, setIsLg] = useState<boolean>(
    window.matchMedia(breakpoints.lg).matches
  );
  const [isXl, setIsXl] = useState<boolean>(
    window.matchMedia(breakpoints.xl).matches
  );
  const [is2xl, setIs2xl] = useState<boolean>(
    window.matchMedia(breakpoints["2xl"]).matches
  );

  useEffect(() => {
    const mediaQuerySm = window.matchMedia(breakpoints.sm);
    const mediaQueryMd = window.matchMedia(breakpoints.md);
    const mediaQueryLg = window.matchMedia(breakpoints.lg);
    const mediaQueryXl = window.matchMedia(breakpoints.xl);
    const mediaQuery2xl = window.matchMedia(breakpoints["2xl"]);

    const handleSmChange = (event: MediaQueryListEvent) =>
      setIsSm(event.matches);
    const handleMdChange = (event: MediaQueryListEvent) =>
      setIsMd(event.matches);
    const handleLgChange = (event: MediaQueryListEvent) =>
      setIsLg(event.matches);
    const handleXlChange = (event: MediaQueryListEvent) =>
      setIsXl(event.matches);
    const handle2xlChange = (event: MediaQueryListEvent) =>
      setIs2xl(event.matches);

    mediaQuerySm.addEventListener("change", handleSmChange);
    mediaQueryMd.addEventListener("change", handleMdChange);
    mediaQueryLg.addEventListener("change", handleLgChange);
    mediaQueryXl.addEventListener("change", handleXlChange);
    mediaQuery2xl.addEventListener("change", handle2xlChange);

    return () => {
      mediaQuerySm.removeEventListener("change", handleSmChange);
      mediaQueryMd.removeEventListener("change", handleMdChange);
      mediaQueryLg.removeEventListener("change", handleLgChange);
      mediaQueryXl.removeEventListener("change", handleXlChange);
      mediaQuery2xl.removeEventListener("change", handle2xlChange);
    };
  }, [breakpoints]);

  return { isSm, isMd, isLg, isXl, is2xl };
}
