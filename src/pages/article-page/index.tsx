import React from "react";
import { FlipLinkTitle } from "@/components/demo/Title";
import ScrollToTopButton from "@/components/demo/ScrollToTopButton";
import RSSFeed from "@/components/demo/RSSFeed";

export default function index() {
  return (
    <React.Fragment>
      <header className="w-full">
        <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
          <FlipLinkTitle>MY </FlipLinkTitle>
          <FlipLinkTitle>ARTICLE.</FlipLinkTitle>
        </section>
      </header>
      <article className="relative w-full h-full  overflow-hidden">
        <RSSFeed />
        <ScrollToTopButton />
      </article>
    </React.Fragment>
  );
}
