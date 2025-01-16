// TeamPage.jsx
import React from 'react';

import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
const heads = {
  Creative: [
    {
      name: "Deeksha Jain",
      role: "Head",
      linkedIn: "https://www.linkedin.com/in/deeksha-jain-deeku02",
      instagram: "#",
      image: "/assets/Deeksha_Jain.jpg",
    },
  ],
  Curation: [
    {
      name: "Yuvraj Singh Sisodia",
      role: "Head",
      linkedIn: "https://www.linkedin.com/in/yuvraj-singh-sisodia/",
      instagram: "https://www.instagram.com/_yuvrajsisodia/",
      image: "/assets/Yuvraj_Singh_Sisodia.jpg",
    },
  ],
  Decoration: [
    {
      name: "Manya Madhu",
      role: "Head",
      linkedIn: "mailto:manyamadhu04@gmail.com",
      instagram: "https://www.instagram.com/_manya2106_/",
      image: "/assets/Manya_Madhu.jpeg",
    },
  ],
  Executive: [
    {
      name: "Bhavesh Ghanshani",
      role: "head",
      linkedIn: "https://www.linkedin.com/in/bhavesh-ghanshani/",
      instagram: "https://www.instagram.com/bhav.xh?igsh=OXd4YTUwYmZqaW5u",
      image: "/assets/Bhavesh_Ghanshani.jpg",
    },
  ],
  Finance: [
    {
      name: "Ashish Prajapat",
      role: "Head",
      linkedIn: "https://www.linkedin.com/in/ashish-prajapat-896b11244/",
      instagram:
        "https://www.instagram.com/artistic_ashish08?igsh=MWxmY29laHR3ZDNxMw==",
      image: "/assets/Ashish_Prajapat.jpg",
    },
  ],
  HMM: [
    {
      name: "Aditya Thakur",
      role: "Head",
      linkedIn: "www.linkedin.com/in/aditya-thakur-a15b76229",
      instagram:
        "https://www.instagram.com/adityathakur_26?igsh=MTA4MGx5Nnl5bGZzeg%3D%3D&utm_source=qr",
      image: "/assets/Aditya_Thakur.jpg",
    },
  ],
  Hospitality: [
    {
      name: "Gauransh Raghuvanshi",
      role: "Head",
      linkedIn: "https://www.linkedin.com/in/gauransh-raghuvanshi-97a230277/",
      instagram: "https://www.instagram.com/jay__raghuvanshi/",
      image: "/assets/Gauransh_Raghuvanshi.jpg",
    },
  ],
  Logistics: [
    {
      name: "Devansh Sarwadia",
      role: "Head",
      linkedIn: "https://in.linkedin.com/in/devansh-sarwadia-b811a8258",
      instagram:
        "https://www.instagram.com/just.devansh08/profilecard/?igsh=aGttanE5YWw1djRn",
      image: "/assets/Devansh_Sarwadia.jpg",
    },
  ],
  Marketing: [
    {
      name: "Uddhav Gupta",
      role: "Head",
      linkedIn: "https://www.linkedin.com/in/uddhav-gupta-3bb6592b7/",
      instagram: "#",
      image: "/assets/Uddhav_Gupta.jpg",
    },
  ],
  Production: [
    {
      name: "Adarsh Patidar",
      role: "Head",
      linkedIn: "https://www.linkedin.com/in/adarsh-patidar-227803217/",
      instagram:
        "https://www.instagram.com/i_adarsh.patidar?igsh=MzhubTRwdWZ6MTNq",
      image: "/assets/Adarsh_Patidar.jpg",
    },
  ],
  "Video Editor": [
    {
      name: "Meet Yaduwanshi",
      role: "Head",
      linkedIn: "https://www.linkedin.com/in/meet-yaduwanshi-9639462b2/",
      instagram:
        "https://www.instagram.com/_meet18_/profilecard/?igsh=M3lqOThwM21yMjE=",
      image: "/assets/Meet_yaduwanshi.jpg",
    },
  ],
};

const members = {
  Creative: [
    {
      name: "Deependra Ruhela",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/deependra-ruhela26",
      instagram: "#",
      image: "/assets/Deependra_Ruhela.jpg",
    },
  ],
  Curation: [
    {
      name: "Paridhi Mandloi",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/paridhi029",
      instagram: "www.instagram.com/paridhi_029",
      image: "/assets/Paridhi_Mandloi.jpg",
    },
    {
      name: "Vaidehi Vamnya",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/vaidehi-vamnya-1b2696325/",
      instagram:
        "https://www.instagram.com/vaidehi_vamnya?igsh=MWw3MW9mdWdwOXdpYQ==",
      image: "/assets/Vaidehi_Vamnya.jpg",
    },
    {
      name: "Anushka Yadav",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/anushka-yadav-1aa3a8341",
      instagram:
        "https://www.instagram.com/_anushkaz?igsh=MWo0OWE5amxiZHhvdw==",
      image: "/assets/Anushka_Yadav.jpg",
    },
    {
      name: "Somya Kinker",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/somya-kinker-164104256/",
      instagram: "https://www.instagram.com/somya._28_?igsh=ZzZpcHp6NXE3Z3p6",
      image: "/assets/Somya_Kinker.jpg",
    },
    {
      name: "Devansh Verma",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/devansh-verma-829897263",
      instagram: "https://instagram.com/shinshhuuu",
      image: "/assets/Devansh_Verma.png",
    },
    {
      name: "Anmol Kushwah",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/anmol-kushwah19/",
      instagram:
        "https://www.instagram.com/anmol_kushwah01/profilecard/?igsh=cmJpendkcmM5ZDA2",
      image: "/assets/Anmol_Kushwah.jpg",
    },
  ],
  Decoration: [
    {
      name: "Keshav Parasha",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/keshav-parashar-21a040341/",
      instagram:
        "https://www.instagram.com/invites/contact/?igsh=uo4ay0v2ewek&utm_content=nqxonxj",
      image: "/assets/Keshav_Parasha.jpg",
    },
  ],
  Hospitality: [
    {
      name: "ANUSHKA PATHAK",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/anushka-pathak-1a9169342",
      instagram:
        "https://www.instagram.com/hie._.anushka?igsh=MW1kanQ3dXh3anlmeg==",
      image: "/assets/ANUSHKA_PATHAK.jpg",
    },
    {
      name: "Rishabh Pandey",
      role: "Team Member",
      linkedIn:
        "https://www.linkedin.com/in/rishabh-pandey-34000b244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      instagram:
        "https://www.instagram.com/rishabhax/profilecard/?igsh=NnM5eHhmazdmaW9i",
      image: "/assets/Rishabh_Pandey.jpeg",
    },
    {
      name: "SONALI SINGH",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/sonali-singh2003/",
      instagram:
        "https://www.instagram.com/_sonrisaaa_1?igsh=MXByajloMGJrZmcwdA==",
      image: "/assets/SONALI_SINGH.jpg",
    },
  ],
  Logistics: [
    {
      name: "Krishna Tirole",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/krishna-tirole-48795332a/",
      instagram: "___krishna_____tirole",
      image: "/assets/Krishna_Tirole.jpg",
    },
  ],
  Marketing: [
    {
      name: "Gourav Mishra",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/gmishr56",
      instagram:
        "https://www.instagram.com/__mishrax__/profilecard/?igsh=MWU3ODZlNnVoYWQzMQ==",
      image: "/assets/Gourav_Mishra.jpg",
    },
    {
      name: "Ashley Mathias",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/ashley-mathias-7a5777316",
      instagram: "https://www.instagram.com/ashleymathias__/?hl=en",
      image: "/assets/Ashley_Mathias.jpg",
    },
    {
      name: "Jayesh Birla",
      role: "Team Member",
      linkedIn:
        "https://www.linkedin.com/in/jayeshbirla49?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      instagram:
        "https://www.instagram.com/its_jayesh_x/profilecard/?igsh=MWs4MDBkdWhueXJhOQ==",
      image: "/assets/Jayesh_Birla.jpeg",
    },
  ],
  "video Editor": [
    {
      name: "krishna yadav",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/krishna-yadav-bb3a57174/",
      instagram:
        "https://www.instagram.com/alliance__yt/profilecard/?igsh=anI0cjhxd3R4dWxp",
      image: "/assets/krishna_yadav.jpg",
    },
    {
      name: "Tanishq Thakur",
      role: "Team Member",
      linkedIn: "https://www.linkedin.com/in/tanishq-thakur-7ba74623b/",
      instagram:
        "https://www.instagram.com/tanishq.thakur.5/profilecard/?igsh=MW42ZmloZ292enNnOQ==",
      image: "/assets/Tanishq_Thakur.png",
    },
  ],
};


const MemberCard = ({ member }) => (
  <div className="bg-white/[0.03] backdrop-blur-lg rounded-xl p-5 transition-all duration-500 border border-white/10 hover:border-red-600 hover:-translate-y-1 hover:bg-white/[0.05] group">
    <div className="overflow-hidden rounded-xl mb-5">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-60 object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
    <h4 className="text-xl font-semibold text-white mb-2">{member.name}</h4>
    <p className="text-red-400/90 text-base font-medium mb-4">{member.role}</p>
    <div className="flex gap-4 pt-3 border-t border-white/10">
      {member.linkedIn !== "#" && (
        <a 
          href={member.linkedIn} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white/70 text-sm font-medium px-3 py-1.5 rounded-full bg-white/5 hover:bg-gradient-to-r from-red-600 to-red-400 hover:text-white transition-all duration-300"
        >
          <FaLinkedinIn className="w-4 h-4" />
        </a>
      )}
      {member.instagram !== "#" && (
        <a 
          href={member.instagram} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white/70 text-sm font-medium px-3 py-1.5 rounded-full bg-white/5 hover:bg-gradient-to-r from-red-600 to-red-400 hover:text-white transition-all duration-300"
        >
          <FaInstagram className="w-4 h-4" />
        </a>
      )}
    </div>
  </div>
);

const TeamPage = () => {
  const sortedDepartments = Object.keys(heads).sort();

  return (
    <div className="min-h-screen bg-black">
      <div className="relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-[50%] left-[50%] w-[500px] h-[500px] bg-red-400/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="max-w-[1400px] mx-auto px-4 md:px-10 pt-32 pb-16">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              TEAM
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 max-w-3xl">
              The faces behind TEDxCuneo
            </h2>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              We are over 50 volunteers with different ages and experiences, and a strong bond with Cuneo.
              We want to spread new ideas, foster relationships and opportunities.
            </p>
          </div>

          {/* Teams Section */}
          <div className="max-w-[1400px] mx-auto px-4 md:px-10 pb-24">
            {sortedDepartments.map((department, index) => (
              <div 
                key={department} 
                className="mb-20 opacity-0 animate-[fadeIn_0.6s_ease_forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent inline-block">
                  {department} Team
                </h3>

                {/* Department Head */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  {heads[department].map((head) => (
                    <MemberCard key={head.name} member={head} />
                  ))}
                </div>

                {/* Team Members */}
                {members[department] && members[department].length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {members[department].map((member) => (
                      <MemberCard key={member.name} member={member} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;