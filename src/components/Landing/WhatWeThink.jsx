import React from 'react';

const HalfEarthOrbitSystem = () => {
  return (
    <div className="bg-black px-6 md:px-12 py-16 font-sans">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative">
          {/* Orbit System */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-56 w-80 h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem]">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 transform-gpu"
                    style={{
                     transform: 'rotateX(65deg) rotateY(-25deg)',
                     transformStyle: 'preserve-3d'
                    }}>
                {/* Orbit Ring */}
                <div className="absolute top-1/2 left-1/2 w-full h-full -mt-40 -ml-40 md:-mt-48 md:-ml-48 lg:-mt-64 lg:-ml-64 rounded-full border border-white/60 shadow-[0_0_5px_rgba(255,255,255,0.3),0_0_10px_rgba(255,255,255,0.2),inset_0_0_5px_rgba(255,255,255,0.3),inset_0_0_10px_rgba(255,255,255,0.2)]"
                     style={{
                       animation: 'orbit 10s linear infinite',
                       transformStyle: 'preserve-3d'
                     }}>
                  {/* Satellite */}
                  <div className="absolute top-full w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 -mt-4 -ml-4 md:-mt-6 md:-ml-6 lg:-mt-8 lg:-ml-8"
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
                <div className="absolute top-1/2 left-1/2 w-48 h-48 md:w-60 md:h-60 lg:w-80 lg:h-80  -ml-24  md:-ml-32 lg:-mt-24 lg:-ml-40"
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
          <div className="bg-zinc-900 rounded-lg overflow-hidden mt-32 md:mt-40 lg:mt-48">
            <div className="flex flex-col lg:flex-row">
              {/* Text Content */}
              <div className="w-full lg:w-3/5 p-8 lg:p-12">
                <h2 className="text-gray-400 text-lg uppercase tracking-wider mb-4">
                  TEDxCUNEO THOUGHTS
                </h2>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                  <span className="text-white">WHAT </span>
                  <span className="text-red-600">WE THINK?</span>
                </h1>
                
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare
                    bibendum sodales. Mauris posuere, sapien ac eleifend finibus.
                  </p>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                    Nulla non molestie est, a feugiat lacus. Donec lacinia varius odio,
                    quis ornare ex varius at. Donec a lectus iaculis.
                  </p>
                </div>
                
                <div className="mt-12">
                  <button className="relative text-white text-lg inline-flex items-center group">
                    <span className="inline-flex items-center">
                      Read More
                      <span className="ml-2">→</span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
                  </button>
                </div>
              </div>

              {/* Image Section */}
              <div className="w-full lg:w-2/5 p-8 lg:p-12 flex items-center">
                <div className="relative rounded-lg">
                  <img
                    src="/Aside.png"
                    alt="What We Think"
                    className="w-full h-[300px] lg:h-[400px] object-cover rounded-lg"
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