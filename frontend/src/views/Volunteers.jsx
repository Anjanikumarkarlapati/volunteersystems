import { useState, useEffect } from 'react';
import { getVolunteers, deleteVolunteer  } from '../api/volunteer';
import VolunteerFormModal from '../components/VolunteerFormModal';

const tierColors = {
  'New Member': 'bg-blue-50 text-blue-700',
  'Tier 1 Volunteer': 'bg-emerald-50 text-emerald-700',
  'Tier 2 Volunteer': 'bg-amber-50 text-amber-700',
  'Lead Coordinator': 'bg-violet-50 text-violet-700',
};

const avatarColors = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#db2777', '#0891b2', '#dc2626', '#0d9488'];

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVol, setEditingVol] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await getVolunteers();
        setVolunteers(response.data);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };

    fetchVolunteers();
  }, []);

  const filtered = volunteers.filter(v =>
    `${v.firstName} ${v.lastName} ${v.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg text-[32px] font-bold text-on-surface mb-1">Volunteers</h1>
          <p className="text-[15px] text-on-surface-variant">Directory of all registered volunteers.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search volunteers..." className="w-56 pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all" />
          </div>
          <button onClick={() => { setEditingVol(null); setModalOpen(true); }} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-label-md text-[14px] hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-sm">
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            Add
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant">person_search</span>
          </div>
          <h3 className="font-headline-sm text-[18px] text-on-surface mb-2">No volunteers found</h3>
          <p className="text-[14px] text-on-surface-variant">Try a different search or add a new volunteer.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(v => {
            const ci = Math.floor(Math.random() * avatarColors.length);
            return (
              <div key={v._id} className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 card-hover">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-sm" style={{ background: avatarColors[ci] }}>
                    {v.firstName[0]}{v.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-label-md text-[15px] font-semibold text-on-surface truncate">{v.firstName} {v.lastName}</div>
                    <div className="text-[13px] text-on-surface-variant truncate">{v.email}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${tierColors[v.tier] || 'bg-surface-container text-on-surface-variant'}`}>{v.tier}</span>
                  <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${v.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-surface-container text-on-surface-variant'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full inline-block mr-1.5 ${v.status === 'Active' ? 'bg-emerald-500' : 'bg-on-surface-variant'}`} />
                    {v.status}
                  </span>
                </div>
                <div className="flex gap-2 pt-4 border-t border-outline-variant">
                  <button onClick={() => { setEditingVol(v); setModalOpen(true); }} className="flex-1 py-2.5 border border-outline-variant rounded-xl font-label-md text-[12px] text-on-surface hover:bg-surface-variant transition-all cursor-pointer">Edit</button>
                  <button
  onClick={async () => {
    if (window.confirm('Remove this volunteer?')) {
      try {
        await deleteVolunteer(v._id);
        setVolunteers(volunteers.filter(vol => vol._id !== v._id));
      } catch (error) {
        console.log('Delete error:', error);
      }
    }
  }}
  className="flex-1 py-2.5 border border-error/20 text-error rounded-xl font-label-md text-[12px] hover:bg-error/5 transition-all cursor-pointer"
>
  Remove
</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && <VolunteerFormModal volunteer={editingVol} onClose={() => { setModalOpen(false); setEditingVol(null); }} />}
    </div>
  );
}
