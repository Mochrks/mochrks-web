import React, { useState, useEffect } from "react";
import "@/styles/Navbar.css";
import Menu from "./Menu";
import { logo } from "@/assets/index";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleMenuItemClick = () => {
    setIsActive(false);
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
        <header className="logo">
          <img
            className="inline w-[3rem] h-[3rem] bg-blue-200"
            src={logo}
            alt="Logo"
          />
          <h2 className="text-white ml-2 my-auto text-md font-semibold tracking-tight first:mt-0">
            Hello
            <br />
            World.
          </h2>
        </header>

        <div
          className={`flex container justify-end  ${isActive ? "active" : ""}`}
          onClick={handleClick}
        >
          {isActive ? (
            <FiX className="w-[2rem] h-[3rem] text-white" />
          ) : (
            <FiMenu className="w-[2rem] h-[3rem] text-white" />
          )}
        </div>

        {isActive ? <Menu onMenuItemClick={handleMenuItemClick} /> : null}
      </nav>
    </>
  );
}
