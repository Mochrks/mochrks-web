import React, { useMemo, memo } from "react";
import { HeroParallax } from "../ui/hero-parallax";
import { products } from "@/apis/uiux";

export const UIUXParallax = memo(function UIUXParallax() {
  const memoizedProducts = useMemo(() => products, []);

  return <HeroParallax products={memoizedProducts} />;
});
