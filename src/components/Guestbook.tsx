import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquare, 
  Plus, 
  X, 
  Quote, 
  Sparkles,
  CheckCircle2,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Recommendation } from '../types';
import { INITIAL_RECOMMENDATIONS } from '../data/initialData';
import { submitRecommendation } from '../services/firestoreService';
import { useLanguage } from '../context/LanguageContext';

export const Guestbook: React.FC = () => {
  const { t, lang } = useLanguage();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [avatarColor, setAvatarColor] = useState('bg-cyan-500');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'recommendations'), (snapshot) => {
      const list: Recommendation[] = [];
      snapshot.forEach((doc) => {
        // Exclude any legacy dummy test reviews so it starts strictly clean
        if (doc.id !== 'rec-1' && doc.id !== 'rec-2' && doc.id !== 'rec-3') {
          list.push({ id: doc.id, ...doc.data() } as Recommendation);
        }
      });
      setRecommendations(list);
    }, (err) => {
      console.warn('Firestore recommendations read error:', err);
    });

    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await submitRecommendation({
        name,
        role: role || 'Collaborator',
        company: company || 'Web Project',
        rating,
        message,
        avatarColor,
      });

      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
      });

      setName('');
      setRole('');
      setCompany('');
      setMessage('');
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding recommendation:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const colors = [
    'bg-cyan-500', 
    'bg-blue-500', 
    'bg-emerald-500', 
    'bg-amber-500', 
    'bg-purple-500', 
    'bg-rose-500'
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
              {t('test.badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              {t('test.title')}
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              {t('test.subtitle')}
            </p>
          </div>

          <button
            id="leave-recommendation-btn"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 self-start md:self-auto shadow-md shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t('test.leaveNote')}</span>
          </button>
        </div>

        {/* Grid of recommendations or Authentic Zero-State */}
        {recommendations.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center max-w-2xl mx-auto space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white font-display">
                {lang === 'en' ? '0 Reviews Yet — Be the First!' : 'এখনো কোনো রিভিউ নেই (০) — প্রথম রিভিউ দিন!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
                {lang === 'en'
                  ? 'This portfolio is brand new and starts fresh with real feedback. Worked with Al-Fahad or reviewed his projects? Leave a note below!'
                  : 'এই পোর্টফোলিও ওয়েবসাইটটি সম্পূর্ণ নতুন ও সৎ ফিডব্যাকে শুরু হচ্ছে। আল-ফাহাদের সাথে কাজ করে থাকলে প্রথম রিভিউটি আপনিই দিন!'}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'en' ? 'Write the First Review' : 'প্রথম রিভিউ দিন'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg text-left relative group"
              >
                <div className="space-y-3">
                  {/* Rating stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (item.rating || 5)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-800 text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  <Quote className="w-6 h-6 text-slate-700 group-hover:text-cyan-500/40 transition-colors" />

                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    "{item.message}"
                  </p>
                </div>

                {/* Author footer */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <div className={`w-10 h-10 rounded-full ${item.avatarColor || 'bg-cyan-500'} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {item.role} {item.company ? `• ${item.company}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Leave Recommendation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Leave a Review for Al-Fahad</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Smith"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Role / Position</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Client or Project Lead"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company / Project</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Labs"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Star Rating Selection */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Rating (1 to 5 Stars)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-slate-600 hover:text-amber-400 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-800 text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-amber-400 font-bold ml-2">{rating} of 5 Stars</span>
                </div>
              </div>

              {/* Review Message */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Endorsement / Note *</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your experience working with Al-Fahad..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Avatar Badge Color */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Avatar Color</label>
                <div className="flex items-center gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setAvatarColor(c)}
                      className={`w-6 h-6 rounded-full ${c} ${avatarColor === c ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : 'opacity-70 hover:opacity-100'} transition-all`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-50"
                >
                  {isSubmitting ? 'Posting to Firestore...' : 'Post Recommendation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
