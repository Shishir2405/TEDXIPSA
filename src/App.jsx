// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Navbar from "./components/core/navbar";
import { StarsBackground } from "./components/ui/starts-background";
import { ShootingStars } from "./components/ui/shooting-starts";
import TeamSection from "./components/team/TeamSection"; // Import Team component

function App() {
  return (
    <Router>
      <div className="bg-black">
        <div className="flex justify-center w-screen">
          <Navbar />
        </div>
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Layout />} />
          <Route path="/team" element={<TeamSection />} />
        </Routes>
        
        <ShootingStars />
        <StarsBackground />
      </div>
    </Router>
  );
}

export default App;
