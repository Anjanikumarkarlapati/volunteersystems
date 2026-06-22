import { useState } from 'react';
import { useData } from '../context/DataContext';
import ComposeModal from '../components/ComposeModal';

export default function Communications() {
  const { data } = useData();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg text-[32px] font-bold text-on-surface mb-1">Communications</h1>
          <p className="text-[15px] text-on-surface-variant">Send messages and announcements to volunteers.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-label-md text-[14px] hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-sm">
          <span className="material-symbols-outlined text-[20px]">edit</span> Compose
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden card-hover">
          <div className="px-5 py-4 border-b border-outline-variant">
            <h3 className="font-headline-sm text-[18px] font-bold text-on-surface">Conversations</h3>
          </div>
          <div className="divide-y divide-outline-variant">
            {data.conversations.map(c => (
              <div key={c.id} className={`px-5 py-4 flex items-center gap-3 hover:bg-surface-container-low transition-colors cursor-pointer ${c.unread ? 'bg-primary/5' : ''}`}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">{c.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="flex-1 min-w-0">
                  <div className={`text-[14px] truncate ${c.unread ? 'font-semibold text-on-surface' : 'text-on-surface'}`}>{c.name}</div>
                  <div className="text-[12px] text-on-surface-variant truncate">{c.lastMessage}</div>
                </div>
                <span className="text-[11px] text-on-surface-variant shrink-0">{c.time}</span>
                {c.unread && <span className="w-2 h-2 bg-primary rounded-full shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden card-hover">
          <div className="px-5 py-4 border-b border-outline-variant">
            <h3 className="font-headline-sm text-[18px] font-bold text-on-surface">Announcements</h3>
          </div>
          <div className="divide-y divide-outline-variant">
            {data.announcements.map(a => (
              <div key={a.id} className="px-5 py-5 hover:bg-surface-container-low transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-label-md text-[14px] font-semibold text-on-surface">{a.subject}</h4>
                  <span className="text-[12px] text-on-surface-variant">{a.date}</span>
                </div>
                <p className="text-[13px] text-on-surface-variant mb-3 leading-relaxed">{a.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-on-surface-variant">From: <span className="font-medium">{a.author}</span></span>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">{a.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && <ComposeModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
