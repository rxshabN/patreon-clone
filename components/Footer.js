import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-4 flex flex-row items-center justify-center h-16 gap-12">
      <p className="text-center text-sm md:text-base">Made by Rishab Nagwani</p>
      <p className="text-center text-sm md:text-base">
        <a href="/about">About this project</a>
      </p>
    </footer>
  );
};

export default Footer;
