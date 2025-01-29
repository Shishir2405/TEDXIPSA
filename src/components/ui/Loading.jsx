import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center min-h-24 bg-black p-8">
      <div className="flex flex-row gap-3 relative">
        {/* First Dot */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 
                         rounded-full blur opacity-50 group-hover:opacity-75 transition 
                         duration-200 animate-pulse" />
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 
                         animate-bounce shadow-lg shadow-red-500/50 relative">
            <div className="absolute inset-0 rounded-full bg-red-500/50 blur-sm 
                          group-hover:bg-red-400/50 transition-colors duration-200" />
          </div>
          <div className="absolute -bottom-2 w-5 h-1.5 bg-gradient-to-r from-red-500/20 
                         to-transparent rounded-full blur-sm transform-gpu
                         animate-[shadow_1s_ease-in-out_infinite]" />
        </div>

        {/* Second Dot */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-700 to-red-900 
                         rounded-full blur opacity-50 group-hover:opacity-75 transition 
                         duration-200 animate-pulse [animation-delay:-.3s]" />
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-600 to-red-700 
                         animate-bounce [animation-delay:-.3s] shadow-lg shadow-red-600/50 relative">
            <div className="absolute inset-0 rounded-full bg-red-600/50 blur-sm 
                          group-hover:bg-red-500/50 transition-colors duration-200" />
          </div>
          <div className="absolute -bottom-2 w-5 h-1.5 bg-gradient-to-r from-red-600/20 
                         to-transparent rounded-full blur-sm transform-gpu
                         animate-[shadow_1s_ease-in-out_infinite_.3s]" />
        </div>

        {/* Third Dot */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-800 to-red-900 
                         rounded-full blur opacity-50 group-hover:opacity-75 transition 
                         duration-200 animate-pulse [animation-delay:-.5s]" />
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-700 to-red-800 
                         animate-bounce [animation-delay:-.5s] shadow-lg shadow-red-700/50 relative">
            <div className="absolute inset-0 rounded-full bg-red-700/50 blur-sm 
                          group-hover:bg-red-600/50 transition-colors duration-200" />
          </div>
          <div className="absolute -bottom-2 w-5 h-1.5 bg-gradient-to-r from-red-700/20 
                         to-transparent rounded-full blur-sm transform-gpu
                         animate-[shadow_1s_ease-in-out_infinite_.5s]" />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;

