import React from "react";

const Footer = () => {
  return (
    <footer
      className=" text-gray-300 py-16 relative"
      style={{
        backgroundImage: "url(/images/moon.jpeg)", // Correct path for image inside public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-black opacity-75 pointer-events-none"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Brand Name */}

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm uppercase">
          <li>
            <a href="#" className="hover:text-red-500 transition duration-300">
              Destinations
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-red-500 transition duration-300">
              Bookings
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-red-500 transition duration-300">
              Technology
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-red-500 transition duration-300">
              My Trips
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-red-500 transition duration-300">
              FAQ
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-red-500 transition duration-300">
              Support
            </a>
          </li>
        </ul>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-700"></div>

        {/* Footer Bottom */}
        <p className="mt-6 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} TEDX IPSA. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
