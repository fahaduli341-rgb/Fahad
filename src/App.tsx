/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { IntroScreen } from './components/IntroScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { OwnerModal } from './components/OwnerModal';
import { DeployGuideModal } from './components/DeployGuideModal';

function PortfolioMain() {
  const [showIntro, setShowIntro] = useState(true);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Real-time listener for unread messages in Firebase Firestore
  useEffect(() => {
    try {
      const q = query(collection(db, 'messages'), where('status', '==', 'new'));
      const unsub = onSnapshot(q, (snapshot) => {
        setUnreadCount(snapshot.size);
      }, (err) => {
        console.warn('Unread count query warning:', err);
      });
      return () => unsub();
    } catch (e) {
      console.warn('Listener setup fallback:', e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Intro Entrance Screen (develop with fahad -> auto enters) */}
      {showIntro && (
        <IntroScreen onEnter={() => setShowIntro(false)} />
      )}

      <Navbar
        onOpenOwnerModal={() => setIsOwnerModalOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        unreadCount={unreadCount}
      />
      
      <main className="flex-1">
        <Hero onOpenDeployGuide={() => setIsDeployGuideOpen(true)} />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />

      {/* Modals */}
      <OwnerModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
      />

      <DeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioMain />
      </LanguageProvider>
    </ThemeProvider>
  );
}

