import React from "react";
import { ShootingStars } from "../ui/shooting-starts";
import { StarsBackground } from "../ui/starts-background";
import Solar from "./Solar";

const Hero = () => {
  return (
    <section className="min-h-screen bg-transparent snap-start snap-always overflow-hidden relative">
      <div className="h-full w-full flex flex-col relative">
        {/* TEDx Text Container - Takes full height */}
        <div className="w-full h-[60vh] flex items-center justify-center">
          <h2 className="flex flex-col items-center justify-center tracking-tight font-medium">
            <span className="text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-red-800 via-red-500 to-red-300">
              TEDx
            </span>
            <span className="text-6xl font-extrabold text-neutral-50 mt-4">
              IPSA, INDORE
            </span>
          </h2>
        </div>

        {/* Planets Container - Positioned below */}
        <div className="w-full h-screen relative">
          <div className="absolute inset-0 pointer-events-none">
            <Solar />
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