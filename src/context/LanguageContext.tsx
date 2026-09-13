import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.testimonials': 'Guestbook',
    'nav.contact': 'Contact',
    'nav.inbox': 'Inbox',
    'nav.deployGuide': 'Vercel & Firebase Guide',
    'nav.hireMe': 'Hire Me',

    // Hero
    'hero.badge': 'Available for Freelance & Web Projects',
    'hero.greeting': "Hi, I'm",
    'hero.name': 'Al-Fahad',
    'hero.title': 'Full-Stack Web Developer',
    'hero.tagline': 'I build high-performance web applications, integrate real-time Firebase backends, and launch them live to production.',
    'hero.exploreBtn': 'View My Projects',
    'hero.contactBtn': 'Get In Touch',
    'hero.applaud': 'Applause for Fahad',
    'hero.terminalTitle': 'fahad@dev-workspace:~',

    // About
    'about.badge': 'About Al-Fahad',
    'about.title': 'Crafting Web Experiences with Modern Code & Cloud Backends',
    'about.p1': "I am Al-Fahad, an enthusiastic and detail-oriented web developer. I specialize in developing responsive, scalable web applications with React, TypeScript, and Tailwind CSS, backed by powerful cloud integrations like Firebase Firestore.",
    'about.p2': "From initial wireframe to live production on Vercel with free custom domains, I ensure every website is fast, secure, mobile-first, and equipped with real database persistence.",
    'about.stat1': 'Full-Stack Ready',
    'about.stat1Desc': 'Frontend + Real Cloud Database',
    'about.stat2': 'Live Deployments',
    'about.stat2Desc': 'Vercel & Custom Domains',
    'about.stat3': 'Fast Turnaround',
    'about.stat3Desc': 'Clean, maintainable code',

    // Skills
    'skills.badge': 'Technical Arsenal',
    'skills.title': 'My Skills & Technologies',
    'skills.subtitle': 'Modern languages, frameworks, cloud backends, and deployment tools I use every day.',

    // Projects
    'projects.badge': 'Portfolio',
    'projects.title': 'Featured Web Projects',
    'projects.subtitle': 'A collection of real web applications with live code and cloud backends.',
    'projects.all': 'All',
    'projects.searchPlaceholder': 'Search projects by tech or keyword...',
    'projects.addProject': 'Add Project',
    'projects.viewLive': 'Live Demo',
    'projects.sourceCode': 'Code',

    // Testimonials
    'test.badge': 'Community & Clients',
    'test.title': 'Recommendations & Guestbook',
    'test.subtitle': 'Real reviews and notes left by clients, collaborators, and visitors.',
    'test.leaveNote': 'Leave a Recommendation',

    // Contact
    'contact.badge': 'Get In Touch',
    'contact.title': "Let's Build Something Great Together",
    'contact.subtitle': 'Have a project in mind, need a full website, or want to integrate Firebase? Send me a message below.',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.service': 'Service Needed',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending to Firebase...',
    'contact.success': 'Message Sent Successfully! Al-Fahad will reach out soon.',
  },
  bn: {
    // Navigation
    'nav.about': 'সম্পর্কে',
    'nav.skills': 'দক্ষতা',
    'nav.projects': 'প্রজেক্টসমূহ',
    'nav.testimonials': 'গেস্টবুক / রিভিউ',
    'nav.contact': 'যোগাযোগ',
    'nav.inbox': 'ইনবক্স',
    'nav.deployGuide': 'ভার্সেল ও ফায়ারবেস গাইড',
    'nav.hireMe': 'হায়ার করুন',

    // Hero
    'hero.badge': 'নতুন ওয়েবসাইট প্রজেক্টের জন্য প্রস্তুত',
    'hero.greeting': 'হ্যালো, আমি',
    'hero.name': 'আল-ফাহাদ',
    'hero.title': 'ফুল-স্ট্যাক ওয়েব ডেভেলপার',
    'hero.tagline': 'আধুনিক ও দ্রুতগতির ওয়েবসাইট তৈরি, রিয়েল-টাইম ফায়ারবেস ডেটাবেজ সেটআপ এবং ভার্সেল ফ্রি ডোমেইনে লাইভ করার দক্ষ কারিগর।',
    'hero.exploreBtn': 'প্রজেক্টগুলো দেখুন',
    'hero.contactBtn': 'যোগাযোগ করুন',
    'hero.applaud': 'ফাহাদকে প্রশংসা জানান',
    'hero.terminalTitle': 'fahad@dev-workspace:~',

    // About
    'about.badge': 'আল-ফাহাদ সম্পর্কে',
    'about.title': 'আধুনিক কোড ও ক্লাউড ডেটাবেজে ওয়েবসাইট রূপায়ণ',
    'about.p1': 'আমি আল-ফাহাদ, একজন নিবেদিতপ্রাণ ওয়েব ডেভেলপার। রিঅ্যাক্ট (React), টাইপস্ক্রিপ্ট (TypeScript) ও টেইলউইন্ড (Tailwind CSS) দিয়ে আকর্ষণীয় ফ্রন্টএন্ড এবং ফায়ারবেস দিয়ে শক্তিশালী ক্লাউড ডেটাবেজ ব্যাকএন্ড তৈরি করি।',
    'about.p2': 'আইডিয়া থেকে শুরু করে ভার্সেলের ফ্রি ডোমেইনে লাইভ প্রোডাকশন পর্যন্ত প্রতিটি ওয়েবসাইটকে দ্রুত, নিরাপদ এবং ১০০% রেসপন্সিভ করে গড়ে তুলি।',
    'about.stat1': 'ফুল-স্ট্যাক সমাধান',
    'about.stat1Desc': 'ফ্রন্টএন্ড + ক্লাউড ডেটাবেজ',
    'about.stat2': 'লাইভ ডেপ্লয়মেন্ট',
    'about.stat2Desc': 'ভার্সেল ও কাস্টম ডোমেইন',
    'about.stat3': 'দ্রুত ডেলিভারি',
    'about.stat3Desc': 'পরিচ্ছন্ন ও আধুনিক কোডবেস',

    // Skills
    'skills.badge': 'টেকনিক্যাল দক্ষতা',
    'skills.title': 'আমার স্কিল ও টেকনোলজি',
    'skills.subtitle': 'প্রতিদিনের প্রজেক্টে যে সকল আধুনিক ফ্রেমওয়ার্ক, ক্লাউড ব্যাকএন্ড এবং ডেপ্লয় টুল ব্যবহার করি।',

    // Projects
    'projects.badge': 'পোর্টফোলিও',
    'projects.title': 'নির্বাচিত ওয়েব প্রজেক্টসমূহ',
    'projects.subtitle': 'রিয়েল কোড ও ক্লাউড ডেটাবেজ সমৃদ্ধ আধুনিক ওয়েব অ্যাপ্লিকেশন।',
    'projects.all': 'সব প্রজেক্ট',
    'projects.searchPlaceholder': 'প্রজেক্ট খুঁজুন...',
    'projects.addProject': 'নতুন প্রজেক্ট যুক্ত করুন',
    'projects.viewLive': 'লাইভ ডেমো',
    'projects.sourceCode': 'সোর্স কোড',

    // Testimonials
    'test.badge': 'ক্লায়েন্ট ও কমিউনিটি',
    'test.title': 'রিকমেন্ডেশন ও গেস্টবুক',
    'test.subtitle': 'ক্লায়েন্ট ও শুভানুধ্যায়ীদের রেখে যাওয়া মূল্যবান বার্তা ও রিভিউ।',
    'test.leaveNote': 'রিভিউ বা বার্তা দিন',

    // Contact
    'contact.badge': 'যোগাযোগ',
    'contact.title': 'চলুন আপনার পরবর্তী ওয়েবসাইট তৈরি করি',
    'contact.subtitle': 'নতুন ওয়েবসাইট বানানো, ফায়ারবেস সেটআপ বা যেকোনো প্রশ্নের জন্য সরাসরি ফর্মটি পূরণ করুন।',
    'contact.name': 'আপনার নাম',
    'contact.email': 'আপনার ইমেইল',
    'contact.service': 'কাজের ধরন',
    'contact.message': 'আপনার বার্তা',
    'contact.send': 'বার্তা পাঠান',
    'contact.sending': 'ফায়ারবেসে পাঠানো হচ্ছে...',
    'contact.success': 'বার্তা সফলভাবে পাঠানো হয়েছে! আল-ফাহাদ খুব শীঘ্রই যোগাযোগ করবেন।',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('fahad_portfolio_lang');
    return (saved === 'bn' || saved === 'en') ? saved : 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('fahad_portfolio_lang', newLang);
  };

  const t = (key: string): string => {
    return translations[lang][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
