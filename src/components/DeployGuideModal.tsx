import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  Database, 
  Github, 
  Check, 
  Copy, 
  ExternalLink, 
  ArrowRight,
  Terminal,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  const copySnippet = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      title: '1. Push Your Code to GitHub',
      desc: 'Initialize a git repository if not already done, commit the portfolio code, and push to your personal GitHub account.',
      code: `git init\ngit add .\ngit commit -m "feat: Al-Fahad portfolio with Firebase"\ngit branch -M main\ngit remote add origin https://github.com/yourusername/fahad-portfolio.git\ngit push -u origin main`,
    },
    {
      title: '2. Import Project into Vercel (Free)',
      desc: 'Log in to vercel.com with your GitHub account, click "Add New... Project", and select your fahad-portfolio repository.',
      tips: 'Framework Preset: Vite | Build Command: npm run build | Output Directory: dist',
    },
    {
      title: '3. Firebase Configuration in Production',
      desc: 'Ensure your firebase-applet-config.json is included in the project or set up Firebase environment variables in Vercel settings under Project Settings -> Environment Variables.',
      tips: 'Firebase Firestore database intrepid-fort-7dtd0 is provisioned and active with real-time rules.',
    },
    {
      title: '4. Claim Your Free Vercel Domain',
      desc: 'Once deployed, Vercel instantly provisions a free HTTPS subdomain like: fahad-portfolio.vercel.app or you can bind your custom domain with 1-click CNAME record.',
      tips: 'Fast worldwide Edge network with automatic HTTPS SSL certificate.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left">
        
        {/* Header */}
        <div className="p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Vercel + Firebase Deployment Playbook
              </h3>
              <p className="text-xs text-slate-400">
                Al-Fahad's step-by-step workflow for live free domain publishing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-slate-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Full-Stack Production Ready:</p>
              <p className="mt-0.5 text-slate-400">
                This website is built with Vite, React 19, Tailwind CSS, and Firebase Firestore. It compiles to static production assets in <code className="text-cyan-300 font-mono">dist/</code> that work natively on Vercel's free global CDN.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-5">
            {steps.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">
                    {step.title}
                  </h4>
                  {step.code && (
                    <button
                      onClick={() => copySnippet(step.code!, idx)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedStep === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedStep === idx ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>

                {step.code && (
                  <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
                    {step.code}
                  </pre>
                )}

                {step.tips && (
                  <div className="p-2.5 rounded-lg bg-slate-900/90 text-[11px] text-slate-300 border border-slate-800">
                    <strong className="text-cyan-400">Pro Tip:</strong> {step.tips}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between">
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1.5"
          >
            <span>Open Vercel Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
