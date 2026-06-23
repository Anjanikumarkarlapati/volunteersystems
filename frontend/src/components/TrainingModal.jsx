import { useState } from 'react';
import { addTraining } from '../api/training';

export default function TrainingModal({ onClose }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Onboarding');

  const handleSave = async () => {
    if (!title || !desc || !duration) {
      alert('All fields required');
      return;
    }

    try {
      await addTraining({
        title,
        desc,
        duration,
        category
      });

      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl animate-scale-in border border-outline-variant"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">school</span>
            </div>
            <h2 className="font-headline-sm text-[20px] font-bold text-on-surface">
              New Training Module
            </h2>
          </div>

          <button onClick={onClose}>
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Module Title"
            className="w-full px-4 py-2.5 border rounded-xl"
          />

          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            rows="3"
            placeholder="Description"
            className="w-full px-4 py-2.5 border rounded-xl"
          />

          <input
            value={duration}
            onChange={e => setDuration(e.target.value)}
            placeholder="2 hours"
            className="w-full px-4 py-2.5 border rounded-xl"
          />

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-xl"
          >
            {['Onboarding', 'Safety', 'Leadership', 'Technical'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="p-6 pt-0">
          <button
            onClick={handleSave}
            className="w-full py-3 bg-primary text-white rounded-xl"
          >
            Save Module
          </button>
        </div>
      </div>
    </div>
  );
}