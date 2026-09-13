import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Flame,
  ArrowUpRight,
  MessageCircle,
  MapPin,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitContactMessage } from '../services/firestoreService';
import { useLanguage } from '../context/LanguageContext';

export const Contact: React.FC = () => {
  const { t, lang } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('Full Website Build');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await submitContactMessage({
        name,
        email,
        serviceType,
        message,
      });

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#06b6d4', '#10b981', '#3b82f6'],
      });

      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Failed to submit message to Firebase:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('fahaduli341@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyWhatsApp = () => {
    navigator.clipboard.writeText('01704621603');
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/60 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
            {t('contact.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            {t('contact.title')}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="p-6 sm:p-7 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-5">
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  {lang === 'en' ? 'Direct Communication' : 'সরাসরি যোগাযোগ'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  {lang === 'en' 
                    ? 'Feel free to chat directly on WhatsApp or send a message through the form.' 
                    : 'যেকোনো ওয়েবসাইট নির্মাণ বা প্রজেক্ট আলোচনার জন্য হোয়াটসঅ্যাপে সরাসরি কথা বলুন বা ফর্ম পূরণ করুন।'}
                </p>
              </div>

              {/* Developer WhatsApp Card (High Priority) */}
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Direct</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyWhatsApp}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-0.5 rounded bg-slate-900 border border-slate-800"
                    >
                      {copiedWhatsApp ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedWhatsApp ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-baseline justify-between flex-wrap gap-2 pt-1">
                  <span className="text-base sm:text-xl font-mono font-bold text-white">
                    01704621603
                  </span>
                  <a
                    id="contact-whatsapp-chat-link"
                    href="https://wa.me/8801704621603?text=Hello%20Al-Fahad,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <span>{lang === 'en' ? 'Chat on WhatsApp' : 'মেসেজ পাঠান'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Developer Email Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>Personal Email</span>
                  </span>
                  <button
                    onClick={copyEmail}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-0.5 rounded bg-slate-900 border border-slate-800"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <a
                  href="mailto:fahaduli341@gmail.com"
                  className="text-sm sm:text-base font-bold text-white hover:text-cyan-400 transition-colors block break-all font-mono"
                >
                  fahaduli341@gmail.com
                </a>
              </div>

              {/* Developer Location Card */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">
                    {lang === 'en' ? 'Base Location' : 'লোকেশন / ঠিকানা'}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">
                    {lang === 'en' ? 'Brahmanbaria Sadar, Bangladesh' : 'ব্রাহ্মণবাড়িয়া সদর, বাংলাদেশ'}
                  </p>
                </div>
              </div>

              {/* Guarantees & Highlights */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Quick Turnaround:</strong> Responses usually within 1–2 hours.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Firestore Realtime:</strong> Inquiries saved directly to database.
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl text-left">
              
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {lang === 'en' ? 'Message Sent Successfully!' : 'বার্তা সফলভাবে পাঠানো হয়েছে!'}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    {t('contact.success')}
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold text-xs transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {t('contact.name')} *
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {t('contact.email')} *
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t('contact.service')}
                    </label>
                    <select
                      id="contact-service-select"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="Full Website Build">Full Website Build (React + Tailwind + Vercel)</option>
                      <option value="Firebase Cloud Setup">Firebase Cloud Setup (Firestore DB + Auth)</option>
                      <option value="Frontend UI Development">Frontend UI / Component Engineering</option>
                      <option value="Bug Fix / Optimization">Performance Optimization & Bug Fixing</option>
                      <option value="Other Project Inquiry">Other Project Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t('contact.message')} *
                    </label>
                    <textarea
                      id="contact-message-textarea"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your project requirements, timeline, or questions..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <button
                    id="contact-submit-button"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t('contact.sending') : t('contact.send')}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
