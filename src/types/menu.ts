import { NavigateFunction } from "react-router-dom";

export interface MenuItem {
  heading: string;
  subheading: string;
  imgSrc: string;
  href?: string;
  handler?: (onClick: () => void, navigate: NavigateFunction) => void;
}

export interface MenuProps {
  onMenuItemClick: () => void;
  origin?: { x: number; y: number };
}
