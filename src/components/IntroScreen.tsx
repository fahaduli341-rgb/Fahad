import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal, Code2, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface IntroScreenProps {
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const { lang } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2400; // ~2.4 seconds auto-timer
    const intervalTime = 40;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          triggerExit();
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const triggerExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 450); // allow fade out animation
  };

  return (
    <div
      id="intro-screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white px-4 transition-all duration-500 ${
        isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[480px] h-80 sm:h-[480px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-lg w-full text-center space-y-6">
        {/* Modern Brand Emblem */}
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/30 mx-auto p-0.5 transform hover:rotate-6 transition-transform">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
          </div>
        </div>

        {/* Text Title requested: "develope with fahad" */}
        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-cyan-400 font-semibold">
            {lang === 'en' ? 'Welcome to' : 'স্বাগতম'}
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
            develop with fahad
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed pt-1">
            {lang === 'en' 
              ? 'Creating web applications with AI & deploying live on Vercel' 
              : 'এআই দিয়ে ওয়েবসাইট তৈরি ও ভার্সেল ফ্রি ডোমেইনে লাইভ ডেপ্লয়মেন্ট'}
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="space-y-2 max-w-xs mx-auto pt-2">
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-75 ease-out rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            {lang === 'en' ? 'Entering portfolio...' : 'ওয়েবসাইটে স্বয়ংক্রিয় প্রবেশ হচ্ছে...'}
          </p>
        </div>

        {/* Manual Enter Action Button */}
        <div className="pt-2">
          <button
            id="intro-enter-btn"
            onClick={triggerExit}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500/50 text-xs sm:text-sm font-medium transition-all shadow-md group cursor-pointer"
          >
            <span>{lang === 'en' ? 'Enter Now' : 'সরাসরি প্রবেশ করুন'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
