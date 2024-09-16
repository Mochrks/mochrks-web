"use client";
import React, { useState } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Button } from "@/components/ui/button";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Particles from "@/components/magicui/particles";
import { ExpandArticle } from "@/components/demo/ExpandArticle";

export default function index() {
  const [color, setColor] = useState("#ffffff");
  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        <Particles
          className="absolute inset-0"
          quantity={300}
          ease={80}
          color={color}
          refresh
        />
        <ShootingStars />
        <div className="container pt-20 mt-10 mb-20 text-center ">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            My Article
          </h1>
        </div>
        <TracingBeam className="px-6 ">
          <div className="max-w-7xl mx-auto antialiased pt-4 relative  ml-5">
            {dummyContent.map((item, index) => (
              <div key={`content-${index}`} className="mb-10">
                <p className="text-3xl mb-4 font-extrabold text-white">
                  {item.title}
                </p>

                <div className="flex space-x-2 mb-4">
                  {Array.isArray(item.badge) &&
                    item.badge.map((badge, badgeIndex) => (
                      <span
                        key={`badge-${badgeIndex}`}
                        className="bg-orange-700 text-white rounded-full text-sm px-4 py-1"
                      >
                        {badge}
                      </span>
                    ))}
                </div>

                <div className="text-sm prose prose-sm dark:prose-invert">
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
                </div>
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
      </div>
    </>
  );
}

const dummyContent = [
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
    badge: ["Order Store", "Fullstack", "Mongodb & Postgresql"],
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
    badge: ["X-Mart", "Fullstack", "ReactJS+ Java Spring Boot + ExpressJS"],
    image:
      "https://miro.medium.com/v2/resize:fit:750/format:webp/1*KS08wiab3dmsJxaCEOABYA.png",
    link: "https://medium.com/@mochrks/fullstack-web-development-dengan-reactjs-java-spring-boot-node-js-expressjs-graphql-66f4d881e32f",
  },
];
