import React from 'react';
import { FaTint } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[300px] w-full bg-transparent">
      <div className="relative flex items-center justify-center">
        {/* Outer Spinning Ring */}
        <div className="w-20 h-20 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin"></div>

        {/* Inner Pulsing Icon */}
        <div className="absolute flex items-center justify-center">
          <FaTint className="text-red-600 text-2xl animate-pulse" />
        </div>

        {/* Decorative Glow */}
        <div className="absolute w-20 h-20 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
      </div>

      {/* Loading Text */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-black font-black uppercase tracking-[0.3em] text-[10px]">
          Loading
        </p>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
