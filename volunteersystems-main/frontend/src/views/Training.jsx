import { useState } from 'react';
import { useData } from '../context/DataContext';
import TrainingModal from '../components/TrainingModal';

const catConfig = {
  Onboarding: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'rocket_launch' },
  Safety: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'shield' },
  Leadership: { bg: 'bg-violet-50', text: 'text-violet-700', icon: 'groups' },
  Technical: { bg: 'bg-cyan-50', text: 'text-cyan-700', icon: 'code' },
};

export default function Training() {
  const { data } = useData();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg text-[32px] font-bold text-on-surface mb-1">Training</h1>
          <p className="text-[15px] text-on-surface-variant">Manage training modules and certifications.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-label-md text-[14px] hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-sm">
          <span className="material-symbols-outlined text-[20px]">add</span> New Module
        </button>
      </div>

      {data.training.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant">school</span>
          </div>
          <h3 className="font-headline-sm text-[18px] text-on-surface mb-2">No training modules</h3>
          <p className="text-[14px] text-on-surface-variant">Create your first training module to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.training.map(t => {
            const cfg = catConfig[t.category] || { bg: 'bg-surface-container', text: 'text-on-surface-variant', icon: 'school' };
            return (
              <div key={t.id} className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 card-hover">
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl ${cfg.bg} ${cfg.text} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-[24px]">{cfg.icon}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${cfg.bg} ${cfg.text}`}>{t.category}</span>
                </div>
                <h3 className="font-headline-sm text-[18px] font-bold text-on-surface mb-2">{t.title}</h3>
                <p className="text-[13px] text-on-surface-variant mb-5 leading-relaxed">{t.desc}</p>
                <div className="flex items-center justify-between py-3 px-4 bg-surface-container-low rounded-xl mb-4">
                  <span className="text-[13px] text-on-surface-variant flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">schedule</span>{t.duration}</span>
                  <span className="text-[13px] text-on-surface-variant flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">group</span>{Math.floor(Math.random() * 15) + 5} enrolled</span>
                </div>
                <button className="w-full py-2.5 bg-primary text-white rounded-xl font-label-md text-[13px] hover:shadow-md hover:brightness-110 transition-all cursor-pointer">Enroll Volunteers</button>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && <TrainingModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
