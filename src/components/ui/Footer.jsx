import React from "react";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  ChevronRight,
  Mail,
} from "lucide-react";

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
      hoverTransform: "hover:-translate-y-2 hover:rotate-6"
    },
    {
      icon: <InstagramIcon className="w-5 h-5" />,
      href: "https://instagram.com",
      color: "from-pink-600 to-purple-600",
      hoverTransform: "hover:-translate-y-2 hover:-rotate-6"
    },
    {
      icon: <TwitterIcon className="w-5 h-5" />,
      href: "https://twitter.com",
      color: "from-blue-400 to-blue-600",
      hoverTransform: "hover:-translate-y-2 hover:rotate-12"
    },
    {
      icon: <FacebookIcon className="w-5 h-5" />,
      href: "https://facebook.com",
      color: "from-blue-800 to-blue-600",
      hoverTransform: "hover:-translate-y-2 hover:-rotate-12"
    },
  ];

  return (
    <footer className="relative text-white">
      {/* Enhanced Background with multiple overlay layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base moon image with darker filter */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
          style={{ 
            backgroundImage: "url(/images/moon.jpeg)",
            filter: "brightness(0.2) contrast(1.1)"
          }}
        />
        
        {/* Multiple gradient layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/80 to-black" />
        
        {/* Subtle red accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/5 via-transparent to-transparent opacity-50" />
      </div>

      {/* Newsletter Section with enhanced design */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative">
              <div className="relative">
                <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="text-gray-300">
                  Subscribe to our newsletter for the latest updates and events.
                </p>
              </div>
            </div>
            <div className="flex w-full md:w-auto relative group">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-l-lg focus:outline-none 
                         focus:border-red-500 w-full md:w-80 transition-colors duration-300 
                         focus:bg-white/10"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 
                               hover:to-red-600 rounded-r-lg flex items-center gap-2 transition-all 
                               duration-300 hover:shadow-lg hover:shadow-red-500/20 relative overflow-hidden">
                <span className="relative z-10">Subscribe</span>
                <ChevronRight className="w-4 h-4 animate-pulse relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {/* Brand Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
                  TEDx IPSA
                </span>
              </h2>
              <p className="text-gray-300 mb-6">
                Ideas worth spreading. Join us in our journey of innovation,
                creativity, and inspiration.
              </p>
              {/* Enhanced Social Links */}
              <div className="flex gap-6">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 rounded-lg bg-white/5 backdrop-blur-sm
                              ${social.hoverTransform} transition-all duration-300`}
                  >
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${social.color} 
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-300 
                                  blur-lg group-hover:blur-xl" />
                    <div className="relative">
                      {React.cloneElement(social.icon, {
                        className: "w-5 h-5 transform transition-transform duration-300"
                      })}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links with enhanced hover effects */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {links.about.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-gray-300 hover:text-white 
                               transition-all duration-300"
                    >
                      <span className="relative overflow-hidden">
                        <ChevronRight className="w-4 h-4 transform translate-x-0 group-hover:translate-x-1 
                                               transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 
                                      opacity-0 group-hover:opacity-25 blur-lg transition-opacity duration-300" />
                      </span>
                      <span className="relative">
                        {link.name}
                        <span className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r 
                                       from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 
                                       transition-transform duration-300" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Bottom with enhanced separators */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;