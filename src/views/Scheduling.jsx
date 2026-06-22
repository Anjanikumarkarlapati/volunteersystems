import { useState } from 'react';
import { useData } from '../context/DataContext';
import ShiftModal from '../components/ShiftModal';

export default function Scheduling() {
  const { data, deleteShift } = useData();
  const [calMonthOffset, setCalMonthOffset] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + calMonthOffset;
  const calDate = new Date(year, month, 1);
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const firstDay = calDate.getDay();
  const daysInMonth = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 0).getDate();
  const prevDays = new Date(calDate.getFullYear(), calDate.getMonth(), 0).getDate();

  const getShiftsForDate = (day) => {
    const dateStr = calDate.getFullYear() + '-' + String(calDate.getMonth()+1).padStart(2,'0') + '-' + String(day).padStart(2,'0');
    return data.shifts.filter(s => s.date === dateStr);
  };

  const sorted = [...data.shifts].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push(<div key={`p${i}`} className="bg-surface/50 p-3 min-h-[110px] opacity-40"><span className="text-[13px] text-on-surface-variant">{prevDays - i}</span></div>);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dayShifts = getShiftsForDate(d);
    const isToday = d === now.getDate() && calDate.getMonth() === now.getMonth() && calDate.getFullYear() === now.getFullYear();
    const cellColors = ['bg-blue-50 text-blue-700 border-blue-200', 'bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-amber-50 text-amber-700 border-amber-200'];
    cells.push(
      <div key={`d${d}`} className={`bg-surface p-3 min-h-[110px] relative ${isToday ? 'bg-blue-50/50' : ''}`}>
        <span className={`text-[13px] font-semibold ${isToday ? 'text-primary' : 'text-on-surface'}`}>{d}</span>
        <div className="mt-2 space-y-1">
          {dayShifts.slice(0, 3).map(s => {
            const vol = data.volunteers.find(v => v.id === s.volunteerId);
            const evt = data.events.find(e => e.id === s.eventId);
            if (!vol || !evt) return null;
            return (
              <div key={s.id} className={`${cellColors[s.id % 3]} px-2 py-1 rounded-md text-[10px] font-medium truncate border cursor-default hover:brightness-95`} title={`${vol.firstName} ${vol.lastName} - ${evt.title} @ ${s.time}`}>
                <span className="font-semibold">{s.time}</span> {evt.title}
              </div>
            );
          })}
          {dayShifts.length > 3 && <div className="text-[10px] text-on-surface-variant font-medium px-2">+{dayShifts.length - 3} more</div>}
        </div>
      </div>
    );
  }
  const total = firstDay + daysInMonth;
  const remaining = (7 - (total % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    cells.push(<div key={`n${i}`} className="bg-surface/50 p-3 min-h-[110px] opacity-40"><span className="text-[13px] text-on-surface-variant">{i}</span></div>);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg text-[32px] font-bold text-on-surface mb-1">Shift Scheduling</h1>
          <p className="text-[15px] text-on-surface-variant">Manage upcoming events, volunteer capacity, and live attendance tracking.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-outline-variant p-1 rounded-xl shadow-sm">
          {['Month', 'Week', 'Day'].map(v => (
            <button key={v} className={`px-5 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${v === 'Month' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}>{v}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-primary p-6 rounded-2xl text-white shadow-lg shadow-primary/20">
          <div className="text-[12px] font-medium uppercase tracking-wider text-white/70 mb-3">Active Shifts</div>
          <div className="text-[36px] font-bold text-white mb-1" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{data.shifts.length}</div>
          <div className="flex items-center gap-1.5 text-[13px] text-white/70"><span className="material-symbols-outlined text-[16px]">trending_up</span> Active assignments</div>
        </div>
        <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-lg shadow-emerald-200">
          <div className="text-[12px] font-medium uppercase tracking-wider text-white/70 mb-3">Capacity Fill</div>
          <div className="text-[36px] font-bold text-white mb-1" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>86%</div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden mt-2"><div className="bg-white h-full rounded-full" style={{width:'86%'}}/></div>
        </div>
        <div className="md:col-span-2 bg-white rounded-2xl border border-outline-variant p-6 card-hover flex items-center gap-6">
          <div className="flex-1">
            <h3 className="text-[20px] font-bold text-on-surface mb-2" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Live Attendance Tracking</h3>
            <p className="text-[14px] text-on-surface-variant mb-4">12 volunteers currently checked in across 3 ongoing events.</p>
            <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:shadow-lg transition-all cursor-pointer shadow-sm">
              Open Monitor <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
          <div className="relative w-28 h-28 hidden sm:block">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200" strokeWidth="4"/>
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="4" strokeDasharray="75,100" strokeLinecap="round" transform="rotate(-90 18 18)"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[22px] font-bold text-primary" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>75%</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant overflow-hidden mb-8 card-hover">
        <div className="px-6 py-4 flex items-center justify-between border-b border-outline-variant bg-white">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-sm text-[20px] font-bold text-on-surface">{monthNames[calDate.getMonth()]} {calDate.getFullYear()}</h2>
            <div className="flex items-center gap-1">
              <button onClick={() => setCalMonthOffset(calMonthOffset - 1)} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-surface-variant transition-colors cursor-pointer"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
              <button onClick={() => setCalMonthOffset(calMonthOffset + 1)} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-surface-variant transition-colors cursor-pointer"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
            </div>
          </div>
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-label-md text-[13px] hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add</span> Assign Shift
          </button>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="calendar-grid">
            {dayNames.map(d => <div key={d} className="bg-white border-b border-outline-variant py-3 text-center text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">{d}</div>)}
          </div>
          <div className="calendar-grid border-t border-outline-variant">{cells}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant overflow-hidden card-hover">
        <div className="px-6 py-4 border-b border-outline-variant">
          <h2 className="text-[18px] font-bold text-on-surface" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Upcoming Shifts</h2>
        </div>
        <div className="divide-y divide-outline-variant">
          {sorted.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-14 h-14 bg-surface-container rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-[28px] text-on-surface-variant">calendar_month</span>
              </div>
              <p className="text-[14px] text-on-surface-variant">No shifts assigned yet.</p>
            </div>
          ) : sorted.map(s => {
            const vol = data.volunteers.find(v => v.id === s.volunteerId);
            const evt = data.events.find(e => e.id === s.eventId);
            if (!vol || !evt) return null;
            return (
              <div key={s.id} className="px-6 py-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">{vol.firstName[0]}{vol.lastName[0]}</div>
                  <div>
                    <div className="font-label-md text-[14px] font-semibold text-on-surface">{vol.firstName} {vol.lastName}</div>
                    <div className="text-[13px] text-on-surface-variant">{evt.title}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-label-md text-[14px] text-on-surface">{s.date}</div>
                    <div className="text-[13px] text-on-surface-variant">{s.time}</div>
                  </div>
                  <button onClick={() => { if (window.confirm('Remove this shift?')) deleteShift(s.id); }} className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-error/5 hover:text-error transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modalOpen && <ShiftModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
