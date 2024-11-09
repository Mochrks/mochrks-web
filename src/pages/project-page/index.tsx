import React from "react";
import { CardProject } from "@/components/demo/CardProject";
import ScrollToTopButton from "@/components/demo/ScrollToTopButton";
import { FlipLinkTitle } from "@/components/demo/Title";
import { projects } from "@/apis/project";

export default function index() {
  return (
    <>
      <div className="w-full">
        {/* title */}
        <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
          <FlipLinkTitle>ALL </FlipLinkTitle>
          <FlipLinkTitle>PROJECT.</FlipLinkTitle>
        </section>
      </div>
      <div className="max-w-[90rem] 2xl:max-w-full mx-auto px-10 py-10 2xl:py-20">
        <CardProject items={projects} cols={3} />
      </div>
      <ScrollToTopButton />
    </>
  );
}




