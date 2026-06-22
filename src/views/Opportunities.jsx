import { useState } from 'react';
import { useData } from '../context/DataContext';
import EventFormModal from '../components/EventFormModal';

const categoryThemes = {
  Community: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'groups' },
  Environment: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'park' },
  Education: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'school' },
  Health: { bg: 'bg-rose-50', text: 'text-rose-700', icon: 'monitoring' },
  Arts: { bg: 'bg-violet-50', text: 'text-violet-700', icon: 'palette' },
};

export default function Opportunities() {
  const { data, deleteEvent, registerForEvent } = useData();
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const filtered = filter === 'all' ? data.events : data.events.filter(e => e.status === filter);
  const filters = [
    { key: 'all', label: 'All Events', count: data.events.length },
    { key: 'upcoming', label: 'Upcoming', count: data.events.filter(e => e.status === 'upcoming').length },
    { key: 'ongoing', label: 'Ongoing', count: data.events.filter(e => e.status === 'ongoing').length },
    { key: 'completed', label: 'Completed', count: data.events.filter(e => e.status === 'completed').length },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg text-[32px] font-bold text-on-surface mb-1">Opportunities</h1>
          <p className="text-[15px] text-on-surface-variant">Create and manage volunteer events and programs.</p>
        </div>
        <button onClick={() => { setEditingEvent(null); setModalOpen(true); }} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-label-md text-[14px] hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-sm">
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Opportunity
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {filters.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} className={`px-5 py-2.5 rounded-xl text-[13px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 font-medium ${
            filter === f.key ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-variant'
          }`}>
            {f.label}
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${filter === f.key ? 'bg-white/20 text-white' : 'bg-surface-container text-on-surface-variant'}`}>{f.count}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant">event_busy</span>
          </div>
          <h3 className="font-headline-sm text-[18px] text-on-surface mb-2">No events found</h3>
          <p className="text-[14px] text-on-surface-variant mb-4">Create your first opportunity to get started.</p>
          <button onClick={() => { setEditingEvent(null); setModalOpen(true); }} className="bg-primary text-white px-5 py-2.5 rounded-xl font-label-md text-[14px] hover:shadow-lg transition-all cursor-pointer">Create Event</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(e => {
            const theme = categoryThemes[e.category] || { bg: 'bg-surface-container', text: 'text-on-surface-variant', icon: 'event' };
            const fill = Math.round((e.registered / e.capacity) * 100);
            return (
              <div key={e.id} className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden card-hover group">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${theme.bg} ${theme.text} flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-[24px]">{theme.icon}</span>
                    </div>
                    <div className="flex gap-1">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${e.status === 'upcoming' ? 'bg-blue-50 text-blue-700' : e.status === 'ongoing' ? 'bg-emerald-50 text-emerald-700' : 'bg-surface-container text-on-surface-variant'}`}>
                        {e.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-[18px] font-bold text-on-surface mb-2">{e.title}</h3>
                  <p className="text-[13px] text-on-surface-variant mb-4 line-clamp-2 leading-relaxed">{e.desc}</p>
                  <div className="flex items-center gap-4 text-[13px] text-on-surface-variant mb-5">
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">calendar_today</span>{e.date}</span>
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">category</span>{e.category}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-md text-[13px] text-on-surface">{e.registered}/{e.capacity} registered</span>
                    <span className="text-[12px] text-on-surface-variant">{fill}%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-blue-400 h-full rounded-full transition-all" style={{ width: fill + '%' }} />
                  </div>
                </div>
                <div className="px-6 py-3 bg-surface-container-low/50 border-t border-outline-variant flex gap-2">
                  <button onClick={() => { setEditingEvent(e); setModalOpen(true); }} className="flex-1 py-2 border border-outline-variant rounded-xl font-label-md text-[12px] text-on-surface hover:bg-surface-variant transition-all cursor-pointer">Edit</button>
                  <button onClick={() => registerForEvent(e.id)} className="flex-1 py-2 bg-primary text-white rounded-xl font-label-md text-[12px] hover:shadow-md hover:brightness-110 transition-all cursor-pointer">Register</button>
                  <button onClick={() => { if (window.confirm('Delete this event?')) deleteEvent(e.id); }} className="py-2 px-3 border border-error/20 text-error rounded-xl hover:bg-error/5 transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && <EventFormModal event={editingEvent} onClose={() => { setModalOpen(false); setEditingEvent(null); }} />}
    </div>
  );
}
