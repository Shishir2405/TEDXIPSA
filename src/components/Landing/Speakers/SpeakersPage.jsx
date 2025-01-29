import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Play, ArrowRight, X, Clock, Calendar, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const SpeakersPage = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  useEffect(() => {
    fetchSpeakers();
  }, []);

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

  const SpeakerOverlay = ({ speaker, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
      />

      {/* Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="relative w-full max-w-6xl bg-zinc-900/80 rounded-2xl overflow-hidden"
      >
        <div className="relative h-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-red-600 
                     text-white transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/2 relative overflow-hidden">
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-black/50" />
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
              <div className="mb-8">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl lg:text-4xl font-bold text-white mb-4"
                >
                  {speaker.name}
                </motion.h2>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl lg:text-2xl text-red-500 mb-6"
                >
                  {speaker.title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-300 text-lg leading-relaxed"
                >
                  {speaker.description || "Description coming soon..."}
                </motion.p>
              </div>

              {/* Details */}
              <div className="space-y-6 mb-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <Calendar className="w-5 h-5 text-red-500" />
                  <span className="text-gray-300">{speaker.date || "Event date coming soon"}</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-4"
                >
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className="text-gray-300">{speaker.time || "Time to be announced"}</span>
                </motion.div>
              </div>

              {/* Watch Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-auto"
              >
                <a
                  href={speaker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white 
                           px-6 py-3 rounded-lg transition-colors duration-300"
                >
                  <Play className="w-5 h-5" />
                  Watch Talk
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce" />
          <div className="w-3 h-3 rounded-full bg-red-600 animate-bounce [animation-delay:-.3s]" />
          <div className="w-3 h-3 rounded-full bg-red-700 animate-bounce [animation-delay:-.5s]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-[50%] left-[50%] w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Our Speakers
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet the innovative minds and inspiring voices that bring
            transformative ideas to our stage.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedSpeaker(speaker)}
            >
              <div className="relative h-[400px] rounded-xl overflow-hidden transform transition-all duration-500 
                            group-hover:scale-[1.02] bg-zinc-900 border border-zinc-800 
                            group-hover:border-red-500/50">
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black 
                                opacity-70 z-10 transition-opacity duration-300 group-hover:opacity-90" />
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover transition-all duration-700 
                             group-hover:scale-110 group-hover:rotate-1"
                  />
                </div>

                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                  <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-xl font-bold mb-2">{speaker.name}</h3>
                    <p className="text-gray-300 text-base mb-4 opacity-0 transform translate-y-4 
                                transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      {speaker.title}
                    </p>

                    <div className="inline-flex items-center gap-2 text-red-500 opacity-0 transform translate-y-4 
                                  transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <Play className="w-4 h-4" />
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transform transition-all duration-300 
                                         group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Speaker Overlay */}
      <AnimatePresence>
        {selectedSpeaker && (
          <SpeakerOverlay
            speaker={selectedSpeaker}
            onClose={() => setSelectedSpeaker(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpeakersPage;