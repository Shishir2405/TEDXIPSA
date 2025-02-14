import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import LoadingAnimation from "../ui/Loading";

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
      {member.linkedIn && member.linkedIn !== "#" && (
        <a
          href={member.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 text-sm font-medium px-3 py-1.5 rounded-full bg-white/5 hover:bg-gradient-to-r from-red-600 to-red-400 hover:text-white transition-all duration-300"
        >
          <FaLinkedinIn className="w-4 h-4" />
        </a>
      )}
      {member.instagram && member.instagram !== "#" && (
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

const OldTeam = () => {
  const [departments, setDepartments] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      // Fetch departments
      const deptRef = collection(db, "olddepartments");
      const deptQuery = query(deptRef, orderBy("order", "asc"));
      const deptSnapshot = await getDocs(deptQuery);
      const deptData = deptSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDepartments(deptData);

      // Fetch members
      const membersRef = collection(db, "oldteam");
      const membersQuery = query(membersRef, orderBy("order", "asc"));
      const membersSnapshot = await getDocs(membersQuery);
      const membersData = membersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(membersData);
    } catch (err) {
      setError("Failed to load team data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

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
              The faces behind TEDxIPSA
            </h2>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Our team of dedicated volunteers brings diverse experiences and
              perspectives to create inspiring TEDx events.
            </p>
          </div>

          {/* Teams Section */}
          <div className="max-w-[1400px] mx-auto px-4 md:px-10 pb-24">
            {departments.map((department, index) => {
              const deptMembers = members.filter(
                (m) => m.department === department.id
              );
              const heads = deptMembers.filter((m) => m.isHead);
              const teamMembers = deptMembers.filter((m) => !m.isHead);

              if (deptMembers.length === 0) return null;

              return (
                <div
                  key={department.id}
                  className="mb-20 opacity-0 animate-[fadeIn_0.6s_ease_forwards]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent inline-block">
                    {department.name} 
                  </h3>

                  {/* Department Heads */}
                  {heads.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                      {heads.map((head) => (
                        <MemberCard key={head.id} member={head} />
                      ))}
                    </div>
                  )}

                  {/* Team Members */}
                  {teamMembers.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {teamMembers.map((member) => (
                        <MemberCard key={member.id} member={member} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldTeam;
