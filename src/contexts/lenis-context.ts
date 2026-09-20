import { createContext } from "react";
import { LenisContextType } from "@/types/smooth-scroll";

export const LenisContext = createContext<LenisContextType>({
  lenis: null,
});
