import React from "react";

const TEDxTicket = () => {
  return (
    <div className="p-8 flex justify-center">
      <div className="flip-card w-96 h-[32rem]">
        <div className="flip-card-inner w-full h-full relative">
          {/* Front face */}
          <div className="flip-card-front w-full h-full absolute bg-black p-8 border border-white rounded-lg">
            <div className="text-red-600 text-3xl font-bold">TEDx</div>
            <div className="text-white text-2xl font-light">IPSA</div>
            
            <div className="text-gray-400 text-sm mt-2">
              x = Independently organised TED event
            </div>
            
            <div className="mt-32">
              <h2 className="text-white text-4xl font-bold">Rahul</h2>
              <h2 className="text-white text-4xl font-bold">Sharma</h2>
            </div>
            
            <div className="mt-12">
              <div className="text-red-600 uppercase text-sm font-medium">
                Media Team
              </div>
              <div className="text-white text-lg">Graphic Designer</div>
            </div>
            
            <div className="absolute bottom-8 right-8 left-8">
              <div className="text-white text-xl font-bold">VOLUNTEER</div>
              <div className="w-full h-0.5 bg-gray-700 mt-2"></div>
            </div>
            
            {/* Simple X Design */}
            <div className="absolute right-8 bottom-32">
              <div className="relative w-24 h-24">
                <div className="absolute w-24 h-3 bg-red-600 top-1/2 -mt-1.5 transform -rotate-45"></div>
                <div className="absolute w-24 h-3 bg-red-600 top-1/2 -mt-1.5 transform rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Back face */}
          <div className="flip-card-back w-full h-full absolute bg-black p-8 border border-white rounded-lg">
            <div className="flex flex-col items-center justify-center h-full text-white">
              <div className="text-red-600 text-3xl font-bold mb-8">
                TEDxIPSA
              </div>
              
              <div className="text-center mb-8">
                <div className="text-2xl font-bold mb-2">Event Details</div>
                <div className="text-xl mb-4">January 15, 2025</div>
                <div className="text-xl mb-4">10:00 AM - 5:00 PM</div>
                <div className="text-xl">IPSA Auditorium</div>
              </div>

              <div className="text-center mt-8">
                <div className="text-lg mb-2">Venue</div>
                <div className="text-base">IPSA Main Campus</div>
                <div className="text-base">Rajasthan, India</div>
              </div>

              <div className="mt-12 text-red-600">Ideas Worth Spreading</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .flip-card {
          perspective: 1000px;
          cursor: pointer;
        }

        .flip-card-inner {
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default TEDxTicket;