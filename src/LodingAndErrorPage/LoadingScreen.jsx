import { useState, useEffect } from 'react';
import { FaTint } from 'react-icons/fa';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              onLoadingComplete();
            }, 500);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ${!isVisible ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Background Decor - No Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-100 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="relative z-10 text-center w-full max-w-md px-6">
        {/* Blood Icon with Pulse & Spin */}
        <div className="relative mb-10 flex justify-center">
          {/* Animated Rings */}
          <div className="absolute w-24 h-24 border-2 border-dashed border-red-200 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute w-24 h-24 border-t-2 border-red-600 rounded-full animate-spin"></div>

          {/* Central Heart/Drop Icon */}
          <div className="w-24 h-24 bg-white shadow-2xl shadow-red-100 rounded-full flex items-center justify-center relative">
            <FaTint className="text-red-600 text-4xl animate-pulse" />
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-[#0F172A] uppercase tracking-tighter italic">
              Life<span className="text-red-600">Save</span>
            </h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1">
              Preparing your HomePage
            </p>
          </div>

          {/* Clean Progress Bar - No Gradients */}
          <div className="w-full space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[11px] font-black text-black uppercase tracking-widest">
                Progress
              </span>
              <span className="text-lg font-black text-red-600 leading-none">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="w-full h-4 bg-slate-100 rounded-full p-1 border border-slate-200">
              <div
                className="h-full bg-red-600 rounded-full transition-all duration-300 ease-out flex items-center justify-end px-1"
                style={{ width: `${progress}%` }}
              >
                {/* Small inner glow effect using white opacity */}
                <div className="w-full h-[2px] bg-white opacity-20 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Status Dots */}
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 text-center">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em]">
          System loading
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
