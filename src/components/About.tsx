import React from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Sparkles, 
  Rocket, 
  Code2, 
  Database, 
  Globe, 
  MessageCircle,
  Cpu,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { lang } = useLanguage();

  const developerDetails = [
    { 
      label: lang === 'en' ? 'Name' : 'নাম', 
      val: 'Al-Fahad', 
      icon: User 
    },
    { 
      label: lang === 'en' ? 'Location' : 'ঠিকানা', 
      val: lang === 'en' ? 'Brahmanbaria Sadar, Bangladesh' : 'ব্রাহ্মণবাড়িয়া সদর, বাংলাদেশ', 
      icon: MapPin 
    },
    { 
      label: 'WhatsApp', 
      val: '01704621603', 
      icon: MessageCircle, 
      link: 'https://wa.me/8801704621603?text=Hello%20Al-Fahad,%20I%20saw%20your%20website!', 
      highlight: true 
    },
    { 
      label: lang === 'en' ? 'Email' : 'ইমেইল', 
      val: 'fahaduli341@gmail.com', 
      icon: Mail, 
      link: 'mailto:fahaduli341@gmail.com' 
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: lang === 'en' ? 'AI-Powered Web Development' : 'এআই দিয়ে ওয়েবসাইট কোডিং',
      desc: lang === 'en'
        ? 'Using advanced AI intelligence to plan, architect, and code responsive modern web applications with clean React, TypeScript, and Tailwind CSS.'
        : 'অত্যাধুনিক এআই ব্যবহার করে দ্রুত রেসপনসিভ রিঅ্যাক্ট, টাইপস্ক্রিপ্ট ও টেইলউইন্ড সিএসএস দিয়ে আধুনিক ওয়েবসাইট কোড তৈরি করি।',
      icon: Cpu,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      step: '02',
      title: lang === 'en' ? 'Firebase Cloud Database' : 'ফায়ারবেস রিয়েল-টাইম ডেটাবেজ',
      desc: lang === 'en'
        ? 'Integrating Firebase Firestore for real-time contact messages, live project data synchronization, and cloud storage.'
        : 'ফায়ারবেস ফায়ারস্টোর সেটআপ করে ওয়েবসাইটের মেসেজ ও লাইভ প্রজেক্টের তথ্য রিয়েল-টাইমে ক্লাউডে সংরক্ষণ করি।',
      icon: Database,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      step: '03',
      title: lang === 'en' ? 'Live on Vercel Free Domain' : 'ভার্সেল ফ্রি ডোমেইনে লাইভ ডেপ্লয়',
      desc: lang === 'en'
        ? 'Deploying the codebase directly to Vercel edge infrastructure with free live domains (.vercel.app), SSL security, and instant loading.'
        : 'তৈরিকৃত ওয়েবসাইট ভার্সেলের ফ্রি ডোমেইনে (.vercel.app) মুহূর্তেই লাইভ করি, যা বিশ্বজুড়ে সবার জন্য উন্মুক্ত থাকে।',
      icon: Rocket,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-900/60 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'About Me & Workflow' : 'আমার পরিচয় ও কাজের পদ্ধতি'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            {lang === 'en' ? 'I am Fahad' : 'আমি ফাহাদ'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {lang === 'en'
              ? 'I craft full-featured modern websites using AI intelligence and deploy them live worldwide on Vercel with free domains and Firebase cloud connectivity.'
              : 'আমি এআই-এর সহযোগিতায় যেকোনো ওয়েবসাইটের সম্পূর্ণ কোড তৈরি করি, ফায়ারবেস ডেটাবেজ যুক্ত করি এবং ভার্সেলের ফ্রি ডোমেইনের মাধ্যমে ওয়েবসাইট লাইভ করি।'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Bio Profile Card */}
          <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6 text-left">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-cyan-500/20">
                AF
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">Al-Fahad</h3>
                <p className="text-xs sm:text-sm text-cyan-400 font-medium">
                  {lang === 'en' ? 'AI Web Developer' : 'এআই ওয়েব ডেভেলপার'}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Brahmanbaria Sadar, Bangladesh
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-900">
              <p>
                {lang === 'en' 
                  ? 'Hello! I am Fahad. I build websites using AI assistance, connecting database systems, and publishing them instantly on Vercel so anyone can access them via a live URL.' 
                  : 'আসসালামু আলাইকুম! আমি ফাহাদ। আমি আধুনিক এআই প্রযুক্তির সাহায্যে আকর্ষণীয় ও ডায়নামিক ওয়েবসাইট তৈরি করি এবং ভার্সেলের ফ্রি ডোমেইনে লাইভ করে দিই, যাতে ইন্টারনেটে যে কেউ যেকোনো জায়গা থেকে সহজে ভিজিট করতে পারে।'}
              </p>
            </div>

            {/* Details list */}
            <div className="space-y-2.5 pt-3 border-t border-slate-900">
              {developerDetails.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs py-1.5 gap-1 border-b border-slate-900 last:border-b-0">
                    <span className="text-slate-400 flex items-center gap-2 shrink-0">
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{detail.label}:</span>
                    </span>
                    {detail.link ? (
                      <a 
                        href={detail.link} 
                        target={detail.link.startsWith('http') ? '_blank' : undefined}
                        rel={detail.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`font-semibold hover:underline break-all sm:text-right ${detail.highlight ? 'text-emerald-400' : 'text-cyan-400'}`}
                      >
                        {detail.val}
                      </a>
                    ) : (
                      <span className="text-slate-200 font-medium sm:text-right">
                        {detail.val}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/8801704621603?text=Hello%20Fahad,%20I%20want%20to%20build%20a%20website%20with%20you!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'en' ? 'Chat on WhatsApp (01704621603)' : 'হোয়াটসঅ্যাপে মেসেজ দিন (01704621603)'}</span>
              </a>
            </div>
          </div>

          {/* Right: How I Build with AI and Deploy on Vercel */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                {lang === 'en' ? 'How I Build Websites & Make Them Live:' : 'আমি যেভাবে এআই দিয়ে ওয়েবসাইট বানিয়ে ভার্সেলে লাইভ করি:'}
              </h3>
            </div>

            {workflowSteps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2 group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      STEP {item.step}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-12">
                    {item.desc}
                  </p>
                </div>
              );
            })}

            {/* Call to live projects */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/50 to-blue-950/40 border border-cyan-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-cyan-300">
                  {lang === 'en' ? 'Explore My Live Demos Below' : 'নিচে আমার লাইভ প্রজেক্টের ডেমো দেখুন'}
                </p>
                <p className="text-xs text-slate-400">
                  {lang === 'en' 
                    ? 'Check out the working projects or add a new demo link!' 
                    : 'লাইভ প্রজেক্টগুলো ভিজিট করুন অথবা সরাসরি নতুন ডেমো লিংক যুক্ত করুন!'}
                </p>
              </div>
              <a
                href="#projects"
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shrink-0 transition-colors flex items-center gap-1.5"
              >
                <span>{lang === 'en' ? 'View Live Projects' : 'লাইভ প্রজেক্টে যান'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
