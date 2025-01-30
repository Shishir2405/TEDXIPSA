import React, { useState, useRef } from "react";
import {
  User,
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  X,
  Sparkles,
  Download,
  Share2
} from "lucide-react";
import logo from "/tedxlogo/logo-white.png";

const TEDxTicket = () => {
  const [attendeeName, setAttendeeName] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef(null);

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    
    setIsDownloading(true);
    try {
      const ticketElement = ticketRef.current;
      const svgData = new XMLSerializer().serializeToString(ticketElement);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `TEDx-Ticket-${attendeeName || 'Guest'}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating ticket:", error);
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4 pt-20 ">
      {/* Enhanced Name Input */}
      <div className="mb-8 w-full max-w-4xl relative group px-4">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-xl blur opacity-25 
                       group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <div className="absolute inset-0 bg-black/50 rounded-xl backdrop-blur-sm" />
        <User
          className="absolute left-6 top-1/2 -translate-y-1/2 text-red-500 group-focus-within:text-red-400 
                    transition-colors duration-300 z-20 hidden sm:block"
          size={20}
        />
        <input
          type="text"
          placeholder="Enter attendee name"
          value={attendeeName}
          onChange={(e) => setAttendeeName(e.target.value)}
          className="w-full px-4 sm:px-12 py-4 bg-gray-900/50 text-white border-2 border-red-500/50 rounded-xl
                   focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50
                   transition-all duration-300 placeholder-gray-400 hover:border-red-500
                   backdrop-blur-sm relative z-10"
        />
        {attendeeName && (
          <button
            onClick={() => setAttendeeName("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-400 
                     transition-colors duration-300 z-20"
          >
            <X size={20} />
          </button>
        )}
        <Sparkles className="absolute right-12 top-1/2 -translate-y-1/2 text-red-500/50 z-20 hidden sm:block" size={20} />
      </div>

      {/* Ticket Container */}
      <div className="relative group px-4" ref={ticketRef}>
        <div className="absolute -inset-1  rounded-xl blur opacity-25 
                       group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        
        <div className="shine-effect absolute inset-0 rounded-xl overflow-hidden opacity-0 
                       group-hover:opacity-100 transition-opacity duration-1000" />

        <div className="flex flex-col md:flex-row bg-black shadow-2xl max-w-4xl w-full border border-gray-800 
                     rounded-xl transform transition-all duration-500 hover:scale-[1.02] 
                     hover:border-red-500/50 relative z-10 backdrop-blur-sm">
          {/* Left Ticket Section */}
          <div className="flex flex-col md:flex-row flex-1">
            {/* Image Section */}
            <div className="relative w-full md:w-64 h-48 md:h-auto">
              <div className="absolute h-full py-2 px-4 text-gray-700 writing-vertical-rl rotate-180 
                           flex justify-around w-8 hidden md:flex">
                <span>ADMIT ONE</span>
                <span className="text-red-500 font-bold">ADMIT ONE</span>
                <span>ADMIT ONE</span>
              </div>

              <div className="h-full w-full bg-gradient-to-br from-black via-gray-900 to-black opacity-85 
                           relative md:rounded-l-xl group overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative p-6">
                    <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-xl" />
                    <img src={logo} alt="TEDx Logo" className="w-32 h-32 relative z-10" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 text-red-500/70 text-sm">#TEDx2025</div>
              </div>
            </div>

            {/* Ticket Info */}
            <div className="p-4 md:p-8 flex flex-col justify-between space-y-4 text-center md:text-left">
              {/* Date Section */}
              <div className="border-t border-b border-gray-800 py-2 group">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-8 text-gray-400">
                  <Calendar
                    size={18}
                    className="text-gray-600 group-hover:text-red-500 transition-colors duration-300"
                  />
                  <span className="text-sm sm:text-base">FRIDAY</span>
                  <span className="text-lg sm:text-xl text-red-500">FEBRUARY 15TH</span>
                  <span className="text-sm sm:text-base">2025</span>
                </div>
              </div>

              {/* Event Name and Attendee */}
              <div className="space-y-4">
                <div className="text-center group">
                  <h3 className="text-2xl md:text-4xl font-bold text-white tracking-wide mb-2 
                              group-hover:text-red-500 transition-colors duration-300">
                    Beyond Boundaries
                  </h3>
                  <div className="h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent 
                               transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>

                <div className="text-gray-500 border-t border-b border-gray-800 py-2 group">
                  <div className="flex items-center justify-center gap-2">
                    <Users
                      size={18}
                      className="group-hover:text-red-500 transition-colors duration-300"
                    />
                    <p className="text-sm uppercase">Attendee</p>
                  </div>
                  <p className="text-xl text-white">
                    {attendeeName || 
                      <span className="text-gray-500 animate-pulse">Enter your name above</span>
                    }
                  </p>
                </div>
              </div>

              {/* Time and Location */}
              <div className="space-y-4">
                <div className="text-gray-400 space-y-2 font-bold group">
                  <div className="flex items-center justify-center gap-2">
                    <Clock
                      size={18}
                      className="text-gray-600 group-hover:text-red-500 transition-colors duration-300"
                    />
                    <p className="text-sm sm:text-base">
                      10:00 AM <span className="text-gray-600">TO</span> 5:00 PM
                    </p>
                  </div>
                  <p className="text-sm sm:text-base">
                    DOORS <span className="text-gray-600">@</span> 9:00 AM
                  </p>
                </div>

                <div className="border-t border-gray-800 pt-4 flex flex-col sm:flex-row items-center 
                              justify-center gap-2 sm:gap-4 text-gray-400 group">
                  <MapPin
                    size={18}
                    className="text-gray-600 group-hover:text-red-500 transition-colors duration-300"
                  />
                  <span className="text-sm sm:text-base">IPSA Auditorium</span>
                  <span className="text-red-500 text-xl hidden sm:inline">•</span>
                  <span className="text-sm sm:text-base">Raipur, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Ticket Section */}
          <div className="w-full md:w-48 border-t md:border-l border-dashed border-gray-800 
                       relative md:rounded-r-xl group hover:bg-gray-900/30 
                       transition-colors duration-300">
            <div className="p-6 flex flex-col h-full justify-between items-center">
              <div className="text-center group">
                <h1 className="text-xl font-bold text-white group-hover:text-red-500 
                           transition-colors duration-300">
                  Beyond Boundaries
                </h1>
                <h2 className="text-red-500">TEDx IPSA</h2>
              </div>

              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <Users size={16} />
                  <p className="text-sm uppercase">Attendee</p>
                </div>
                <p className="text-white">{attendeeName || "GUEST"}</p>
              </div>

              <div className="text-sm text-gray-400 text-center space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <Clock size={16} className="text-gray-600" />
                  <p>10:00 AM</p>
                </div>
                <p className="text-gray-600">SEAT 156</p>
              </div>

              <div className="text-gray-600 text-sm pt-4 border-t border-gray-800 w-full 
                           text-center group-hover:text-red-500/70 transition-colors duration-300">
                #TEDx2025
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 px-4">
        <button
          onClick={handleDownload}
          className="relative group px-6 py-3 bg-black border-2 border-red-500/50 rounded-xl
                   text-white flex items-center justify-center gap-2 hover:border-red-500 
                   transition-all duration-300 hover:scale-105"
        >
          <Download 
            className={`w-5 h-5 ${isDownloading ? 'animate-bounce' : 'group-hover:animate-bounce'}`} 
          />
          <span className="text-sm sm:text-base">
            {isDownloading ? "Generating..." : "Download Ticket"}
          </span>
        </button>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'My TEDx Ticket',
                text: 'Check out my TEDx ticket!',
              });
            }
          }}
          className="relative group px-6 py-3 bg-black border-2 border-red-500/50 rounded-xl
                   text-white flex items-center justify-center gap-2 hover:border-red-500 
                   transition-all duration-300 hover:scale-105"
        >
          <Share2 className="w-5 h-5 group-hover:animate-pulse" />
          <span className="text-sm sm:text-base">Share Ticket</span>
        </button>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .writing-vertical-rl {
          writing-mode: vertical-rl;
        }
        
        .shine-effect {
          background: linear-gradient(
            45deg,
            transparent 0%,
            transparent 45%,
            rgba(255, 255, 255, 0.15) 48%,
            rgba(255, 255, 255, 0.15) 52%,
            transparent 55%,
            transparent 100%
          );
          transform: translateX(-100%) translateY(-100%);
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }

        * {
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </div>
  );
};

export default TEDxTicket;