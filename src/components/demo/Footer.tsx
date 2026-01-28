import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaBehance,
  FaDribbble,
  FaYoutube,
  FaMedium,
  FaPinterest,
} from "react-icons/fa";
import { SiHackerrank } from "react-icons/si";
import { FiArrowUp } from "react-icons/fi";
import "@/styles/Footer.css";
import useBreakpoints from "@/hooks/use-breakpoints";
import { favicon } from "@/assets";

export default function Footer() {
  const { isLg } = useBreakpoints();

  return (
    <footer>
      <div className="flex items-center justify-center py-10 my-10">
        <div className="text-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight dark:text-neutral-200 text-slate-700">
            Connect With Me
          </h3>
          <p className="max-w-full text-base md:text-xl mt-8 dark:text-neutral-200 text-slate-700">
            <span>
              Find me online on most digital platforms
              <span className="font-bold"> @mochrks</span>, or by clicking the links below. For all
              business and projects inquiries, email me at
              <span className="font-bold"> mochrizkiks@gmail.com</span>.
            </span>
          </p>
          <ul className="flex flex-wrap justify-center space-x-4 gap-10 pt-10 mt-10 ">
            <li>
              <a href="https://medium.com/@mochrks" target="_blank" rel="noopener noreferrer">
                <FaMedium className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a href="https://github.com/Mochrks" target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a
                href="https://www.hackerrank.com/profile/mochrks"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiHackerrank className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/mochrks/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/mochrks/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a href="https://www.behance.net/mochrks" target="_blank" rel="noopener noreferrer">
                <FaBehance className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a href="https://dribbble.com/mochrks" target="_blank" rel="noopener noreferrer">
                <FaDribbble className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@gdvisuel" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a href="https://id.pinterest.com/mochrks" target="_blank" rel="noopener noreferrer">
                <FaPinterest className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      {isLg ? null : (
        <div className="text-center ">
          <h4 className="text-md  tracking-tight text-slate-700">&copy; Design by Mochrks</h4>
        </div>
      )}

      <footer className="flex ">
        <div className="container flex items-center justify-center z-0">
          {isLg && (
            <div className="flex flex-row items-center">
              <div className="flex-grow text-center sm:text-left">
                <h4 className="scroll-m-20 text-lg   font-semibold tracking-tight text-slate-700">
                  &copy; Design by Mochrks
                </h4>
              </div>
              <div className="ml-4">
                <img src={favicon} alt="logo" className="w-12 h-12 " width="48" height="48" />
              </div>
            </div>
          )}
        </div>

        <div id="go-top">
          <a className="p-4 smoothscroll" title="Back to Top" href="#">
            <FiArrowUp className="w-7 h-7 text-center justify-center dark:text-neutral-200 text-slate-100" />
          </a>
        </div>
      </footer>
    </footer>
  );
}
