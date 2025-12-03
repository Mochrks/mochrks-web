import React from "react";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { images } from "@/apis/photography";

export default function index() {
  return <ParallaxScroll images={images} />;
}
