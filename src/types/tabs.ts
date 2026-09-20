import React from "react";

export type TabPosition = {
  left: number;
  width: number;
  opacity: number;
};

export interface TabsMenuProps {
  setActiveCategory: (category: string) => void;
}

export interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<TabPosition>>;
  setActiveCategory: (category: string) => void;
  category: string;
}
