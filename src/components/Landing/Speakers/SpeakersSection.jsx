import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../config/firebase";

const SpeakersSection = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    fetchSpeakers();
  }, []);

  useEffect(() => {
    if (speakers.length > 3) {
      const scrollAnimation = async () => {
        if (!isHovering) {
          await controls.start({
            x: "-50%",
            transition: {
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          });
        } else {
          controls.stop();
        }
      };
      scrollAnimation();
    }
  }, [speakers, isHovering, controls]);

  const fetchSpeakers = async () => {
    try {
      const speakersRef = collection(db, "speakers");
      const q = query(speakersRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const speakersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSpeakers(speakersData);
    } catch (err) {
      setError("Failed to load speakers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black px-4 md:px-8 py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center text-white py-20">
            Loading speakers...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black px-4 md:px-8 py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center text-red-500 py-20">{error}</div>
        </div>
      </div>
    );
  }

  if (speakers.length === 0) {
    return null; // Hide the section when no speakers are available
  }

  return (
    <div className="bg-black px-4 md:px-8 py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold">
            Talk from the latest edition
          </h2>
          <a
            href="/speakers"
            className="group inline-flex items-center text-white text-base relative"
          >
            Discover them all
            <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
            <span className="absolute bottom-0 left-0 h-[1px] bg-red-600 w-0 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Continuous Scroll Container */}
        <div
          className="overflow-hidden relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div animate={controls} className="flex gap-4 inline-flex">
            {/* Duplicate speakers to create seamless scroll */}
            {[...speakers, ...speakers].map((speaker, index) => (
              <div
                key={`${speaker.id}-${index}`}
                className="min-w-[300px] md:min-w-[320px] bg-zinc-900 rounded-lg overflow-hidden snap-start group h-[520px]"
              >
                {/* Background Image Container */}
                <div className="relative h-[400px] overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${speaker.gradient} opacity-70`}
                  />
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4 relative h-[120px]">
                  <h3 className="text-gray-400 text-sm mb-2">{speaker.name}</h3>
                  <p className="text-white text-lg font-bold leading-tight">
                    {speaker.title}
                  </p>
                  <a
                    href={`/talk/${speaker.id}`}
                    className="group inline-flex items-center text-white text-sm absolute bottom-4 right-4"
                  >
                    Watch the talk
                    <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                    <span className="absolute -bottom-px left-0 h-[1px] bg-red-600 w-0 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SpeakersSection;
