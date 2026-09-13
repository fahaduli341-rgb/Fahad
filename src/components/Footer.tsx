import React from 'react';
import { 
  Code2, 
  ArrowUp, 
  Heart, 
  Mail, 
  Database, 
  Globe, 
  Github, 
  Linkedin,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { lang } = useLanguage();

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
                Al-Fahad<span className="text-cyan-400">.dev</span>
              </span>
            </div>
            
            <p className="text-slate-400 max-w-md leading-relaxed text-xs sm:text-sm">
              {lang === 'en' 
                ? 'Personal portfolio of Al-Fahad. Building modern web applications, integrating real-time Firebase backends, and deploying to Vercel.' 
                : 'আল-ফাহাদের ব্যক্তিগত ওয়েব ডেভেলপার পোর্টফোলিও। আধুনিক ফ্রন্টএন্ড, ফায়ারবেস ক্লাউড ডেটাবেজ এবং ভার্সেল ডেপ্লয়মেন্টে পারদর্শী।'}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Firebase Connected</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-cyan-400">
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>Vercel Edge Ready</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Quick Links' : 'দ্রুত লিংক'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About Me</a></li>
              <li><a href="#skills" className="hover:text-cyan-400 transition-colors">Skills & Tech</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Featured Projects</a></li>
              <li><a href="#testimonials" className="hover:text-cyan-400 transition-colors">Recommendations Wall</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Hire Me / Contact</a></li>
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
          <p>© {new Date().getFullYear()} Al-Fahad. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with React 19, Tailwind CSS &</span>
            <Database className="w-3.5 h-3.5 text-amber-400 inline" />
            <span className="text-slate-400 font-medium">Firebase Firestore</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
