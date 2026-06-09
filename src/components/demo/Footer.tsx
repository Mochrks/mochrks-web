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
import "@/styles/Footer.css";
import useBreakpoints from "@/hooks/use-breakpoints";
import { favicon } from "@/assets";
import ScrollToTopButton from "./ScrollToTopButton";

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
              <a
                href="https://medium.com/@mochrks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read Moch. Rizki Kurniawan's technical articles on Medium"
                title="Medium Articles by @mochrks"
              >
                <FaMedium className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Mochrks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Moch. Rizki Kurniawan's open source projects on GitHub"
                title="GitHub Projects by @mochrks"
              >
                <FaGithub className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a
                href="https://www.hackerrank.com/profile/mochrks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Moch. Rizki Kurniawan's competitive programming progress on HackerRank"
                title="HackerRank Profile of @mochrks"
              >
                <SiHackerrank className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/mochrks/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Moch. Rizki Kurniawan professional network on LinkedIn"
                title="LinkedIn Professional Network of @mochrks"
              >
                <FaLinkedin className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/mochrks/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow @mochrks on Instagram for photography and video updates"
                title="Instagram Profile of @mochrks"
              >
                <FaInstagram className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a
                href="https://www.behance.net/mochrks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Explore Moch. Rizki Kurniawan's graphic design and apparel works on Behance"
                title="Behance Creative Designs by @mochrks"
              >
                <FaBehance className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a
                href="https://dribbble.com/mochrks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Check out Moch. Rizki Kurniawan's creative shots on Dribbble"
                title="Dribbble Creative shots by @mochrks"
              >
                <FaDribbble className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@gdvisuel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch Moch. Rizki Kurniawan's visual production assets on YouTube"
                title="YouTube Video Portfolio of @mochrks"
              >
                <FaYoutube className="w-8 h-8 dark:text-neutral-200 text-slate-700" />
              </a>
            </li>
            <li>
              <a
                href="https://id.pinterest.com/mochrizkiks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Browse Moch. Rizki Kurniawan's visual layout references on Pinterest"
                title="Pinterest Boards by @mochrks"
              >
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
        <ScrollToTopButton />
      </footer>
    </footer>
  );
}
