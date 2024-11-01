
import React, { useState } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Button } from "@/components/ui/button";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Particles from "@/components/magicui/particles";
import { ExpandArticle } from "@/components/demo/ExpandArticle";
import ScrollToTopButton from "@/components/demo/ScrollToTopButton";
import { motion } from "framer-motion";

export default function index() {
  const [color, setColor] = useState("#ffffff");
  return (
    <>
      <header className="w-full">
        <Title />
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

export const Title = () => {
  return (
    <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
      <FlipLink>MY </FlipLink>
      <FlipLink>ARTICLE.</FlipLink>
    </section>
  );
};
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"

      className="relative block overflow-hidden whitespace-nowrap text-5xl font-black uppercase sm:text-7xl md:text-7xl lg:text-8xl 2xl:text-9xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};


const treeContent = [
  {
    title: "UI/UX Case Study : My Pets",
    description: (
      <>
        <p>
          Halo semuanya 👋 Salam kenal, saya Moch Rizki Kurniawan, seorang
          mahasiswa yang sangat antusias dengan dunia desain dan industri
          kreatif. Artikel ini akan membahas alur proses desain UI/UX untuk
          aplikasi yang kami buat, yaitu “My Pets”, sebuah aplikasi berbasis
          mobile. Proyek ini tidak saya lakukan sendirian, saya berkolaborasi
          dengan rekan saya, Sony Santana.
        </p>
      </>
    ),
    badge: ["Figma", "UI/UX Designer", "Design Thinking"],
    image:
      "https://miro.medium.com/v2/resize:fit:750/format:webp/1*mQB0eOilTc8T6AfCL55gKA.png",
    link: "https://medium.com/@mochrks/ui-ux-case-study-my-pets-cc76a63f37ac",
  },
  {
    title:
      "Implementasi Order Store dengan OLTP(Mongodb) , OLAP (Postgresql) & Kafka Menggunakan Java springboot & ReactJS ( UseCase: Order Grab )",
    description: (
      <>
        <p>
          Halo semuanya 👋 Perkenalkan saya, Moch Rizki Kurniawan seorang
          software developer di Pt. Padepokan Tujuh Sembilan. Pada kesempatan
          ini, dengan senang hati saya akan membagikan sebuah proyek yang telah
          saya kembangkan. Proyek kali ini adalah pengembangan sistem order
          store yang menggunakan teknologi OLTP, OLAP, dan Kafka, dengan studi
          kasus order grab. Untuk lebih jelasnya anda dapat melihat tautan ini :
          How we store and process millions of orders daily
        </p>
      </>
    ),
    badge: ["Order", "Fullstack", "Mongodb ", " Postgresql",],
    image:
      "https://miro.medium.com/v2/resize:fit:750/format:webp/1*vUjRD1wNcbZyo0chMjYrQQ.jpeg",
    link: "https://medium.com/@mochrks/develop-order-store-dengan-oltp-olap-kafka-use-case-order-grab-198e852441a2",
  },
  {
    title:
      "Fullstack Web Development Mini Project X-Mart Menggunakan ReactJS, Java Spring Boot, & Node.js (ExpressJS + GraphQL)",
    description: (
      <>
        <p>
          Halo semuanya 👋 Saya Moch. Rizki Kurniawan, seorang software
          developer. Dalam kesempatan ini, saya ingin berbagi pengalaman tentang
          pembuatan mini proyek web development X-mart menggunakan teknologi
          ReactJS, Java Spring Boot, dan Node.js (ExpressJS + GraphQL). Proyek
          ini juga memanfaatkan Redis untuk caching serta mengintegrasikan dua
          jenis database, yaitu NoSQL MongoDB dan SQL PostgreSQL.
        </p>
      </>
    ),
    badge: ["X-Mart", "Fullstack", "ReactJS", "express"],
    image:
      "https://miro.medium.com/v2/resize:fit:750/format:webp/1*KS08wiab3dmsJxaCEOABYA.png",
    link: "https://medium.com/@mochrks/fullstack-web-development-dengan-reactjs-java-spring-boot-node-js-expressjs-graphql-66f4d881e32f",
  },
];
