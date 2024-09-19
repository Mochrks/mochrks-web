import React, { useState } from "react";
import "@/styles/Navbar.css";
import Menu from "./Menu";
import { logo } from "@/assets/index";
export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleMenuItemClick = () => {
    setIsActive(false);
  };

  return (
    <>
      <nav className="nav">
        <header className="logo">
          <img
            className="inline w-[3rem] h-[3rem]"
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
          className={`container w-[7rem] h-[5rem] sm:w-[8rem]  ${isActive ? "active" : ""
            }`}
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className={"w-full h-full fill-primary "}
          >
            <g stroke-width="8.5" stroke-linecap="round">
              <path
                d="M72 82.286h28.75"
                fill="#009100"
                fill-rule="evenodd"
                stroke="#fff"
              />
              <path
                d="M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554"
                fill="none"
                stroke="#fff"
              />
              <path
                d="M72 125.143h28.75"
                fill="#009100"
                fill-rule="evenodd"
                stroke="#fff"
              />
              <path
                d="M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554"
                fill="none"
                stroke="#fff"
              />
              <path
                d="M100.75 82.286h28.75"
                fill="#009100"
                fill-rule="evenodd"
                stroke="#fff"
              />
              <path
                d="M100.75 125.143h28.75"
                fill="#009100"
                fill-rule="evenodd"
                stroke="#fff"
              />
            </g>
          </svg>
        </div>

        {isActive ? <Menu onMenuItemClick={handleMenuItemClick} /> : null}
      </nav>
    </>
  );
}
