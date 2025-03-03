import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import {
  Play,
  ArrowRight,
  X,
  Clock,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Import the speakers data
const speakersData = [
  {
    id: "ashu-ghai",
    name: "Ashu Ghai",
    title: "Educator & Co-founder of OSR Academy",
    description:
      "Meet Ashu Ghai, an educator who believes learning should never be boring. With a Master's in Physics, he co-founded OSR Academy and built Science and Fun, a YouTube channel that has captivated over 7 million subscribers and garnered 3.7 billion views. Through humor, real-life applications, and engaging experiments, he transforms complicated concepts into simple, entertaining lessons that students actually enjoy. For Ashu, education isn't just about formulas and theories—it's about curiosity, discovery, and making learning an adventure.",
    image: "https://i.ibb.co/DD36mPWV/Screenshot-2025-03-03-at-7-23-15-PM.png",
    order: 1,
    date: "8th March, 2025",
    time: "10:00 AM",
  },
  {
    id: "anand-nahar",
    name: "Anand Nahar",
    title: "Entrepreneur & Co-founder of ZORKO",
    description:
      "Introducing Anand Nahar, a bold entrepreneur and co-founder of ZORKO, one of India's fastest-growing Quick Service Restaurant chains. Starting with just ₹50,000, he transformed a struggling eatery into a thriving franchise with 300+ outlets and ₹66 crore in revenue—all within two years! Beyond the food industry, Anand is also a SEBI-registered Research Analyst and co-founder of Gayatri Research & Investments, proving his expertise extends far beyond business.",
    image: "https://i.ibb.co/kVZQ1FH9/Screenshot-2025-03-03-at-7-23-31-PM.png",
    order: 2,
    date: "8th March, 2025",
    time: "11:30 AM",
  },
  {
    id: "archana-chowdhary",
    name: "Dr. Archana Keerti Chowdhary",
    title: "Principal of IPS Academy, Indore",
    description:
      "Introducing a true leader in education Dr. Archana Keerti Chowdhary, the esteemed Principal of the Institute of Engineering and Science, IPS Academy, Indore. With over 25 years of experience in teaching and research, Dr. Chowdhary has been instrumental in shaping the institute's academic excellence. Since joining IPS Academy in 1999, she has led the institution to remarkable growth, fostering innovation and practical learning. Under her leadership, the institute recently celebrated 25 years of excellence in engineering and science education. Her commitment to excellence continues to elevate IPS Academy as a center of learning and innovation.",
    image: "https://i.ibb.co/f76Dw76/Screenshot-2025-03-03-at-7-23-41-PM.png",
    order: 3,
    date: "8th March, 2025",
    time: "1:00 PM",
  },
  {
    id: "archana-singh",
    name: "Archana Singh",
    title: "Travel Entrepreneur & Founder of Travel See Write",
    description:
      "Meet Archana Singh, a former brand management expert turned travel entrepreneur, and the visionary behind Travel See Write. With 15+ years in marketing, she now explores offbeat destinations, uncovering untold human stories while championing responsible tourism, women's empowerment, and social inclusion. Recognized among India's top travel influencers, her journey has taken her to TEDx, the Adventure Travel World Summit, and even the pages of National Geographic.",
    image: "https://i.ibb.co/9kmy9z9K/Screenshot-2025-03-03-at-7-23-53-PM.png",
    order: 4,
    date: "8th March, 2025",
    time: "2:30 PM",
  },
  {
    id: "tanmay-mandhan",
    name: "Tanmay Mandhan",
    title: "Storyteller & Creative Visionary",
    description:
      "Introducing Tanmay Mandhan, a storyteller, traveler, and creative visionary who transforms ordinary moments into extraordinary narratives. With an eye for detail and a passion for pushing boundaries, his journey is all about blending creativity with authenticity—whether through travel, lifestyle, or artistic expression. Get ready to see the world through a new lens at TEDxIPSA Indore 2025.",
    image: "https://i.ibb.co/0jgK0Z8k/Screenshot-2025-03-03-at-7-24-10-PM.png",
    order: 5,
    date: "8th March, 2025",
    time: "4:00 PM",
  },
  {
    id: "bhavya-gandhi",
    name: "Bhavya Gandhi",
    title: "Actor",
    description:
      "Meet Bhavya Gandhi, a talented actor who has seamlessly transitioned from television to cinema, making a mark in the Gujarati film industry. With a passion for storytelling and a commitment to exploring diverse roles, he continues to push creative boundaries and bring compelling characters to life on screen.",
    image: "https://i.ibb.co/hFJxqg0k/Screenshot-2025-03-03-at-7-24-19-PM.png",
    order: 6,
    date: "8th March, 2025",
    time: "10:00 AM",
  },
  {
    id: "pavitra-somaiya",
    name: "Pavitra Somaiya",
    title: "Psychologist & Foreign Language Trainer",
    description:
      "Introducing Pavitra Somaiya, a Psychologist and Foreign Language Trainer dedicated to enhancing personal and professional development. With experience teaching 100+ students in both private and institutional settings, she has helped individuals refine their communication skills and workplace effectiveness. Holding a Bachelor's in Psychology and a Master's in Counseling & Family Therapy, she brings a deep understanding of human behavior, making her approach to learning both insightful and transformative.",
    image: "https://i.ibb.co/Lzcvyf8q/Screenshot-2025-03-03-at-7-24-27-PM.png",
    order: 7,
    date: "8th March, 2025",
    time: "11:30 AM",
  },
  {
    id: "ipsita-das",
    name: "Ipsita Das",
    title: "TEDx Speaker & Accredited Coach",
    description:
      "Meet Ipsita Das—TEDx Speaker, Accredited Coach (S.Q.A-NABET), and Private Advisor—dedicated to helping individuals unlock their next level. Through her exclusive 1:1 advisory and public speaking programs, she equips aspiring individuals with the tools to communicate with authority, lead with confidence, and navigate challenges with clarity.",
    image: "https://i.ibb.co/CKMSwbHp/Screenshot-2025-03-03-at-7-24-33-PM.png",
    order: 8,
    date: "8th March, 2025",
    time: "1:00 PM",
  },
  {
    id: "shikha-sharma",
    name: "Shikha Sharma",
    title: "3D Rangoli Queen",
    description:
      "Meet Shikha Sharma, the internationally acclaimed 3D Rangoli Queen from Indore. With 11 world records and 80+ national & international awards, she has reimagined the traditional art of rangoli into hyper-realistic 3D experiences. Her YouTube channel boasts over 14 million subscribers, captivating audiences worldwide with her mesmerizing creations. One of her monumental works includes a 12,000 sq. ft. rangoli, crafted using 6 tons of colors to honor inspirational women. Beyond her artistic achievements, Shikha serves as the Brand Ambassador of Swachh Indore, turning art into activism and promoting cleanliness through her vibrant designs.",
    image: "https://i.ibb.co/1fdfhNM4/Screenshot-2025-03-03-at-7-24-38-PM.png",
    order: 9,
    date: "8th March, 2025",
    time: "2:30 PM",
  },
];

const SpeakersPage = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  useEffect(() => {
    fetchSpeakers();
  }, []);

  // Function to add speakers data to Firestore (call this once to populate the database)
  const addSpeakersToFirestore = async () => {
    try {
      for (const speaker of speakersData) {
        // Use setDoc with document ID to ensure we can update or create
        await setDoc(doc(db, "speakers", speaker.id), {
          ...speaker,
          createdAt: new Date(),
        });
      }
      console.log("All speakers added to Firestore successfully");
    } catch (err) {
      console.error("Error adding speakers to Firestore:", err);
    }
  };

  const fetchSpeakers = async () => {
    try {
      const speakersRef = collection(db, "speakers");
      const q = query(speakersRef, orderBy("order", "asc")); // Use order field to sort
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // If no speakers in Firestore, use the local data and populate Firestore
        console.log(
          "No speakers found in Firestore. Using local data and populating database..."
        );
        setSpeakers(speakersData.sort((a, b) => a.order - b.order));

        // Uncomment this line to add speakers to Firestore
        // await addSpeakersToFirestore();
      } else {
        // Use data from Firestore
        const speakersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSpeakers(speakersData);
      }
    } catch (err) {
      setError("Failed to load speakers");
      console.error(err);
      // Fallback to local data if Firestore fails
      setSpeakers(speakersData.sort((a, b) => a.order - b.order));
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
                  <span className="text-gray-300">
                    {speaker.date || "8th March, 2025"}
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-4"
                >
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className="text-gray-300">
                    {speaker.time || "10:00 AM"}
                  </span>
                </motion.div>
              </div>

              {/* Watch Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-auto"
              >
                {speaker.link ? (
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
                ) : (
                  <div
                    className="inline-flex items-center gap-3 bg-gray-700 text-white 
                                px-6 py-3 rounded-lg"
                  >
                    <Clock className="w-5 h-5" />
                    Coming Soon
                  </div>
                )}
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
              <div
                className="relative h-[400px] rounded-xl overflow-hidden transform transition-all duration-500 
                            group-hover:scale-[1.02] bg-zinc-900 border border-zinc-800 
                            group-hover:border-red-500/50"
              >
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black 
                                opacity-70 z-10 transition-opacity duration-300 group-hover:opacity-90"
                  />
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
                    <p
                      className="text-gray-300 text-base mb-4 opacity-0 transform translate-y-4 
                                transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                    >
                      {speaker.title}
                    </p>

                    <div
                      className="inline-flex items-center gap-2 text-red-500 opacity-0 transform translate-y-4 
                                  transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                    >
                      <Play className="w-4 h-4" />
                      <span>Learn More</span>
                      <ArrowRight
                        className="w-4 h-4 transform transition-all duration-300 
                                         group-hover:translate-x-1"
                      />
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
