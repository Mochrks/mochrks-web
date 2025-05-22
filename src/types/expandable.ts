import { HTMLAttributes } from "react";

export interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  item: { image: string; title: string };
  index: number;
  activeItem: number;
}

export interface ExpandableProps {
  list?: { image: string; title: string }[];
  autoPlay?: boolean;
  className?: string;
}