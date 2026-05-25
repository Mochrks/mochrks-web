import React from "react";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { images } from "@/apis/photography";
import SEO from "@/components/demo/SEO";

export default function index() {
  return (
    <React.Fragment>
      <SEO
        title="Moch. Rizki Kurniawan  | Photography Portfolio"
        description="Explore the creative photography and visual production works of Moch. Rizki Kurniawan. Capturing stunning moments, nature, urban environments, and human stories."
        keywords="Moch. Rizki Kurniawan, photography portfolio, landscape photography, street photography, visual arts, mochrks"
        path="/photography"
      />
      <ParallaxScroll images={images} />
    </React.Fragment>
  );
}
