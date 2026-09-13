import React from 'react';
import { 
  Code2, 
  ArrowUp, 
  Database, 
  Globe, 
  Lock,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const Footer: React.FC = () => {
  const { lang } = useLanguage();
  const { isAdmin, openLoginModal, logout } = useAdmin();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white font-display">
                develop with fahad
              </span>
            </div>
            
            <p className="text-slate-400 max-w-md leading-relaxed text-xs sm:text-sm">
              {lang === 'en' 
                ? 'Personal portfolio of Fahad. Crafting web applications with AI, configuring Firebase Firestore cloud databases, and deploying live on Vercel.' 
                : 'ফাহাদের ব্যক্তিগত ওয়েব ডেভেলপার পোর্টফোলিও। এআই-এর সহায়তায় আধুনিক ওয়েবসাইট তৈরি, ফায়ারবেস ডেটাবেজ সংযোগ এবং ভার্সেল ফ্রি ডোমেইনে লাইভ ডেপ্লয়মেন্ট।'}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Brahmanbaria Sadar</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-cyan-400">
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>Vercel Live</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Quick Links' : 'দ্রুত লিংক'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">{lang === 'en' ? 'About Fahad' : 'আমার সম্পর্কে'}</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition-colors">{lang === 'en' ? 'Live Projects' : 'লাইভ প্রজেক্টসমূহ'}</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">{lang === 'en' ? 'Contact / WhatsApp' : 'যোগাযোগ / হোয়াটসঅ্যাপ'}</a></li>
              <li>
                {isAdmin ? (
                  <button 
                    onClick={logout} 
                    className="text-emerald-400 hover:text-rose-400 transition-colors flex items-center gap-1 text-xs"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Owner Active (Logout)</span>
                  </button>
                ) : (
                  <button 
                    onClick={openLoginModal} 
                    className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1 text-xs"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Owner Access</span>
                  </button>
                )}
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Direct Reach' : 'যোগাযোগ'}
            </h4>
            <div className="space-y-2 text-xs">
              <a 
                href="https://wa.me/8801704621603" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                <span>WhatsApp: 01704621603</span>
              </a>
              <p className="text-slate-300">
                fahaduli341@gmail.com
              </p>
              <p className="text-slate-400 text-[11px]">
                📍 Brahmanbaria Sadar, Bangladesh
              </p>
            </div>
            <button
              onClick={scrollToTop}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-cyan-400 border border-slate-800 transition-colors text-xs"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} develop with fahad. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Powered by React, Vercel &</span>
            <Database className="w-3.5 h-3.5 text-amber-400 inline" />
            <span className="text-slate-400 font-medium">Firebase Firestore</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
