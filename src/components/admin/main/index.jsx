import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Zap,
  Settings,
  FileText,
  Users2,
  Mic2,
  PenTool
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const cards = [
    {
      title: "Editions Management",
      description: "Manage and organize TEDx editions, update content and details",
      icon: <FileText className="w-6 h-6" />,
      link: "/admin/edition",
      gradient: "from-pink-600/20 via-red-600/20 to-purple-600/20"
    },
    {
      title: "About Management",
      description: "Update about section content, mission, and vision statements",
      icon: <PenTool className="w-6 h-6" />,
      link: "/admin/about",
      gradient: "from-blue-600/20 via-purple-600/20 to-red-600/20"
    },
    {
      title: "Edition Description Management",
      description: "Manage detailed descriptions and content for each edition",
      icon: <Settings className="w-6 h-6" />,
      link: "/admin/editionDesc",
      gradient: "from-red-600/20 via-orange-600/20 to-yellow-600/20"
    },
    {
      title: "Team Management",
      description: "Organize team members, roles, and department structures",
      icon: <Users2 className="w-6 h-6" />,
      link: "/admin/team",
      gradient: "from-green-600/20 via-emerald-600/20 to-teal-600/20"
    },
    {
      title: "Speakers Management",
      description: "Manage speakers, their talks, and presentation details",
      icon: <Mic2 className="w-6 h-6" />,
      link: "/admin/speakers",
      gradient: "from-purple-600/20 via-violet-600/20 to-indigo-600/20"
    },
    {
      title: "Old Team Management",
      description: "Organize team members, roles, and department structures",
      icon: <Users2 className="w-6 h-6" />,
      link: "/admin/old-team",
      gradient: "from-green-600/20 via-emerald-600/20 to-teal-600/20"
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-red-600/10 rounded-xl">
                <Zap className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl">
              Welcome to the TEDxIPSA admin control center. Manage and control all aspects of your TEDx event from one place.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => navigate(card.link)}
                className="group relative overflow-hidden bg-zinc-900/50 backdrop-blur-sm 
                         rounded-2xl border border-white/5 transition-all duration-500 
                         hover:border-red-500/30 hover:scale-[1.02] cursor-pointer"
              >
                {/* Card Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Glowing Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500 -z-10">
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} blur-xl`} />
                </div>

                {/* Content */}
                <div className="relative p-6 md:p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 
                                transition-colors duration-500">
                      {React.cloneElement(card.icon, {
                        className: "w-6 h-6 text-red-500 group-hover:text-red-400 transition-colors duration-500"
                      })}
                    </div>
                    <h2 className="text-xl font-semibold text-white group-hover:text-red-50 
                                transition-colors duration-500">
                      {card.title}
                    </h2>
                  </div>

                  <p className="text-gray-400 mb-6 group-hover:text-gray-300 
                              transition-colors duration-500 min-h-[3rem]">
                    {card.description}
                  </p>

                  <div className="inline-flex items-center text-red-500 group-hover:text-red-400 
                                transition-colors duration-500">
                    <span className="font-medium">Access Panel</span>
                    <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 
                                         transition-transform duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;