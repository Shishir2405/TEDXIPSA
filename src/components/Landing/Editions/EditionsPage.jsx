import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../config/firebase";
import LoadingAnimation from "../../ui/Loading";

const EditionsPage = () => {
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEditions();
  }, []);

  const fetchEditions = async () => {
    try {
      const editionsRef = collection(db, "editions");
      const q = query(editionsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const editionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEditions(editionsData);
    } catch (err) {
      setError("Failed to load editions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditionClick = (editionId) => {
    navigate(`/editions/${editionId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-24 pb-12">
        <h2 className="text-gray-400 text-sm md:text-base uppercase tracking-wider mb-4">
          TEDxIPSA EVENTS
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">Editions</h1>
      </div>

      {/* Cards Container */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 space-y-8">
        {editions.map((edition) => (
          <div
            key={edition.id}
            className="group relative bg-zinc-900 rounded-xl overflow-hidden cursor-pointer"
            onClick={() => handleEditionClick(edition.id)}
          >
            <div className="flex flex-col lg:flex-row h-full">
              {/* Image Section */}
              <div className="w-full lg:w-[40%] relative overflow-hidden p-6 md:p-8">
                <div className="aspect-[4/3] lg:aspect-auto lg:h-full rounded-lg overflow-hidden">
                  <div
                    className={`absolute inset-0 ${edition.gradient} opacity-70`}
                  />
                  <img
                    src={edition.image}
                    alt={edition.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 md:p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <p className="text-gray-400 text-lg md:text-xl lg:text-2xl mb-4">
                    {edition.date}
                  </p>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    {edition.title}
                  </h3>
                  <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed mb-8">
                    {edition.description}
                  </p>
                </div>

                {/* Link with sliding underline effect */}
                <div className="inline-flex items-center text-white relative self-end group/link">
                  <span className="text-lg">Relive the event</span>
                  <span className="ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1">
                    →
                  </span>
                  <span className="absolute -bottom-px left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover/link:w-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditionsPage;
