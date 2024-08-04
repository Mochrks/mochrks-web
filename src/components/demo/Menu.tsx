import React from "react";
import "../../styles/Menu.css";
import { MenuFeatures } from "./MenuFeatures";
import { useNavigate } from "react-router-dom";

export default function Menu({ onMenuItemClick }) {
  const navigate = useNavigate();
  const handleArticle = () => {
    navigate("/article");
  };
  const handlePhotography = () => {
    navigate("/photography");
  };
  return (
    <>
      <div className="menu">
        <ul className="list-none text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl  px-5 md:px-14 2xl:px-[100px] pt-[8rem] 4xl:pt-[15rem] ">
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
            <a onClick={handlePhotography} className="cursor-pointer">
              PHOTOGRAPHY
            </a>
          </li>
          <li>
            <a onClick={handleArticle} className="cursor-pointer">
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
