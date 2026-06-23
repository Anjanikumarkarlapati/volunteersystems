import { useState } from 'react';
import { useData } from '../context/DataContext';

export default function ComposeModal({ onClose }) {
  const { sendAnnouncement } = useData();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('all');

  const handleSend = () => {
    if (!subject || !message) { alert('Subject and message required'); return; }
    sendAnnouncement({ subject, message, target });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl animate-scale-in border border-outline-variant" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">campaign</span>
            </div>
            <h2 className="font-headline-sm text-[20px] font-bold text-on-surface">New Announcement</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-variant transition-colors cursor-pointer"><span className="material-symbols-outlined text-[20px]">close</span></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Subject</label>
            <input value={subject} onChange={e => setSubject(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all" />
          </div>
          <div>
            <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows="5" className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all resize-none" />
          </div>
          <div>
            <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Send to</label>
            <select value={target} onChange={e => setTarget(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all">
              {[{v:'all',l:'All Volunteers'},{v:'active',l:'Active Volunteers'},{v:'coordinators',l:'Coordinators'},{v:'new',l:'New Members'}].map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button onClick={handleSend} className="w-full py-3 bg-primary text-white rounded-xl font-label-md text-[14px] hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer">Send Announcement</button>
        </div>
      </div>
    </div>
  );
}
