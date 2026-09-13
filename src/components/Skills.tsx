import React, { useState } from 'react';
import { 
  Code, 
  Database, 
  Globe, 
  FileCode2, 
  Palette, 
  Braces, 
  Layout, 
  Zap, 
  ShieldCheck, 
  Server, 
  Network, 
  Activity, 
  GitBranch, 
  Link as LinkIcon, 
  Gauge,
  CheckCircle2
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

export const Skills: React.FC = () => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<number>(0);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Code': return Code;
      case 'FileCode2': return FileCode2;
      case 'Palette': return Palette;
      case 'Braces': return Braces;
      case 'Layout': return Layout;
      case 'Zap': return Zap;
      case 'Database': return Database;
      case 'ShieldCheck': return ShieldCheck;
      case 'Server': return Server;
      case 'Network': return Network;
      case 'Activity': return Activity;
      case 'Globe': return Globe;
      case 'GitBranch': return GitBranch;
      case 'Link': return LinkIcon;
      default: return Gauge;
    }
  };

  return (
    <section id="skills" className="py-20 border-b border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
            {t('skills.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            {t('skills.title')}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              id={`skills-tab-${idx}`}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === idx
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 scale-102'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <div className="bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl max-w-5xl mx-auto text-left">
          <div className="mb-8 pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                {SKILL_CATEGORIES[activeTab].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {SKILL_CATEGORIES[activeTab].description}
              </p>
            </div>
            <span className="text-xs text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full font-mono self-start sm:self-center">
              {SKILL_CATEGORIES[activeTab].skills.length} Core Competencies
            </span>
          </div>

          {/* Skill items grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {SKILL_CATEGORIES[activeTab].skills.map((skill, sIdx) => {
              const Icon = getIconComponent(skill.icon);
              return (
                <div
                  key={sIdx}
                  className={`p-4 rounded-xl border transition-all ${
                    skill.highlight 
                      ? 'bg-slate-950/70 border-slate-700/80 hover:border-cyan-500/50' 
                      : 'bg-slate-950/40 border-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-100 truncate">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700 text-cyan-300 shrink-0 whitespace-nowrap">
                      {skill.level}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
