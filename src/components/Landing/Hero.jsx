import React from "react";
import { ShootingStars } from "../ui/shooting-starts";
import { StarsBackground } from "../ui/starts-background";
import { useNavigate } from "react-router-dom";
import aside from "/ttt.png";

const Hero = () => {
  const navigate = useNavigate();

  const handleTicketClick = () => {
    navigate("/ticket");
  };

  return (
    <section className="h-screen bg-transparent snap-start snap-always overflow-hidden relative">
      <div className="h-full w-full flex flex-col justify-center relative">
        {/* Content Container */}
        <div className="w-full flex items-center justify-center px-6 md:px-8">
          <div className="max-w-[1400px] w-full">
            <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                {/* Left Content */}
                <div className="flex-1 lg:py-8">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
                    We bring a space for new Ideas
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                    A gathering of bright minds sharing new ideas that inspire
                    change.
                  </p>
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={handleTicketClick}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg 
                               font-medium transition-all duration-300 transform hover:scale-105
                               hover:shadow-lg hover:shadow-red-500/20 z-40"
                    >
                      Get Tickets
                    </button>

                    <a
                      href="#about"
                      className="text-white group inline-flex items-center relative"
                    >
                      <span className="relative">
                        Learn More
                        <span
                          className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 
                                     transition-all duration-300 group-hover:w-full"
                        />
                      </span>
                      <span
                        className="ml-2 transform transition-transform duration-300 
                                   group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </a>
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 hidden lg:flex justify-center items-center">
                  <img
                    src={aside}
                    alt="TEDx Logo"
                    className="w-full max-w-[500px] transform transition-all duration-700
                             hover:scale-105 hover:rotate-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <ShootingStars />
        <StarsBackground />
      </div>
    </section>
  );
};

export default Hero;
