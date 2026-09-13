import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Globe, 
  Sparkles, 
  X,
  Layers,
  Link2,
  ShieldCheck
} from 'lucide-react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy 
} from 'firebase/firestore';
import confetti from 'canvas-confetti';
import { db } from '../firebase';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const Projects: React.FC = () => {
  const { lang } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form state for adding live project
  const [title, setTitle] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('Vercel Live');

  // Real-time listener for projects collection in Firestore
  useEffect(() => {
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, (snapshot) => {
        const loaded: Project[] = [];
        snapshot.forEach((d) => {
          loaded.push({ id: d.id, ...d.data() } as Project);
        });
        setProjects(loaded);
      }, (err) => {
        console.warn('Firestore projects listener fallback:', err);
        // Fallback to non-ordered query if index is building
        const fallbackUnsub = onSnapshot(collection(db, 'projects'), (snap) => {
          const fallbackList: Project[] = [];
          snap.forEach((docItem) => {
            fallbackList.push({ id: docItem.id, ...docItem.data() } as Project);
          });
          setProjects(fallbackList);
        });
        return () => fallbackUnsub();
      });

      return () => unsub();
    } catch (e) {
      console.warn('Projects setup warning:', e);
    }
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !liveUrl.trim()) return;

    let formattedUrl = liveUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'projects'), {
        title: title.trim(),
        liveUrl: formattedUrl,
        description: description.trim() || 'Live project deployed on Vercel with responsive architecture.',
        category: tag || 'Vercel Live',
        tags: [tag || 'Vercel', 'AI Built', 'Live Demo'],
        createdAt: serverTimestamp(),
        timestampStr: new Date().toISOString(),
      });

      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#10b981', '#3b82f6'],
      });

      setTitle('');
      setLiveUrl('');
      setDescription('');
      setTag('Vercel Live');
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Failed to add project to Firestore:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const copyProjectLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="projects" className="py-20 bg-slate-900/80 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Live Showcase' : 'লাইভ প্রজেক্টসমূহ'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              {lang === 'en' ? 'My Live Projects' : 'আমার লাইভ প্রজেক্টসমূহ'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {lang === 'en' 
                ? 'Websites created with AI and deployed live via Vercel. Click to open any live demo in real-time!' 
                : 'এআই দিয়ে নির্মিত এবং ভার্সেলের ফ্রি ডোমেইনে লাইভ করা প্রজেক্ট। যেকোনো ডেমো লিংকে ক্লিক করে সরাসরি ভিজিট করুন!'}
            </p>
          </div>

          {/* Add Live Demo Link Button */}
          <button
            id="add-live-project-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/25 shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
            <span>{lang === 'en' ? '+ Add Live Project' : '+ নতুন ডেমো লিংক যুক্ত করুন'}</span>
          </button>
        </div>

        {/* Projects Grid or Zero-State */}
        {projects.length === 0 ? (
          <div className="p-10 sm:p-16 rounded-2xl bg-slate-950 border border-slate-800 text-center max-w-xl mx-auto space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
              <Globe className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white font-display">
                {lang === 'en' ? 'No Live Projects Added Yet' : 'এখনো কোনো ডেমো লিংক যুক্ত করা হয়নি'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                {lang === 'en'
                  ? 'Click the button below to paste your Vercel live website demo link and publish it instantly for your visitors!'
                  : 'নিচের বাটনে ক্লিক করে আপনার ভার্সেল লাইভ ওয়েবসাইট ডেমো লিংকটি যোগ করুন। সাথে সাথে ভিজিটররা দেখতে পাবে!'}
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>{lang === 'en' ? 'Add First Live Demo' : 'প্রথম ডেমো লিংক যুক্ত করুন'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all p-5 flex flex-col justify-between space-y-4 shadow-xl group text-left relative"
              >
                <div className="space-y-3">
                  {/* Status badge & tag */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-[11px] font-medium text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Live on Vercel</span>
                    </div>

                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                      {proj.category || 'Vercel'}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors font-display">
                    {proj.title}
                  </h3>

                  {/* Project Description */}
                  {proj.description && (
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                  )}

                  {/* Project Live Link display */}
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between gap-2">
                    <span className="text-xs text-cyan-300 font-mono truncate">
                      {proj.liveUrl}
                    </span>
                    <button
                      onClick={() => copyProjectLink(proj.id, proj.liveUrl)}
                      className="text-slate-400 hover:text-white p-1 rounded transition-colors shrink-0"
                      title="Copy Demo Link"
                    >
                      {copiedId === proj.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-slate-900 flex items-center justify-between gap-2">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
                  >
                    <span>{lang === 'en' ? 'Open Live Demo' : 'লাইভ সাইট দেখুন'}</span>
                    <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>

                  {/* Delete button (with confirmation) */}
                  {deleteConfirmId === proj.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-[11px] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(proj.id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-900 border border-transparent hover:border-rose-500/30 transition-all"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Add Live Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span>{lang === 'en' ? 'Add Live Project Link' : 'লাইভ প্রজেক্ট লিংক যোগ করুন'}</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'en' ? 'Project Name / Title' : 'প্রজেক্টের নাম'} *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. My E-Commerce Store"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'en' ? 'Live Demo Link (URL)' : 'লাইভ ডেমো লিংক (URL)'} *
                </label>
                <input
                  type="text"
                  required
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://my-app.vercel.app"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  {lang === 'en' 
                    ? 'Paste your free Vercel domain or custom domain link.' 
                    : 'আপনার ভার্সেল ফ্রি ডোমেইন বা ওয়েবসাইটের লিংক দিন।'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'en' ? 'Short Note / Description (Optional)' : 'সংক্ষিপ্ত বিবরণ (ঐচ্ছিক)'}
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Built with AI assistance, connected to Firestore, and deployed live on Vercel."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {lang === 'en' ? 'Category / Tag' : 'ট্যাগ / ক্যাটাগরি'}
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="Vercel Live">Vercel Live App</option>
                  <option value="AI Website">AI-Built Website</option>
                  <option value="Firebase FullStack">Firebase FullStack</option>
                  <option value="Client Project">Client Project</option>
                  <option value="Landing Page">Landing Page</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  {lang === 'en' ? 'Cancel' : 'বাতিল'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting 
                    ? (lang === 'en' ? 'Publishing...' : 'সংরক্ষণ হচ্ছে...') 
                    : (lang === 'en' ? 'Publish Live Project' : 'লাইভ সেভ করুন')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
