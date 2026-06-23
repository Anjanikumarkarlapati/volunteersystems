import { useState } from 'react';
import { addShift } from '../api/shift';

export default function ShiftModal({ onClose, volunteers, events }) {
const activeVols = volunteers;
const activeEvents = events;
  const [volunteerId, setVolunteerId] = useState(activeVols[0]?._id || '');
const [eventId, setEventId] = useState(activeEvents[0]?._id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00');

  const handleSave = async () => {
  if (!volunteerId || !eventId || !date) {
    alert('All fields required');
    return;
  }

  try {
    await addShift({
      volunteerId,
      eventId,
      date,
      time
    });

    window.location.reload();
    onClose();
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl animate-scale-in border border-outline-variant" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">assignment</span>
            </div>
            <h2 className="font-headline-sm text-[20px] font-bold text-on-surface">Assign Shift</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-variant transition-colors cursor-pointer"><span className="material-symbols-outlined text-[20px]">close</span></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Volunteer</label>
            <select value={volunteerId} onChange={e => setVolunteerId(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all">
              {activeVols.map(v => <option key={v._id} value={v._id}>{v.firstName} {v.lastName}</option>)}
            </select>
          </div>
          <div>
            <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Event</label>
            <select value={eventId} onChange={e => setEventId(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all">
              {activeEvents.map(e => <option key={e._id} value={e._id}>{e.title}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all" />
            </div>
            <div>
              <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Time</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all" />
            </div>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button onClick={handleSave} className="w-full py-3 bg-primary text-white rounded-xl font-label-md text-[14px] hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer">Assign Shift</button>
        </div>
      </div>
    </div>
  );
}
