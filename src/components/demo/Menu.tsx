import React from "react";
import "../../styles/Menu.css";
import { MenuFeatures } from "./MenuFeatures";

export default function Menu() {
  return (
    <>
      <div className="menu">
        <ul className="list-none text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl  px-5 md:px-14 2xl:px-[100px] ">
          <li>
            <a href="#">ABOUT</a>
          </li>
          <li>
            <a href="#">PROJECT</a>
          </li>
          <li>
            <a href="#">DESIGN</a>
          </li>
          <li>
            <a href="#">UI/UX</a>
          </li>
          <li>
            <a href="#">PHOTOGRAPHY</a>
          </li>
          <li>
            <a href="#">ARTICLE</a>
          </li>
          <li>
            <a href="#">CONTACT</a>
          </li>

          <li>
            <MenuFeatures />
          </li>
        </ul>
      </div>
    </>
  );
}
