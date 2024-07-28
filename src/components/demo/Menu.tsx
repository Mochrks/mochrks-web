import React from "react";
import "../../styles/Menu.css";
import { MenuFeatures } from "./MenuFeatures";

export default function Menu({ onMenuItemClick }) {
  return (
    <>
      <div className="menu">
        <ul className="list-none text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl  px-5 md:px-14 2xl:px-[100px] ">
          <li>
            <a href="#about" onClick={onMenuItemClick}>
              ABOUT
            </a>
          </li>
          <li>
            <a href="#projects" onClick={onMenuItemClick}>
              PROJECT
            </a>
          </li>
          <li>
            <a href="#" onClick={onMenuItemClick}>
              DESIGN
            </a>
          </li>
          <li>
            <a href="#uiux" onClick={onMenuItemClick}>
              UI/UX
            </a>
          </li>
          <li>
            <a href="#photography" onClick={onMenuItemClick}>
              PHOTOGRAPHY
            </a>
          </li>
          <li>
            <a href="#" onClick={onMenuItemClick}>
              ARTICLE
            </a>
          </li>
          <li>
            <a href="#contact" onClick={onMenuItemClick}>
              CONTACT
            </a>
          </li>

          <li>
            <MenuFeatures />
          </li>
        </ul>
      </div>
    </>
  );
}
