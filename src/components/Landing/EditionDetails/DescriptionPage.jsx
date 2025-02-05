import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MoveLeft, Users } from "lucide-react";
import LoadingAnimation from "../../ui/Loading";
import { Link } from "react-router-dom";

const DescriptionPage = () => {
  const navigate = useNavigate();
  const { editionId } = useParams();
  const [editionData, setEditionData] = useState(null);
  const [oldTeamData, setOldTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateElements] = useState(["2", "0", "2", "4"]);
  const [animatedIndices, setAnimatedIndices] = useState([]);

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchEditionData();
  }, [editionId]);

  useEffect(() => {
    // Date animation effect
    const interval = setInterval(() => {
      setAnimatedIndices((prev) => {
        const next = [...prev];
        if (next.length < 4) {
          next.push(next.length);
        } else {
          next.length = 0;
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchEditionData = async () => {
    try {
      setLoading(true);
      // Fetch edition description
      const descriptionRef = collection(db, "editionDescriptions");
      const q = query(descriptionRef, where("editionId", "==", editionId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const data = {
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data(),
        };
        setEditionData(data);

        // If it's an old event, fetch old team data
        if (isOldEvent(data.date)) {
          await fetchOldTeamData();
        }
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

  const fetchOldTeamData = async () => {
    try {
      const oldTeamRef = collection(db, "oldTeam");
      const q = query(oldTeamRef, where("editionId", "==", editionId));
      const querySnapshot = await getDocs(q);

      const oldTeamData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOldTeamData(oldTeamData);
    } catch (err) {
      console.error("Failed to fetch old team data:", err);
    }
  };

  const isOldEvent = (date) => {
    if (!date) return false;
    const eventDate = new Date(date);
    const currentDate = new Date();
    return eventDate < currentDate;
  };

  const renderTeamMember = (member, index) => (
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
      <h4 className="text-xl font-semibold text-white mb-2">{member.name}</h4>
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
  );

  const renderDateAnimation = () => (
    <div className="flex justify-center items-center gap-4 my-8">
      {dateElements.map((num, index) => (
        <div
          key={index}
          className={`w-16 h-16 flex items-center justify-center text-3xl font-bold rounded-lg border-2 
            ${
              animatedIndices.includes(index)
                ? "border-red-600 text-red-600 scale-110 bg-white/5"
                : "border-white/20 text-white/70"
            } 
            transition-all duration-500`}
        >
          {num}
        </div>
      ))}
    </div>
  );

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

  const TeamViewButton = ({ teamLink }) => {
    const [dots, setDots] = useState("");

    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prev) => {
          if (prev.length >= 3) return "";
          return prev + ".";
        });
      }, 500);

      return () => clearInterval(interval);
    }, []);

    if (!teamLink) return null;

    return (
      <div className="mb-16 space-y-8 text-left">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          Meet Our Team{dots}
        </h2>

        <Link
          to={teamLink}
          className="inline-flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-lg border border-white/10 hover:border-red-500 transition-all duration-300"
        >
          <Users className="h-5 w-5 text-red-500" />
          <span className="font-medium text-white">View Full Team</span>
        </Link>
      </div>
    );
  };

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-8 py-12 pt-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/edition")}
          className="group inline-flex items-center text-white mb-8"
        >
          <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-1">
            <MoveLeft />
          </span>
          <span className="relative font-semibold">
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
          <div className="w-full h-[400px] md:h-[600px] bg-zinc-900/50 rounded-3xl">
            <img
              src={editionData.mainImage}
              alt="Event"
              className="w-full h-full object-contain rounded-3xl"
            />
          </div>
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

            <div className="relative">
              {/* Speakers Cards */}
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-hidden pb-8 snap-x snap-mandatory"
              >
                {editionData.speakers.map((speaker, index) => (
                  <div
                    key={index}
                    className="min-w-[300px] flex-none bg-zinc-900 rounded-xl overflow-hidden snap-start group"
                  >
                    <div className="relative h-[240px] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-red-600/20 opacity-70" />
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
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

              {/* Navigation Buttons */}
              {editionData.speakers.length > 3 && (
                <div className="flex justify-center gap-3 mt-6">
                  <button
                    onClick={() => scroll(-1)}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white text-sm hover:bg-white/10 transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => scroll(1)}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white text-sm hover:bg-white/10 transition-colors"
                  >
                    →
                  </button>
                </div>
              )}
            </div>

            <TeamViewButton teamLink={editionData.teamLink} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionPage;
