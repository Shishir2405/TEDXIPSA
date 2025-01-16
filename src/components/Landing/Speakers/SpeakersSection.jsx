import React, { useRef } from 'react';

const speakers = [
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5sFjZPx1Yzi1b9_FpQzrxqgsjv2DPAp81Q&s',
    name: 'Michael Half',
    title: ' The Mediamorphosis of Journalism',
    gradient: 'from-red-500/20 to-purple-500/20'
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5sFjZPx1Yzi1b9_FpQzrxqgsjv2DPAp81Q&s',
    name: 'Francesca Picci',
    title: "Nemo's Garden: What's Boiling in the Sea?",
    gradient: 'from-blue-500/20 to-purple-600/20'
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5sFjZPx1Yzi1b9_FpQzrxqgsjv2DPAp81Q&s',
    name: 'Daniel Raineri',
    title: 'The Shrinking World',
    gradient: 'from-red-600/20 to-purple-500/20'
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5sFjZPx1Yzi1b9_FpQzrxqgsjv2DPAp81Q&s',
    name: 'Fiamma and Giuppy Izzo',
    title: 'Dubbing: The Emotional Chameleon',
    gradient: 'from-blue-400/20 to-purple-600/20'
  }
];

const SpeakersSection = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction * 350,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-black px-4 md:px-8 py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold">
            Talk from the latest edition
          </h2>
          <a href="#" className="group inline-flex items-center text-white text-base relative">
            Discover them all
            <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
            <span className="absolute bottom-0 left-0 h-[1px] bg-red-600 w-0 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Cards Container */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {speakers.map((speaker, index) => (
              <div 
                key={index}
                className="min-w-[300px] md:min-w-[320px] bg-zinc-900 rounded-lg overflow-hidden snap-start group h-[520px]"
              >
                {/* Background Image Container */}
                <div className="relative h-[400px] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${speaker.gradient} opacity-70`} />
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
                    href="#" 
                    className="group inline-flex items-center text-white text-sm absolute bottom-4 right-4"
                  >
                    Watch the talk
                    <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                    <span className="absolute -bottom-px left-0 h-[1px] bg-red-600 w-0 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
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
        </div>
      </div>
    </div>
  );
};

export default SpeakersSection;