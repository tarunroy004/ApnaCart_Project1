import React from 'react';
import noDataImage from '../assets/nothing here yet.webp';

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-4">
      {/* Animated Image */}
      <img
        src={noDataImage}
        alt="no data"
        className="w-40 md:w-48 animate-bounce-slow"
      />
      
      {/* Main Message */}
      <p className="text-gray-400 text-lg md:text-xl font-semibold">
        Oops! Nothing here yet
      </p>
      
      {/* Secondary Message */}
      <p className="text-gray-500 text-sm md:text-base text-center max-w-xs">
        Looks like there is no data to show right now. Try adding something new!
      </p>
    </div>
  );
};

export default NoData;
