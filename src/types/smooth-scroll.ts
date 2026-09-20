import React from "react";
import Lenis from "lenis";

export interface LenisContextType {
  lenis: Lenis | null;
}

export interface SmoothScrollProps {
  children: React.ReactNode;
}
