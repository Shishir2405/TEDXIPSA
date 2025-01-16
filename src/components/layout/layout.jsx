// Layout.jsx
import React from "react";
import Hero from "../Landing/Hero";
import WhatWeThink from "../Landing/WhatWeThink";
import SpeakersSection from "../Landing/Speakers/SpeakersSection";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container mx-auto px-4">
        <WhatWeThink />
        <SpeakersSection />
      </div>
    </div>
  );
};

export default Layout;