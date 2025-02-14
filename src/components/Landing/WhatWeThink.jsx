import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";

const HalfEarthOrbitSystem = () => {
  const [content, setContent] = useState({
    title: "",
    subtitle: "",
    paragraphs: [],
    buttonText: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const cardContentRef = collection(db, "cardContent");
        const q = query(cardContentRef, where("type", "==", "tedxThoughts"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setContent({
            title: data.title || "",
            subtitle: data.subtitle || "",
            paragraphs: data.paragraphs || [],
            buttonText: data.buttonText || "",
            imageUrl: data.imageUrl || "",
          });
        }
      } catch (err) {
        setError("Failed to load content");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="bg-black px-4 sm:px-6 md:px-8 py-8  font-sans">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative">
          {/* Arc from left top to right */}

          {/* Orbit System */}
          <div className="w-full h-96 sm:h-[28rem] md:h-[32rem] lg:h-[36rem]">
            <div
              className="relative w-full h-full overflow-hidden "
              style={{
                clipPath: "inset(0 0 10% 0)",
              }}
            >
              {/* Static Image (Second Image) */}
              <img
                src="/Planet/k/2.jpg"
                alt="Static Half Earth"
                className="absolute top-0 left-0 w-full h-full object-contain lg:object-fill"
              />

              <div
                className="absolute top-[60%]  w-full h-full"
                style={{
                  animation: "orbit 15s linear infinite",
                  transformOrigin: "center center",
                  clipPath: "inset(0 0 10% 0)",
                }}
              >
                <img
                  src="/Planet/k/2.png"
                  alt="Orbiting Image"
                  className="absolute w-12 md:w-32 h-12 md:h-32 object-cover"
                  style={{}}
                />
              </div>
            </div>
          </div>

          {/* What We Think Content Card */}
          <div className="bg-zinc-900 rounded-lg overflow-hidden -mt-12 ">
            <div className="flex flex-col lg:flex-row">
              {/* Text Content */}
              <div className="w-full lg:w-3/5 p-6 sm:p-8 lg:p-10">
                <h2 className="text-gray-400 text-base sm:text-lg uppercase tracking-wider mb-3 sm:mb-4">
                  {content.subtitle}
                </h2>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
                  {content.title.split(" ").map((word, index) => (
                    <span
                      key={index}
                      className={index === 1 ? "text-red-600" : "text-white"}
                    >
                      {word}{" "}
                    </span>
                  ))}
                </h1>

                <div className="space-y-4 sm:space-y-6">
                  {content.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 sm:mt-10">
                  <Link to="/editions/F6WF02rORoGFy0G9FNdO">
                    {" "}
                    <button className="relative text-white text-base sm:text-lg inline-flex items-center group">
                      <span className="inline-flex items-center">
                        {content.buttonText}
                        <span className="ml-2">→</span>
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Image Section */}
              <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:p-10 flex items-center">
                <div className="relative rounded-lg">
                  <img
                    src={content.imageUrl}
                    alt="What We Think"
                    className="w-full h-[250px] sm:h-[275px] md:h-[300px] lg:h-[350px] object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotateZ(0deg);
          }
          to {
            transform: rotateZ(360deg);
          }
        }

        @keyframes invertOrbit {
          from {
            transform: rotateZ(360deg) rotateY(30deg) rotateX(-75deg);
          }
          to {
            transform: rotateZ(0deg) rotateY(30deg) rotateX(-75deg);
          }
        }
      `}</style>
    </div>
  );
};

export default HalfEarthOrbitSystem;
