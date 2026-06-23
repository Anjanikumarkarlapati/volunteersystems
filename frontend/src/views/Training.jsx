import { useState, useEffect } from 'react';
import { getTraining, deleteTraining } from '../api/training';
import TrainingModal from '../components/TrainingModal';

const catConfig = {
  Onboarding: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'rocket_launch' },
  Safety: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'shield' },
  Leadership: { bg: 'bg-violet-50', text: 'text-violet-700', icon: 'groups' },
  Technical: { bg: 'bg-cyan-50', text: 'text-cyan-700', icon: 'code' },
};

export default function Training() {
  const [training, setTraining] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTraining = async () => {
    try {
      const res = await getTraining();
      setTraining(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTraining();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg text-[32px] font-bold text-on-surface mb-1">Training</h1>
          <p className="text-[15px] text-on-surface-variant">Manage training modules and certifications.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl"
        >
          New Module
        </button>
      </div>

      {training.length === 0 ? (
        <div>No training modules</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {training.map(t => {
            const cfg = catConfig[t.category] || {
              bg: 'bg-surface-container',
              text: 'text-on-surface-variant',
              icon: 'school'
            };

            return (
              <div key={t._id} className="bg-white rounded-2xl border p-6">
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl ${cfg.bg} ${cfg.text} flex items-center justify-center`}>
                    <span className="material-symbols-outlined">{cfg.icon}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${cfg.bg} ${cfg.text}`}>
                    {t.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2">{t.title}</h3>
                <p className="text-sm mb-4">{t.desc}</p>
                <p className="mb-4">Duration: {t.duration}</p>

                <button
                  onClick={async () => {
                    if (window.confirm('Delete module?')) {
                      await deleteTraining(t._id);
                      fetchTraining();
                    }
                  }}
                  className="w-full py-2 bg-red-500 text-white rounded-xl"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && (
        <TrainingModal
          onClose={() => {
            setModalOpen(false);
            fetchTraining();
          }}
        />
      )}
    </div>
  );
}