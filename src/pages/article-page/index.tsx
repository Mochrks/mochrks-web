import React from "react";
import { FlipLinkTitle } from "@/components/demo/Title";
import ScrollToTopButton from "@/components/demo/ScrollToTopButton";
import RSSFeed from "@/components/demo/RSSFeed";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useNavigate } from "react-router-dom";

export default function index() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <header className="w-full">
        {/* title */}
        <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
          <FlipLinkTitle>MY </FlipLinkTitle>
          <FlipLinkTitle>ARTICLE.</FlipLinkTitle>
        </section>
      </header>
      <article className="relative w-full h-full  overflow-hidden">
        <RSSFeed />
        <ScrollToTopButton />
      </article>
      <div className="flex justify-center mb-20 mt-10">
        <InteractiveHoverButton
          onClick={() => navigate(-1)}
          className="text-lg font-medium"
        >
          Back to Previous Page
        </InteractiveHoverButton>
      </div>
    </React.Fragment>
  );
}
