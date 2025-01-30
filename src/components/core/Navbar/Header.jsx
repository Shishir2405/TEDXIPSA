import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "/tedxlogo/logo-white.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? "hidden" : "auto";
  };

  const handleNavigation = (path) => {
    if (path.startsWith("#")) {
      // Handle hash navigation
      const element = document.querySelector(path);
      if (element) {
        setMenuOpen(false);
        document.body.style.overflow = "auto";

        // If we're not on the home page, navigate home first
        if (location.pathname !== "/") {
          navigate("/");
          // Wait for navigation to complete before scrolling
          setTimeout(() => {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 100);
        } else {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    } else {
      // Regular route navigation
      navigate(path);
      setMenuOpen(false);
      document.body.style.overflow = "auto";
      // Scroll to top for regular navigation
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Editions", path: "/edition" },
    { name: "Team", path: "/team" },
    { name: "Speakers", path: "/speakers" },
    { name: "Contact Us", path: "/contact" },
  ];

  const mobileNavItems = [...navItems];

  // Check if a path matches current location or hash
  const isActive = (path) => {
    if (path.startsWith("#")) {
      return location.hash === path;
    }
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="flex justify-between items-center px-8 py-4 backdrop-blur-lg bg-transparent shadow-lg">
        {/* Logo */}
        <Link to="/" className="fixed top-4 left-8 z-50">
          <img src={logo} alt="logo" className="h-12" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center justify-end flex-1 mr-16">
          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="group relative"
                onClick={() => handleNavigation(item.path)}
              >
                <span
                  className={`text-white text-base font-medium cursor-pointer ${
                    isActive(item.path)
                      ? "opacity-100"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                      isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="relative z-50 w-8 h-6 flex flex-col justify-between ml-auto"
        >
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 origin-left ${
              menuOpen ? "rotate-45 translate-x-px" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 origin-left ${
              menuOpen ? "-rotate-45 translate-x-px" : ""
            }`}
          ></span>
        </button>

        {/* Full Screen Menu */}
        <div
          className={`fixed inset-0 bg-black h-screen transition-all duration-500 ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col items-end justify-end p-8 pt-24 bg-black">
            {mobileNavItems.map((item, index) => (
              <div
                key={index}
                className={`group relative py-4 bg-black transition-all duration-500 ${
                  menuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
                onClick={() => handleNavigation(item.path)}
              >
                <span
                  className={`text-white text-2xl font-bold cursor-pointer relative ${
                    isActive(item.path)
                      ? "opacity-100"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full origin-right"></span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
