import React from "react";

const WhatWeThink = () => {
  return (
    <div className="flex flex-wrap justify-center items-center px-5 py-8 max-w-screen-xl mx-auto gap-5 min-h-[400px]">
      {/* Text Content */}
      <div className="flex-1 max-w-xl text-left px-4">
        <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
          <span className="text-white">WHAT </span>
          <span className="text-red-700">WE THINK?</span>
        </h1>
        <p className="leading-relaxed text-base md:text-lg mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare
          bibendum sodales. Mauris posuere, sapien ac eleifend finibus, magna
          diam tempus purus, eu efficitur erat orci ut ante.
        </p>
        <p className="leading-relaxed text-base md:text-lg">
          Nulla non molestie est, a feugiat lacus. Donec lacinia varius odio,
          quis ornare ex varius at. Donec a lectus iaculis, rhoncus mauris
          gravida, pharetra tortor.
        </p>
      </div>

      {/* Image with Text Overlay */}
      <div className="relative flex-1 flex justify-center items-center">
        <img src="/Aside.png" alt="" className="h-full"/>
      </div>
    </div>
  );
};

export default WhatWeThink;
