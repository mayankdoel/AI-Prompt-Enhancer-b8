import React from 'react';

export const IndianFlag = (): React.ReactNode => {
  return (
    <div className="w-6 h-4 flex flex-col shadow-sm border border-gray-300 dark:border-gray-600">
      <div className="flex-1 bg-[#FF9933]"></div> {/* Saffron */}
      <div className="flex-1 bg-white flex justify-center items-center">
        <div className="w-2 h-2 rounded-full border-[1px] border-[#000080] flex justify-center items-center"> {/* Ashoka Chakra */}
          {/* Spokes are too small to render cleanly, so this is a representation */}
        </div>
      </div>
      <div className="flex-1 bg-[#138808]"></div> {/* Green */}
    </div>
  );
};
