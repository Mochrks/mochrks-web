import React from "react";
import { HeroParallax } from "../ui/hero-parallax";
import { products } from "@/apis/uiux";

export function UIUXParallax() {
  return <HeroParallax products={products} />;
}
