import { useState, useEffect } from 'react';
import { getAttendance, updateAttendanceAPI } from '../api/attendance';
import { getVolunteers } from '../api/volunteer';
import { getEvents } from '../api/event';

const statusStyles = {
  present: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Checked In', dot: 'bg-emerald-500' },
  late: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Arrived Late', dot: 'bg-amber-500' },
  absent: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', label: 'Absent', dot: 'bg-rose-500' },
  pending: { bg: 'bg-surface-container', text: 'text-on-surface-variant', border: 'border-outline-variant', label: 'Pending', dot: 'bg-on-surface-variant' },
};

const avatarColors = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#db2777', '#0891b2'];

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const attRes = await getAttendance();
    const volRes = await getVolunteers();
    const eventRes = await getEvents();

    setAttendance(attRes.data);
    setVolunteers(volRes.data);
    setEvents(eventRes.data);
  } catch (error) {
    console.log(error);
  }
};

  const activeEvents = events.filter(e => e.status !== 'completed');
  let list = attendance;
  if (filter !== 'all') list = list.filter(a => a.eventId === filter);

  const counts = {
    present: attendance.filter(a => a.status === 'present').length,
    late: attendance.filter(a => a.status === 'late').length,
    absent: attendance.filter(a => a.status === 'absent').length,
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg text-[32px] font-bold text-on-surface mb-1">Live Attendance Monitor</h1>
          <p className="text-[15px] text-on-surface-variant">Track check-ins, late arrivals, and absences in real time.</p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-[12px] font-bold rounded-full border border-emerald-200"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Present</span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 text-[12px] font-bold rounded-full border border-amber-200"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> Late</span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 text-[12px] font-bold rounded-full border border-rose-200"><span className="w-1.5 h-1.5 bg-rose-500 rounded-full" /> Absent</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[
          { label: 'Checked In', value: counts.present, color: 'emerald', icon: 'check_circle' },
          { label: 'Arrived Late', value: counts.late, color: 'amber', icon: 'schedule' },
          { label: 'Absent', value: counts.absent, color: 'rose', icon: 'cancel' },
        ].map((c, i) => (
          <div key={i} className={`bg-${c.color}-50 border border-${c.color}-200 p-6 rounded-2xl flex items-center justify-between`}>
            <div>
              <div className="font-headline-sm text-[28px] font-bold" style={{ color: c.color === 'emerald' ? '#059669' : c.color === 'amber' ? '#d97706' : '#e11d48' }}>{c.value}</div>
              <div className="text-[13px] font-medium" style={{ color: c.color === 'emerald' ? '#047857' : c.color === 'amber' ? '#b45309' : '#be123c' }}>{c.label}</div>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : c.color === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'}`}>
              <span className="material-symbols-outlined text-[24px]">{c.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden card-hover">
        <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
          <h2 className="font-headline-sm text-[20px] font-bold text-on-surface">Today's Records</h2>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-2 bg-surface-container-low border border-outline-variant rounded-xl text-[13px] transition-all">
            <option value="all">All Events</option>
            {activeEvents.map(e => <option key={e.id} value={e.id}>{e.title}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="bg-surface-container-low/50">
              <th className="px-6 py-4 font-label-md text-[12px] text-on-surface-variant uppercase tracking-wider">Volunteer</th>
              <th className="px-6 py-4 font-label-md text-[12px] text-on-surface-variant uppercase tracking-wider">Event</th>
              <th className="px-6 py-4 font-label-md text-[12px] text-on-surface-variant uppercase tracking-wider">Scheduled</th>
              <th className="px-6 py-4 font-label-md text-[12px] text-on-surface-variant uppercase tracking-wider">Check In</th>
              <th className="px-6 py-4 font-label-md text-[12px] text-on-surface-variant uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-label-md text-[12px] text-on-surface-variant uppercase tracking-wider">Update</th>
            </tr></thead>
            <tbody className="divide-y divide-outline-variant">
              {list.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-12 text-center text-[14px] text-on-surface-variant">No attendance records for today.</td></tr>
              ) : list.map(a => {
                const vol = volunteers.find(v => v._id === a.volunteerId);
                const evt = events.find(e => e._id === a.eventId);
                if (!vol || !evt) return null;
                const st = statusStyles[a.status];
                const ci = Math.floor(Math.random() * avatarColors.length);
                return (
                  <tr key={a._id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: avatarColors[ci] }}>{vol.firstName[0]}{vol.lastName[0]}</div>
                        <div><div className="text-[14px] font-semibold text-on-surface">{vol.firstName} {vol.lastName}</div><div className="text-[12px] text-on-surface-variant">{vol.tier}</div></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-on-surface">{evt.title}</td>
                    <td className="px-6 py-4 text-[14px] text-on-surface">{a.scheduled}</td>
                    <td className="px-6 py-4 text-[14px] text-on-surface">{a.checkedIn || <span className="text-on-surface-variant">--</span>}</td>
                    <td className="px-6 py-4"><span className={`px-3 py-1.5 rounded-full text-[11px] font-bold ${st.bg} ${st.text} ${st.border} border flex items-center gap-1.5 w-fit`}><span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />{st.label}</span></td>
                    <td className="px-6 py-4">
                      <select value={a.status} onChange={async e => {
  try {
    const newStatus = e.target.value;

    await updateAttendanceAPI(a._id, {
      ...a,
      status: newStatus
    });

    setAttendance(
      attendance.map(item =>
        item._id === a._id
          ? { ...item, status: newStatus }
          : item
      )
    );
  } catch (error) {
    console.log(error);
  }
}} className="px-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-xl text-[12px] focus:outline-none focus:border-primary">
                        <option value="present">Present</option>
                        <option value="late">Late</option>
                        <option value="absent">Absent</option>
                        <option value="pending">Pending</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
