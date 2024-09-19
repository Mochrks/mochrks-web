import React from "react";
import { PiGlobeSimpleBold } from "react-icons/pi";

export default function About() {
  return (
    <>
      <div className="container">
        <header className="flex row ">
          <h1 className="flex-grow scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl ">
            About me
          </h1>
          <PiGlobeSimpleBold className="w-[3rem] h-[3rem] " />
        </header>

        <article className="mt-20 mb-20">
          <p className="max-w-full antialiased text-base leading-loose text-white md:text-xl lg:text-2xl ">
            I'm Moch. Rizki Kurniawan as a software developer with a special
            interest in full-stack development and UI/UX design. I blend
            creativity with technical skills in all my projects. With a strong
            background in UI/UX design and full-stack development, I can create
            engaging user experiences while building powerful and functional
            applications. My broad experience in software development and
            interface design enables me to tackle various challenges
            confidently. I focus not only on the technical aspects of software
            development but also on creating beautiful and user-friendly
            interfaces. Additionally, I have skills in photography, video
            production, and graphic design, which add extra creativity to my
            work. I can produce visually appealing content that not only meets
            functional needs but also captivates users. Therefore, I'm ready to
            provide innovative and impactful solutions for my clients, whether
            it's developing robust web applications, designing intuitive user
            interfaces, or enhancing existing user experiences. If you're
            looking for a creative partner who can integrate technical skills
            with design sensitivity and has expertise in photography, video
            production, and graphic design, let's connect and explore the
            possibilities!
          </p>
          {/* <p className="max-w-full text-base md:text-xl mt-8 dark:text-neutral-200 leading-tight [&:not(:first-child)]:mt-6">
            I'm Moch. Rizki Kurniawan as a software developer with a special
            interest in full-stack development and UI/UX design. I blend
            creativity with technical skills in all my projects. With a strong
            background in UI/UX design and full-stack development, I can create
            engaging user experiences while building powerful and functional
            applications. My broad experience in software development and
            interface design enables me to tackle various challenges
            confidently. I focus not only on the technical aspects of software
            development but also on creating beautiful and user-friendly
            interfaces. Additionally, I have skills in photography, video
            production, and graphic design, which add extra creativity to my
            work. I can produce visually appealing content that not only meets
            functional needs but also captivates users. Therefore, I'm ready to
            provide innovative and impactful solutions for my clients, whether
            it's developing robust web applications, designing intuitive user
            interfaces, or enhancing existing user experiences. If you're
            looking for a creative partner who can integrate technical skills
            with design sensitivity and has expertise in photography, video
            production, and graphic design, let's connect and explore the
            possibilities!
          </p> */}
        </article>
      </div>
    </>
  );
}
