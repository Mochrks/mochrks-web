
import React, { useState } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Button } from "@/components/ui/button";
import { ShootingStars } from "@/components/ui/shooting-stars";
import Particles from "@/components/magicui/particles";
import { ExpandArticle } from "@/components/demo/ExpandArticle";
import ScrollToTopButton from "@/components/demo/ScrollToTopButton";
import { FlipLinkTitle } from "@/components/demo/Title";
import { treeContent } from "@/apis/article";


export default function index() {
    const [color, setColor] = useState("#ffffff");
    return (
        <>
            <header className="w-full">
                {/* title */}
                <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
                    <FlipLinkTitle>MY </FlipLinkTitle>
                    <FlipLinkTitle>ARTICLE.</FlipLinkTitle>
                </section>
            </header>
            <article className="relative w-full h-full mt-20 overflow-hidden">
                <Particles
                    className="absolute inset-0"
                    quantity={300}
                    ease={80}
                    color={color}
                    refresh
                />
                <ShootingStars />
                <TracingBeam className="px-6 ">
                    <div className="max-w-7xl mx-auto antialiased pt-4 relative  ml-5">
                        {treeContent.map((item, index) => (
                            <div key={`content-${index}`} className="mb-10">
                                <p className=" text-xl lg:text-3xl mb-4 font-extrabold text-white">
                                    {item.title}
                                </p>

                                <div className="flex space-x-2 mb-4 ">
                                    {Array.isArray(item.badge) &&
                                        item.badge.map((badge, badgeIndex) => (
                                            <div
                                                key={`badge-${badgeIndex}`}
                                                className="bg-orange-700 text-white rounded-full text-sm px-4 py-1 flex-wrap text-wrap"
                                            >
                                                {badge}
                                            </div>
                                        ))}
                                </div>

                                <article className="text-sm prose prose-sm dark:prose-invert">
                                    {item?.image && (
                                        <a href={item.link}>
                                            <img
                                                src={item.image}
                                                alt="blog thumbnail"
                                                height="1000"
                                                width="1000"
                                                className="rounded-lg mb-10 object-cover cursor-pointer"
                                            />
                                        </a>
                                    )}
                                    <p className="text-base md:text-xl mb-4 ">
                                        {item.description}
                                    </p>
                                </article>
                                <div className="text-center pt-5">
                                    <a href={item.link}>
                                        <Button>Read More &rarr; </Button>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="py-10">
                        <ExpandArticle />
                    </div>
                </TracingBeam>
                <ScrollToTopButton />
            </article>

        </>
    );
}
