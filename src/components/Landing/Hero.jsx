import React from "react";
import { ShootingStars } from "../ui/shooting-starts";
import { StarsBackground } from "../ui/starts-background";
import { Link } from "react-router-dom";
import Solar from "./Solar";

const Hero = () => {
  return (
    <section className="min-h-screen bg-transparent snap-start snap-always overflow-hidden relative">
      <div className="h-full w-full flex flex-col relative">
        {/* Content Container */}
        <div className="w-full min-h-[80vh] flex items-center justify-center px-6 md:px-8">
          <div className="max-w-[1400px] w-full">
            <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                {/* Left Content */}
                <div className="flex-1">
                  <img
                    src="/logo/white_logo.png"
                    alt="TEDx Logo"
                    className="h-12 mb-8"
                  />
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
                  We bring a space for new Ideas
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                    A gathering of bright minds sharing new ideas that inspire
                    change.
                  </p>
                  <div className="flex gap-4 items-center">
                    <Link to="/ticket">
                      {" "}
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 cursor-pointer">
                        Get Tickets
                      </button>
                    </Link>
                    <a
                      href="#"
                      className="text-white group inline-flex items-center"
                    >
                      Learn More
                      <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 hidden lg:block">
                  <img
                    src="https://www.tedxcuneo.com/img/home/ubuntu-x.svg"
                    alt=""
                  />
                  {/* Placeholder for Future Content */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <ShootingStars />
        <StarsBackground />
      </div>

      {/* Solar System Section */}
    </section>
  );
};

export default Hero;
