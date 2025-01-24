import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Header from "./components/core/Navbar/Header";
import Footer from "./components/ui/Footer";
import TeamSection from "./components/team/TeamSection";
import EditionsPage from "./components/Landing/Editions/EditionsPage";
import DescriptionPage from "./components/Landing/EditionDetails/DescriptionPage";
import TEDxTicket from "./components/Landing/DummyTicket/TEDxTicket";
import ContentForm from "./components/admin/ContentForm"; // Add this import

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black">
        {/* Fixed Header */}
        <Header />
        
        {/* Main Content with top padding for navbar height */}
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route
              path="/team"
              element={
                <div className="container mx-auto px-4">
                  <TeamSection />
                </div>
              }
            />
            <Route
              path="/edition"
              element={
                <div className="container mx-auto px-4">
                  <EditionsPage />
                </div>
              }
            />
            
            <Route
              path="/edition/description"
              element={
                <div className="container mx-auto px-4">
                  <DescriptionPage />
                </div>
              }
            />
            <Route
              path="/ticket"
              element={
                <div className="container mx-auto px-4">
                  <TEDxTicket />
                </div>
              }
            />
            {/* Add Admin Route */}
            <Route
              path="/admin/content"
              element={
                <div className="container mx-auto px-4 bg-white min-h-screen py-8">
                  <ContentForm />
                </div>
              }
            />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;