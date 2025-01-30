import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Header from "./components/core/Navbar/Header";
import Footer from "./components/ui/Footer";
import TeamSection from "./components/team/TeamSection";
import EditionsPage from "./components/Landing/Editions/EditionsPage";
import DescriptionPage from "./components/Landing/EditionDetails/DescriptionPage";
import TEDxTicket from "./components/Landing/DummyTicket/TEDxTicket";
import EditionForm from "./components/admin/ThemeForm";
import AboutUsForm from "./components/admin/AboutUsForm/index";
import SpeakerForm from "./components/admin/SpeakerForm";
import TeamManagementForm from "./components/admin/TeamForm";
import EditionDescriptionForm from "./components/admin/EditionDescForm";
import AdminDashboard from "./components/admin/main";
import AdminLogin from "./components/admin/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import SpeakersPage from "./components/Landing/Speakers/SpeakersPage";
import OldTeam from "./components/team/OldTeam";
import OldTeamManagementForm from "./components/admin/OldTeam";
import ContactPage from "./components/core/Navbar/ContactPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black">
        {/* Fixed Header - Don't show on admin routes */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Header />} />
        </Routes>

        {/* Main Content with top padding for navbar height */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
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
              path="/contact"
              element={
                <div className="container mx-auto px-4">
                  <ContactPage />
                </div>
              }
            />

            <Route
              path="/speakers"
              element={
                <div className="container mx-auto px-4">
                  <SpeakersPage />
                </div>
              }
            />
            <Route
              path="/editions/:editionId"
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
            <Route path="/old-team/:editionId" element={<OldTeam />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/edition"
              element={
                <ProtectedRoute>
                  <EditionForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/about"
              element={
                <ProtectedRoute>
                  <AboutUsForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/speakers"
              element={
                <ProtectedRoute>
                  <SpeakerForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/team"
              element={
                <ProtectedRoute>
                  <TeamManagementForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/old-team"
              element={
                <ProtectedRoute>
                  <OldTeamManagementForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/editionDesc"
              element={
                <ProtectedRoute>
                  <EditionDescriptionForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Footer - Don't show on admin routes */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
