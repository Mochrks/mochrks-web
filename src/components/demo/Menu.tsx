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

  const handleProject = () => {
    navigate("/project");
  };
  const handleDesign = () => {
    navigate("/design");
  };
  const handleUIUX = () => {
    navigate("/ui-ux-design");
  };
  return (
    <>
      <div className="menu">
        <ul className="list-none text-4xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-[80px] px-5 md:px-14 2xl:px-[100px] pt-[8rem] 4xl:pt-[15rem] ">
          <li>
            <a href="#about" onClick={onMenuItemClick}>
              ABOUT
            </a>
          </li>
          <li>
            <a onClick={handleProject} className="cursor-pointer">
              PROJECT
            </a>
          </li>
          <li>
            <a onClick={handleDesign} className="cursor-pointer">
              DESIGN
            </a>
          </li>
          <li>
            <a onClick={handleUIUX} className="cursor-pointer">
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
