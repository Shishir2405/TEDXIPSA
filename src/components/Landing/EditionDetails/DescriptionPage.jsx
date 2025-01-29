import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import LoadingAnimation from "../../ui/Loading";

const DescriptionPage = () => {
  const navigate = useNavigate();
  const { editionId } = useParams();
  const [editionData, setEditionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEditionData();
  }, [editionId]);

  const fetchEditionData = async () => {
    try {
      const descriptionRef = collection(db, "editionDescriptions");
      const q = query(descriptionRef, where("editionId", "==", editionId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setEditionData({
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data(),
        });
      } else {
        setError("Edition description not found");
      }
    } catch (err) {
      setError("Failed to load edition data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  if (error || !editionData) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error || "Edition not found"}</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-8 py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/editions")}
          className="group inline-flex items-center text-white mb-8"
        >
          <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          <span className="relative">
            List of editions
            <span className="absolute -bottom-px left-0 w-full h-[1px] bg-red-600" />
          </span>
        </button>

        {/* Header Section */}
        <div className="mb-12">
          <p className="text-gray-400 text-lg md:text-xl mb-4">
            {editionData.date}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {editionData.title}
          </h1>
        </div>

        {/* Main Image */}
        <div className="mb-16 p-4 md:p-6">
          <img
            src={editionData.mainImage}
            alt="Event"
            className="w-full h-[400px] md:h-[600px] object-cover rounded-3xl"
          />
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Seek beyond the obvious
            </h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              {editionData.seekDescription}
            </p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              What we think?
            </h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              {editionData.thoughtsDescription}
            </p>
          </div>
        </div>

        {/* Video Section */}
        {editionData.videoUrl && (
          <div className="mb-16">
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                title="Event Video"
                src={editionData.videoUrl}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Ways to Watch */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            3 ways to watch the event
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Widespread events", "In Streaming Online", "Main Event"].map(
              (way, index) => (
                <div key={index} className="group">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{way}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Join us at various locations to experience the event with
                    others.
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Speakers Section */}
        {editionData.speakers && editionData.speakers.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Speakers on stage
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-8">
              Meet the incredible speakers who shared their inspiring stories
              and groundbreaking ideas.
            </p>

            {/* Speakers Cards */}
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
              {editionData.speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="min-w-[300px] bg-zinc-900 rounded-xl overflow-hidden snap-start group"
                >
                  {/* Image Container */}
                  <div className="relative h-[240px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-red-600/20 opacity-70" />
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-gray-400 text-sm mb-2">
                      {speaker.name}
                    </h3>
                    <p className="text-white text-xl font-bold mb-6">
                      {speaker.title}
                    </p>
                    <a
                      href={speaker.link}
                      className="group/link inline-flex items-center text-white relative"
                    >
                      Watch the Talk
                      <span className="ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1">
                        →
                      </span>
                      <span className="absolute -bottom-px left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover/link:w-full" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Section */}
        {editionData.team && editionData.team.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Edition Team
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-8">
              Meet the dedicated team that made this edition possible.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {editionData.team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white/[0.03] backdrop-blur-lg rounded-xl p-5 transition-all duration-500 border border-white/10 hover:border-red-600 hover:-translate-y-1 hover:bg-white/[0.05] group"
                >
                  <div className="overflow-hidden rounded-xl mb-5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-60 object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {member.name}
                  </h4>
                  <p className="text-red-400/90 text-base font-medium mb-4">
                    {member.role}
                  </p>
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionPage;
