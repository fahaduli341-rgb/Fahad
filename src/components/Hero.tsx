import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Database, 
  Globe, 
  Sparkles, 
  Heart, 
  Copy, 
  Check, 
  Download,
  Flame,
  Layers,
  Code,
  MessageCircle,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { togglePortfolioClap } from '../services/firestoreService';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface HeroProps {
  onOpenDeployGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDeployGuide }) => {
  const { t, lang } = useLanguage();
  const [claps, setClaps] = useState<number>(0);
  const [hasClapped, setHasClapped] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Listen to live applause counter from Firestore (starts strictly from 0)
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'stats', 'applause'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (typeof data.count === 'number') {
          setClaps(data.count);
        }
      } else {
        setClaps(0);
      }
    }, (err) => {
      console.warn('Live applause read warning:', err);
    });
    return () => unsub();
  }, []);

  const handleClap = async () => {
    setClaps(prev => prev + 1);
    setHasClapped(true);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.75 },
      colors: ['#06b6d4', '#3b82f6', '#10b981'],
    });
    await togglePortfolioClap();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('fahaduli341@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="hero-section" className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Pill & Location Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{t('hero.badge')}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/50 text-xs font-medium text-cyan-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lang === 'en' ? 'Brahmanbaria Sadar' : 'ব্রাহ্মণবাড়িয়া সদর'}</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold tracking-wider uppercase text-cyan-400 font-mono">
                develop with fahad
              </h2>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display">
                I am Fahad
              </h1>
              <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-slate-200 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                {lang === 'en' 
                  ? 'Crafting Web Apps with AI & Deploying Live on Vercel' 
                  : 'এআই দিয়ে ওয়েবসাইট তৈরি ও ভার্সেল ফ্রি ডোমেইনে লাইভ ডেপ্লয়মেন্ট'}
              </p>
            </div>

            {/* Tagline description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'en'
                ? 'I build modern, responsive web applications using AI-assisted engineering, configure real-time Firebase databases, and take projects live on Vercel with free fast domains. Check my live demos below!'
                : 'আমি এআই-এর সহায়তায় আকর্ষণীয় ওয়েবসাইট কোড করি, ফায়ারবেস ডেটাবেজ সেটআপ করি এবং ভার্সেলের ফ্রি ডোমেইনে ওয়েবসাইট লাইভ করে দিই। নিচে আমার লাইভ প্রজেক্টগুলো দেখুন!'}
            </p>

            {/* Key Skill Highlights Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/60 border border-slate-700 text-xs text-slate-300">
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                <span>React 19 & TypeScript</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/60 border border-slate-700 text-xs text-slate-300">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>Firebase Firestore</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/60 border border-slate-700 text-xs text-slate-300">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Vercel Free Domain Live</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/60 border border-slate-700 text-xs text-slate-300">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Tailwind CSS</span>
              </div>
            </div>

            {/* Primary Action Buttons + WhatsApp Button */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                id="hero-explore-projects-btn"
                href="#projects"
                className="px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 group whitespace-nowrap"
              >
                <span>{t('hero.exploreBtn')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Direct WhatsApp Call to Action */}
              <a
                id="hero-whatsapp-btn"
                href="https://wa.me/8801704621603?text=Hello%20Al-Fahad,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-emerald-100 bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 border border-emerald-500/40 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-white shrink-0" />
                <span>WhatsApp: 01704621603</span>
              </a>

              <a
                id="hero-contact-btn"
                href="#contact"
                className="px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-750 hover:text-white border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>{t('hero.contactBtn')}</span>
              </a>

              {/* Copy Email Fast Action */}
              <button
                id="hero-copy-email-btn"
                onClick={copyEmail}
                className="px-3 py-3 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5"
                title="Copy developer email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden xl:inline">{copiedEmail ? 'Copied!' : 'fahaduli341@gmail.com'}</span>
              </button>
            </div>
          </div>

          {/* Right Hero: Interactive Developer Console / Workstation Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-left">
              
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-slate-800/80 border-b border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                  <span className="text-xs text-slate-400 font-mono ml-2">fahad@dev-workspace:~</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>zsh</span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs sm:text-[13px] space-y-4 bg-slate-950/70">
                <div>
                  <p className="text-slate-400">
                    <span className="text-emerald-400 font-bold">$</span> whoami --details
                  </p>
                  <p className="text-cyan-300 font-medium pl-4 mt-1">
                    Al-Fahad (Full-Stack Web Developer)
                  </p>
                  <p className="text-slate-400 text-xs pl-4 mt-0.5">
                    Location: Brahmanbaria Sadar, Bangladesh
                  </p>
                  <p className="text-emerald-400 text-xs pl-4 mt-0.5">
                    WhatsApp: +8801704621603
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">
                    <span className="text-emerald-400 font-bold">$</span> firebase --status
                  </p>
                  <div className="pl-4 mt-1 space-y-0.5 text-slate-300">
                    <p className="text-emerald-400 flex items-center gap-1">
                      <span>✔</span> Firestore DB initialized & connected
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400">
                    <span className="text-emerald-400 font-bold">$</span> vercel --domain-check
                  </p>
                  <p className="text-slate-300 pl-4 mt-1">
                    <span className="text-emerald-400 font-bold">✔</span> Production Ready (Fast Edge CDN)
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <p className="text-slate-400">
                    <span className="text-emerald-400 font-bold">$</span> cat ./status.txt
                  </p>
                  <p className="text-amber-300 font-sans text-xs pl-4 mt-1">
                    "Ready to build high performance web applications. Contact via form or WhatsApp!"
                  </p>
                </div>
              </div>

              {/* Live Interactive Footer within Card */}
              <div className="px-5 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    id="hero-applause-button"
                    onClick={handleClap}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      hasClapped 
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasClapped ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} />
                    <span>{claps} Claps</span>
                  </button>
                  <span className="text-[11px] text-slate-400">Live</span>
                </div>

                <button
                  onClick={onOpenDeployGuide}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                >
                  <Globe className="w-3 h-3" />
                  <span>Deploy Playbook</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

