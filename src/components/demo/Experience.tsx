import React from "react";
import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function Experience() {
  const features = [
    {
      title: "Padepokan Tujuh Sembilan",
      description: "Software Developer ",
      datePeriode: "Jan 2024 - Present",
      icon: "https://media.licdn.com/dms/image/C560BAQHVE9T8weMAQA/company-logo_200_200/0/1630665946003/padepokantujuhsembilan_logo?e=2147483647&v=beta&t=S4DzajPy2eCUvCzgovLF84e4UOdqQ-lS-r8AxE8Zj3k",
    },
    {
      title: "Arutala Lab",
      description: "Bootcamp Participant",
      datePeriode: "Okt 2023 - Des 2023 · 3 bln",
      icon: "https://lh5.googleusercontent.com/proxy/rOnq93TRAzejnbvoxoRDSp2v6efNHwi7Zb6FlD1SQjcDjyglQmJ5IDhH_TLiYeWZjnC90tz-sIwjs35OcJ7KxEjjeS-2eWCwQF_KS2y6uhdVrLCMGsUT17lIHc2LXLP5LJsAYavOL_tdZkIAJYJFOR-ue5MLdrw",
    },
    {
      title: "Universitas Jenderal Achmad Yani",
      description: "Computer Lab Assistant",
      datePeriode: "Apr 2023 - Jul 2023 · 4 bln",
      icon: "https://www.unjani.ac.id/wp-content/uploads/2023/01/cropped-WhatsApp-Image-2022-06-24-at-17.28.png",
    },
    {
      title: "Dinas Kesehatan Pemerintah Kota Cimahi",
      description: "Software Engineer & Video Editor",
      datePeriode: "Jul 2024 - Okt 2024 · 4 bln",
      icon: "https://opendata.cimahikota.go.id/api/static/upload/94_logocimahibiru.png",
    },

    {
      title: "Poeticluzien",
      description: "Freelance Graphic Designer",
      datePeriode: "Sep 2021 - Jan 2022 · 5 bln",
      icon: "https://mms.img.susercontent.com/de13b34bd2435c54488d0c18bb99e1aa",
    },
    {
      title: "Leaf Studio",
      description: "Freelance Photographer, Video Editor, Motion Graphics",
      datePeriode: "Feb 2018 - Jun 2021 · 3 thn 5 bln",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD59N9Hh4H-_uDhX-B5P8Bj69Gttasxwlxlg&s",
    },

    {
      title: "Cimahi Creative Association(CCA)",
      description: "3D Modeler",
      datePeriode: "Jun 2016 - Sep 2016 · 4 bln",
      icon: "https://yt3.googleusercontent.com/ytc/AIdro_kQtlYDCVKlIHT4f5XKN2Vp71FDNPLeyxl1L_xgl8RwRA=s900-c-k-c0x00ffffff-no-rj",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto pt-20">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  datePeriode,
  index,
}: {
  title: string;
  description: string;
  datePeriode: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-12 relative group/feature dark:border-neutral-800 cursor-pointer",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-500",
        index < 4 && "lg:border-b dark:border-neutral-500"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-600 dark:from-slate-100 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-gray-600 dark:from-slate-100 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-slate-100 dark:text-gray-600 ">
        <img src={icon} alt={title} className="w-10 h-10" />
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-20 w-1.5 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-100 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block  text-md md:text-lg text-slate-100 dark:text-neutral-100 ">
          {title}
        </span>
      </div>
      <p className="text-base md:text-lg text-neutral-100 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
      <p className="text-base md:text-lg text-neutral-100 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {datePeriode}
      </p>
    </div>
  );
};
