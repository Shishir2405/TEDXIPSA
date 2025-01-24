import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

const HalfEarthOrbitSystem = () => {
  const [content, setContent] = useState({
    title: '',
    subtitle: '',
    paragraphs: [],
    buttonText: '',
    imageUrl: ''
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
            title: data.title || '',
            subtitle: data.subtitle || '',
            paragraphs: data.paragraphs || [],
            buttonText: data.buttonText || '',
            imageUrl: data.imageUrl || ''
          });
        }
      } catch (err) {
        setError('Failed to load content');
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
    <div className="bg-black px-4 sm:px-6 md:px-8 py-8 sm:py-12 font-sans">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative">
          {/* Orbit System */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-32 sm:-top-40 md:-top-48 w-full h-96 sm:h-[28rem] md:h-[32rem] lg:h-[36rem]">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 transform-gpu"
                   style={{
                     transform: 'rotateX(65deg) rotateY(-25deg)',
                     transformStyle: 'preserve-3d'
                   }}>
                {/* Orbit Ring */}
                <div className="absolute top-1/2 left-1/2 w-full h-full -mt-48 -ml-48 sm:-mt-56 sm:-ml-56 md:-mt-64 md:-ml-64 lg:-mt-72 lg:-ml-72 rounded-full"
                     style={{
                       animation: 'orbit 10s linear infinite',
                       transformStyle: 'preserve-3d'
                     }}>
                  {/* Satellite */}
                  <div className="absolute top-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 -mt-4 -ml-4 sm:-mt-5 sm:-ml-5 md:-mt-6 md:-ml-6 lg:-mt-8 lg:-ml-8"
                       style={{
                         animation: 'invertOrbit 10s linear infinite',
                         transformStyle: 'preserve-3d'
                       }}>
                    <img
                      src="/Planet/k/2.png"
                      alt="Satellite"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Half Earth Container */}
                <div className="absolute top-1/2 left-1/2 w-full h-full -mt-24  sm:-mt-80 sm:-ml-60 md:-mt-64 md:-ml-64 lg:-mt-80 lg:-ml-96"
                     style={{
                       transform: 'rotateY(25deg) rotateX(-65deg)',
                       transformStyle: 'preserve-3d'
                     }}>
                  <div className="relative w-full h-full overflow-hidden"
                       style={{
                         clipPath: 'inset(0 0 50% 0)',
                         borderRadius: '50% 50% 0 0'
                       }}>
                    <img
                      src="/Planet/k/1.png"
                      alt="Half Earth"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What We Think Content Card */}
          <div className="bg-zinc-900 rounded-lg overflow-hidden mt-24 sm:mt-28 md:mt-32">
            <div className="flex flex-col lg:flex-row">
              {/* Text Content */}
              <div className="w-full lg:w-3/5 p-6 sm:p-8 lg:p-10">
                <h2 className="text-gray-400 text-base sm:text-lg uppercase tracking-wider mb-3 sm:mb-4">
                  {content.subtitle}
                </h2>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
                  {content.title.split(' ').map((word, index) => (
                    <span key={index} className={index === 1 ? "text-red-600" : "text-white"}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                
                <div className="space-y-4 sm:space-y-6">
                  {content.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="mt-8 sm:mt-10">
                  <button className="relative text-white text-base sm:text-lg inline-flex items-center group">
                    <span className="inline-flex items-center">
                      {content.buttonText}
                      <span className="ml-2">→</span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
                  </button>
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
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(360deg); }
        }

        @keyframes invertOrbit {
          from { transform: rotateZ(360deg) rotateY(30deg) rotateX(-75deg); }
          to { transform: rotateZ(0deg) rotateY(30deg) rotateX(-75deg); }
        }
      `}</style>
    </div>
  );
};

export default HalfEarthOrbitSystem;