import { useState, useEffect } from 'react';
import { addEvent, updateEvent } from '../api/event';

export default function EventFormModal({ event, onClose }) {
  const isEdit = !!event;
  const [form, setForm] = useState({ title: '', desc: '', date: '', category: 'Community', capacity: '20', status: 'upcoming' });

  useEffect(() => {
    if (event) setForm({ title: event.title, desc: event.desc, date: event.date, category: event.category, capacity: String(event.capacity), status: event.status });
  }, [event]);

  const handleChange = (f, v) => setForm(p => ({ ...p, [f]: v }));
 const handleSave = async () => {
  if (!form.title || !form.date) {
    alert('Title and date are required');
    return;
  }

  try {
    const eventData = {
      ...form,
      capacity: parseInt(form.capacity) || 1
    };

    if (isEdit) {
      await updateEvent(event._id, eventData);
    } else {
      await addEvent(eventData);
    }

    window.location.reload();
    onClose();
  } catch (error) {
    console.log(error);
    alert("Error saving event");
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in border border-outline-variant" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">{isEdit ? 'edit' : 'add_circle'}</span>
            </div>
            <h2 className="font-headline-sm text-[20px] font-bold text-on-surface">{isEdit ? 'Edit Opportunity' : 'New Opportunity'}</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-variant transition-colors cursor-pointer"><span className="material-symbols-outlined text-[20px]">close</span></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Event Title</label>
            <input value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="e.g. Community Kitchen" className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all" />
          </div>
          <div>
            <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Description</label>
            <textarea value={form.desc} onChange={e => handleChange('desc', e.target.value)} rows="3" placeholder="Describe the event..." className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Date</label>
              <input type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all" />
            </div>
            <div>
              <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Category</label>
              <select value={form.category} onChange={e => handleChange('category', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all">
                {['Community','Environment','Education','Health','Arts'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Capacity</label>
              <input type="number" min="1" value={form.capacity} onChange={e => handleChange('capacity', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all" />
            </div>
            <div>
              <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Status</label>
              <select value={form.status} onChange={e => handleChange('status', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all">
                {['upcoming','ongoing','completed'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button onClick={handleSave} className="w-full py-3 bg-primary text-white rounded-xl font-label-md text-[14px] hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer">{isEdit ? 'Update Event' : 'Create Event'}</button>
        </div>
      </div>
    </div>
  );
}
