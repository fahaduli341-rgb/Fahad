import React, { useState } from 'react';
import { 
  Code2, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe, 
  Inbox, 
  BookOpen, 
  CheckCircle2,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAdmin } from '../context/AdminContext';

interface NavbarProps {
  onOpenOwnerModal: () => void;
  onOpenDeployGuide: () => void;
  unreadCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenOwnerModal, 
  onOpenDeployGuide,
  unreadCount 
}) => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isAdmin, openLoginModal } = useAdmin();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleInboxClick = () => {
    if (isAdmin) {
      onOpenOwnerModal();
    } else {
      openLoginModal();
    }
  };

  const navLinks = [
    { name: lang === 'en' ? 'About Fahad' : 'আমার সম্পর্কে', href: '#about' },
    { name: lang === 'en' ? 'Live Projects' : 'লাইভ প্রজেক্টসমূহ', href: '#projects' },
    { name: lang === 'en' ? 'Contact' : 'যোগাযোগ', href: '#contact' },
  ];

  return (
    <nav id="main-navigation" className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-900/90 border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <a id="nav-brand" href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-1 font-display">
                develop with fahad
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Brahmanbaria Sadar • Firebase Live</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions & Utilities */}
          <div className="hidden md:flex items-center gap-3">
            {/* Deploy Guide Playbook */}
            <button
              id="deploy-guide-button"
              onClick={onOpenDeployGuide}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 flex items-center gap-1.5 transition-all"
              title="View Vercel & Firebase Deployment Playbook"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Vercel + Firebase Guide</span>
            </button>

            {/* Language Switcher */}
            <button
              id="language-switch-button"
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* WhatsApp Direct Action */}
            <a
              id="nav-whatsapp-btn"
              href="https://wa.me/8801704621603"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/60 text-emerald-300 hover:text-white border border-emerald-700/50 hover:bg-emerald-800/80 flex items-center gap-1.5 transition-colors"
              title="Chat on WhatsApp: 01704621603"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xl:inline">01704621603</span>
            </a>

            {/* Owner Inbox Button (Protected) */}
            <button
              id="inbox-button"
              onClick={handleInboxClick}
              className={`relative p-2 rounded-lg text-slate-300 hover:text-cyan-400 border transition-colors ${
                isAdmin ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300' : 'bg-slate-800 border-slate-700 hover:border-slate-600'
              }`}
              title={isAdmin ? "Fahad's Inbox (Unlocked)" : "Developer Inbox (Passcode Protected)"}
            >
              <Inbox className="w-4 h-4" />
              {isAdmin && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Hire Me CTA */}
            <a
              id="hire-me-button"
              href="#contact"
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('nav.hireMe')}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="mobile-inbox-btn"
              onClick={handleInboxClick}
              className={`relative p-2 rounded-lg border ${
                isAdmin ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
              title={isAdmin ? "Owner Inbox (Unlocked)" : "Developer Inbox"}
            >
              <Inbox className="w-4 h-4" />
              {isAdmin && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden px-4 pt-2 pb-6 bg-slate-900 border-b border-slate-800 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-2">
            <button
              onClick={() => {
                onOpenDeployGuide();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Deploy Guide</span>
            </button>

            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="py-2 px-4 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            <a
              href="https://wa.me/8801704621603"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 01704621603</span>
            </a>

            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg text-center text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600"
            >
              {t('nav.hireMe')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
