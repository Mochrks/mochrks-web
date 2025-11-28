import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

export function ExpandArticle() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <React.Fragment>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900 bg-opacity-95 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="max-w-full ">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-2xl text-neutral-700 dark:text-neutral-200 "
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-base text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>


                </div>
                <div className="pt-4 pb-10 relative px-4 ">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-md md:text-sm lg:text-sm h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-sm font-bold text-center  bg-gray-800 text-white"
                  >
                    {active.ctaText}
                  </motion.a>


                </div>

              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="px-3">
        <hr className="my-2 " style={{ border: "1px solid " }}></hr>
      </div>

      <div className="mt-10">
        <p className="text-lg md:text-xl  text-white font-bold mb-5 p-2 pl-4">
          More From Moch. Rizki Kurniawan
        </p>
      </div>
      <ul className="max-w-4xl mx-auto w-full gap-4 ">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 my-5 h-[26rem] md:h-[10rem] flex flex-col md:flex-row justify-between items-center bg-gradient-to-b from-gray-600 dark:from-slate-100 to-transparent hover:bg-neutral-800  dark:hover:bg-neutral-800 rounded-xl cursor-pointer "
          >
            <div className="flex gap-[2rem] flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-[12rem] w-full md:w-40 md:h-[8rem] mx-auto rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="max-w-lg text-md font-bold text-white dark:text-neutral-200 text-left md:text-left "
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className=" dark:text-neutral-400 text-left md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </React.Fragment>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "ASP.NET Core 8",
    title: "Implementasi Operasi CRUD Web API menggunakan ASP.NET Core 8",
    src: "https://miro.medium.com/v2/resize:fit:750/format:webp/1*K8kkq6EBdmuLhpl6OFZwSg.png",
    ctaText: "Read More",
    ctaLink:
      "https://medium.com/@mochrks/implementasi-operasi-crud-web-api-menggunakan-asp-net-core-8-05f5b4b522c0",
    content: () => {
      return (
        <p>
          Saya Moch. Rizki Kurniawan, seorang software developer. Dalam artikel
          ini, saya akan membahas proyek pengembangan CRUD API (Create, Read,
          Update, Delete) menggunakan ASP.NET Core Web API. Artikel ini
          bertujuan untuk memberikan pemahaman mengenai konsep dasar dan
          penerapan CRUD API. Dalam implementasinya, disini menggunakan metode
          scaffolding yang disediakan oleh ASP.NET Core. <br />
          Penjelasan ASP.NET Core ASP.NET Core adalah framework open-source yang
          kuat untuk membangun aplikasi web modern di berbagai platform.
          Dikembangkan oleh Microsoft, framework ini dirancang untuk performa
          tinggi, mudah di-maintain, dan dapat di-deploy di berbagai lingkungan
          seperti Windows, macOS, dan Linux. Penggunaan Scaffold dalam ASP.NET
          Core Salah satu fitur yang menonjol dari ASP.NET Core adalah kemampuan
          untuk menggunakan scaffolding. Scaffolding adalah teknik otomatisasi
          yang membantu pengembang menghasilkan kode boilerplate untuk operasi
          CRUD. Dengan scaffolding, Anda dapat menghemat waktu dan memastikan
          konsistensi dalam kode yang dihasilkan.
        </p>
      );
    },
  },
  {
    description: "React, Vite, TailwindCSS, Framer motion",
    title:
      "Implementasi Landing Page Produk Robotics dengan React, Vite, TailwindCSS, dan Framer Motion Animations",
    src: "https://miro.medium.com/v2/resize:fit:750/format:webp/1*BPzRb0XyNRbAqpUPOt49zg.png",
    ctaText: "Read More",
    ctaLink:
      "https://medium.com/@mochrks/implementasi-landing-page-produk-robotics-dengan-react-vite-tailwindcss-dan-framer-motion-9bc1cce9ec65",
    content: () => {
      return (
        <p>
          Saya Moch. Rizki Kurniawan, seorang software developer. Dalam artikel
          ini, saya akan membahas bagaimana mengimplementasikan landing page
          untuk produk robotics menggunakan React, Vite, TailwindCSS, dan Framer
          Motion Animations. React adalah pustaka JavaScript yang populer untuk
          membangun antarmuka pengguna(UI) interaktif dan dinamis. Vite adalah
          build tool yang sangat cepat dan efisien yang membantu dalam
          pengembangan proyek React. TailwindCSS adalah framework CSS yang
          memudahkan pembuatan desain yang responsif dan estetis melalui
          kelas-kelas utility yang siap pakai. Sementara itu, Framer Motion
          adalah pustaka untuk membuat animasi yang interaktif dan kompleks
          dengan mudah di dalam aplikasi React. Artikel ini bertujuan untuk
          memberikan pemahaman tentang bagaimana implmentasi untuk menciptakan
          landing page yang menarik dan fungsional untuk produk robotics.
        </p>
      );
    },
  },

  {
    description: "React,  (Express & GraphQL), Framer Motion",
    title:
      "Implementasi Website Generator Tiket Event dengan QR Code menggunakan React, Vite, Node.js (Express & GraphQL), Framer Motion, TailwindCSS, dan MongoDB",
    src: "https://miro.medium.com/v2/resize:fit:750/format:webp/1*jb1mVHPDBvOMMa1kFLVbiw.png",
    ctaText: "Read More",
    ctaLink:
      "https://medium.com/@mochrks/implementasi-website-generator-tiket-event-dengan-qr-code-menggunakan-react-vite-node-js-15cf2221f559",
    content: () => {
      return (
        <p>
          Saya Moch. Rizki Kurniawan, seorang software developer. Pada
          kesempatan kali ini, saya akan membahas tentang proyek pengembangan
          website generator tiket event dengan QR Code menggunakan teknologi
          React, Vite, Node.js (Express & GraphQL), Framer Motion, TailwindCSS,
          dan MongoDB. Artikel ini bertujuan untuk memberikan pemahaman tentang
          bagaimana cara mengimplementasikan sebuah aplikasi yang dapat
          menghasilkan tiket event dengan QR Code secara efisien dan menarik.
          Selain itu, aplikasi ini juga dilengkapi dengan fitur QR reader untuk
          membaca hasil QR Code yang telah dibuat, sehingga memudahkan proses
          verifikasi tiket. Penjelasan React dan Vite digunakan dalam pembuatan
          antarmuka pengguna (UI) pada website generator tiket event.
        </p>
      );
    },
  },
];
