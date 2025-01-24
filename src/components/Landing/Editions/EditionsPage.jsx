import React from 'react';
import { Link } from 'react-router-dom';

const editions = [
  {
    date: 'May 4, 2024',
    title: 'Seek',
    description: `Our theme being simple yet powerful: "Seek", is an open invitation to dive deep into the joy of discovery, ask the kind of questions that make you think, and wander into unexplored territories of the mind. With TEDxIPSA, we've created a space where ideas flow freely, inspiring both speakers and attendees to embrace the thrill of seeking knowledge and letting ideas transform us.`,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHhTODHGKBPA0P-Dmdn9uDUGzLRzpfDPGmbA&s",
    gradient: 'bg-gradient-to-br from-purple-600/20 to-red-600/20',
  },
  // {
  //   date: 'April 15, 2023',
  //   title: 'Innovation Through Connection',
  //   description: 'Exploring the intersections of technology, creativity, and human connection in an increasingly digital world. Understanding how networks shape our future and drive progress through collaborative innovation.',
  //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHhTODHGKBPA0P-Dmdn9uDUGzLRzpfDPGmbA&s",
  //   gradient: 'bg-gradient-to-br from-blue-600/20 to-purple-600/20',
  // }
];

const EditionsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-24 pb-12">
        <h2 className="text-gray-400 text-sm md:text-base uppercase tracking-wider mb-4">
          TEDxCUNEO EVENTS
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
          Editions
        </h1>
      </div>

      {/* Cards Container */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 space-y-8">
        {editions.map((edition, index) => (
          <div 
            key={index}
            className="group relative bg-zinc-900 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row h-full">
              {/* Image Section */}
              <div className="w-full lg:w-[40%] relative overflow-hidden p-6 md:p-8">
                <div className="aspect-[4/3] lg:aspect-auto lg:h-full rounded-lg overflow-hidden">
                  <div className={`absolute inset-0 ${edition.gradient} opacity-70`} />
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
                <Link 
                  to="/edition/description" 
                  className="inline-flex items-center text-white relative self-end group/link"
                >
                  <span className="text-lg">
                    Relive the event
                  </span>
                  <span className="ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1">
                    →
                  </span>
                  <span className="absolute -bottom-px left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover/link:w-full" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditionsPage;