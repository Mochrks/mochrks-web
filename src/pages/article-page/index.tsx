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
        <div className="flex flex-col place-content-center gap-2 bg-white px-8 py-14 lg:py-24 ">
          <div className="text-black">
            <FlipLinkTitle>MY </FlipLinkTitle>
            <FlipLinkTitle>ARTICLE.</FlipLinkTitle>
          </div>
          <div>
            <InteractiveHoverButton
              onClick={() => navigate("/")}
              className="text-sm md:text-lg xs font-medium mt:2"
            >
              Back
            </InteractiveHoverButton>
          </div>
        </div>
      </header>
      <article className="relative w-full h-full  overflow-hidden">
        <RSSFeed />
        <ScrollToTopButton />
      </article>
    </React.Fragment>
  );
}
