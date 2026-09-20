import { about, project, photo, uiux, article, contact, design } from "@/assets";
import { MenuItem } from "@/types/menu";
import { NavigateFunction } from "react-router-dom";

export const MENU_ITEMS: MenuItem[] = [
  {
    heading: "About",
    subheading: "Learn more about my personality",
    imgSrc: about,
    href: "#about",
  },
  {
    heading: "Project",
    subheading: "Showcasing my latest project",
    imgSrc: project,
    handler: (_: () => void, navigate: NavigateFunction) => navigate("/project"),
  },
  {
    heading: "Design Artwork",
    subheading: "Creative designs that tell a story",
    imgSrc: design,
    handler: (_: () => void, navigate: NavigateFunction) => navigate("/design-artwork"),
  },
  {
    heading: "UI/UX",
    subheading: "Designing intuitive user experiences",
    imgSrc: uiux,
    handler: (_: () => void, navigate: NavigateFunction) => navigate("/ui-ux-design"),
  },
  {
    heading: "Photography",
    subheading: "Visual storytelling through my lens",
    imgSrc: photo,
    handler: (_: () => void, navigate: NavigateFunction) => navigate("/photography"),
  },
  {
    heading: "Article",
    subheading: "Read my thoughts on article",
    imgSrc: article,
    handler: (_: () => void, navigate: NavigateFunction) => navigate("/article"),
  },
  {
    heading: "Contact",
    subheading: "Let's connect and collaborate",
    imgSrc: contact,
    href: "#contact",
  },
];
