import React from "react";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  ChevronRight,
} from "lucide-react";
import logo from "/tedxlogo/logo-white.png";

const Footer = () => {
  const links = {
    about: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Speakers", href: "/speakers" },
      { name: "Editions", href: "/editions" },
      { name: "Contact", href: "/contact" },
    ],
  };

  const socials = [
    {
      icon: <LinkedinIcon className="w-5 h-5" />,
      href: "https://linkedin.com",
      color: "from-blue-600 to-blue-400",
      hoverTransform: "hover:-translate-y-2 hover:rotate-6",
    },
    {
      icon: <InstagramIcon className="w-5 h-5" />,
      href: "https://instagram.com",
      color: "from-pink-600 to-purple-600",
      hoverTransform: "hover:-translate-y-2 hover:-rotate-6",
    },
    {
      icon: <TwitterIcon className="w-5 h-5" />,
      href: "https://twitter.com",
      color: "from-blue-400 to-blue-600",
      hoverTransform: "hover:-translate-y-2 hover:rotate-12",
    },
    {
      icon: <FacebookIcon className="w-5 h-5" />,
      href: "https://facebook.com",
      color: "from-blue-800 to-blue-600",
      hoverTransform: "hover:-translate-y-2 hover:-rotate-12",
    },
  ];

  return (
    <footer className="relative text-white bg-black">
      {/* Enhanced Background with Half Moon Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-full h-full">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(/images/moon.jpeg)",
              filter: "brightness(0.8) contrast(1.3)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/90 to-black" />
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for the latest updates and events.
              </p>
            </div>
            <div className="flex w-full md:w-auto relative group">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-l-lg focus:outline-none 
                         focus:border-red-500 w-full md:w-80 transition-colors duration-300"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-r-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg">
                <span>Subscribe</span>
                <ChevronRight className="w-4 h-4 animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <div className="relative z-10">
              <div className="mb-6">
                <img
                  src={logo}
                  alt="logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-gray-300 mb-6 max-w-lg">
                Ideas worth spreading. Join us in our journey of innovation,
                creativity, and inspiration.
              </p>
              {/* Social Links */}
              <div className="flex gap-4">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-2 rounded-lg bg-white/5 backdrop-blur-sm
                              ${social.hoverTransform} transition-all duration-300`}
                  >
                    <div
                      className={`absolute inset-0 rounded-lg bg-gradient-to-br ${social.color} 
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    <div className="relative">{social.icon}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="relative z-10">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {links.about.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-gray-300 hover:text-white 
                               transition-all duration-300"
                    >
                      <ChevronRight
                        className="w-4 h-4 transform group-hover:translate-x-1 
                                             transition-transform duration-300"
                      />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
