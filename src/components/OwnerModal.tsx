import React, { useState, useEffect } from 'react';
import { 
  X, 
  Inbox, 
  Trash2, 
  CheckCheck, 
  Mail, 
  Calendar, 
  Clock, 
  Database,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { ClientMessage } from '../types';
import { markMessageRead, deleteMessage } from '../services/firestoreService';

interface OwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerModal: React.FC<OwnerModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const q = query(collection(db, 'messages'));
    const unsub = onSnapshot(q, (snapshot) => {
      const items: ClientMessage[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as ClientMessage);
      });
      // Sort newest first
      items.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      setMessages(items);
      setLoading(false);
    }, (err) => {
      console.warn('Error reading messages:', err);
      setLoading(false);
    });

    return () => unsub();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMarkRead = async (id: string) => {
    try {
      await markMessageRead(id);
    } catch (err) {
      console.error('Error marking message read:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id);
      } catch (err) {
        console.error('Error deleting message:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left">
        
        {/* Header */}
        <div className="p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <span>Al-Fahad's Developer Inbox</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  {messages.length} Total
                </span>
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Database className="w-3 h-3 text-emerald-400" />
                <span>Live Firestore Collection: <code className="text-cyan-300">messages</code></span>
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

        {/* Messages List Container */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {loading ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Loading inquiries from Firebase...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-slate-950/40 rounded-xl border border-slate-800">
              <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-sm font-semibold text-slate-300">No client messages yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                When visitors or clients submit the contact form, their inquiries will appear here in real-time!
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-5 rounded-xl border transition-all ${
                  msg.status === 'new'
                    ? 'bg-slate-950/80 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-950/40 border-slate-800 opacity-90'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 text-white font-bold flex items-center justify-center text-xs">
                      {msg.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        {msg.name}
                        {msg.status === 'new' && (
                          <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide bg-cyan-500 text-slate-950 rounded">
                            NEW
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">{msg.email}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-1 rounded-md self-start sm:self-auto">
                    {msg.serviceType || 'General Inquiry'}
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {msg.createdAt?.seconds 
                      ? new Date(msg.createdAt.seconds * 1000).toLocaleString() 
                      : 'Recently'}
                  </span>

                  <div className="flex items-center gap-2">
                    {msg.status === 'new' && (
                      <button
                        onClick={() => handleMarkRead(msg.id!)}
                        className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1"
                        title="Mark as Read"
                      >
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Mark Read</span>
                      </button>
                    )}

                    <a
                      href={`mailto:${msg.email}?subject=Re: Inquiry on Al-Fahad's Portfolio&body=Hi ${msg.name},\n\nThank you for reaching out!`}
                      className="px-2.5 py-1 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-xs text-cyan-300 border border-cyan-500/30 flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </a>

                    <button
                      onClick={() => handleDelete(msg.id!)}
                      className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Logged as: <strong>Al-Fahad (Site Owner)</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
