import React from "react";
import "../../styles/Navbar.css";
export default function Navbar() {
  return (
    <>
      <div className="nav">
        <div className="logo">
          <img
            className="inline w-12 h-12"
            src="../../../src/assets/img/favicon.png"
            alt="Logo"
          />
          <h2 className="text-white ml-2 my-auto text-md font-semibold tracking-tight first:mt-0">
            Hello
            <br />
            World.
          </h2>
        </div>
      </div>
    </>
  );
}
