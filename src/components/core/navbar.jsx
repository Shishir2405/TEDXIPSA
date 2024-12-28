import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/logo/white_logo.png";

const NavItems = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "Teams", href: "/team" },
];

const NavLink = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className="relative py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-neutral-50 hover:text-red-500 transition-colors">
        {children}
      </span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 origin-left"
      />
    </a>
  );
};

const Navbar = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="flex items-center justify-between mx-auto w-[90%] z-50 rounded-xl py-3 px-4 h-fit fixed top-4 -translate-x-1/2 space-x-4 shadow-lg bg-opacity-20 backdrop-blur-md bg-black"
      >
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-26 h-16 rounded-full" />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          {NavItems.map((item) => (
            <NavLink key={item.id} href={item.href}>
              {item.title}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Navbar;
