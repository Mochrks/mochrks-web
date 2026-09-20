import { useContext } from "react";
import { LenisContext } from "@/contexts/lenis-context";

// Global hook to access the Lenis smooth scroll instance
export const useLenis = () => useContext(LenisContext);
