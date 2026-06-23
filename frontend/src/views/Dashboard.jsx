import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getEvents,
  getVolunteers,
  getApplications,
  getActivities
} from '../api/dashboard';

export default function Dashboard() {
  const navigate = useNavigate();
 const [events, setEvents] = useState([]);
const [volunteers, setVolunteers] = useState([]);
const [applications, setApplications] = useState([]);
const [activities, setActivities] = useState([]);

useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const [eventsRes, volunteersRes, appsRes, activitiesRes] =
      await Promise.all([
        getEvents(),
        getVolunteers(),
        getApplications(),
        getActivities()
      ]);

    setEvents(eventsRes.data);
    setVolunteers(volunteersRes.data);
    setApplications(appsRes.data);
    setActivities(activitiesRes.data);
  } catch (error) {
    console.log(error);
  }
};
  const activeEvents = events.filter(e => e.status !== 'completed');
  const pendingApps = applications.filter(a => a.status === 'pending');

  const typeIcons = { checkin: 'login', late: 'schedule', application: 'assignment', milestone: 'flag', assignment: 'assignment_ind', event: 'event' };

  const stats = [
    { title: 'Total Volunteers', value: volunteers.length, icon: 'groups', color: 'text-primary', bg: 'bg-primary/10', trend: `+${volunteers.length > 5 ? 3 : 1} this month` },
    { title: 'Active Events', value: activeEvents.length, icon: 'event', color: 'text-emerald-600', bg: 'bg-emerald-50', trend: `+${activeEvents.length > 3 ? 4 : 1} this week` },
    { title: 'Hours Logged', value: '1,247', icon: 'schedule', color: 'text-amber-600', bg: 'bg-amber-50', trend: '+89 this week' },
    { title: 'Pending Apps', value: pendingApps.length, icon: 'pending_actions', color: 'text-rose-600', bg: 'bg-rose-50', trend: 'Needs review' },
  ];

  const quickActions = [
    { icon: 'add_circle', label: 'New Event', action: () => navigate('/opportunities'), bg: 'bg-primary/10 text-primary hover:bg-primary/20' },
    { icon: 'person_add', label: 'Add Volunteer', action: () => navigate('/volunteers'), bg: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' },
    { icon: 'schedule', label: 'Assign Shift', action: () => navigate('/scheduling'), bg: 'bg-amber-50 text-amber-600 hover:bg-amber-100' },
    { icon: 'fact_check', label: 'Attendance', action: () => navigate('/attendance'), bg: 'bg-violet-50 text-violet-600 hover:bg-violet-100' },
    { icon: 'assignment_ind', label: 'Applications', action: () => navigate('/applications'), bg: 'bg-rose-50 text-rose-600 hover:bg-rose-100' },
    { icon: 'school', label: 'Training', action: () => navigate('/training'), bg: 'bg-cyan-50 text-cyan-600 hover:bg-cyan-100' },
  ];

  const categoryColors = {
    Community: 'bg-blue-50 text-blue-600',
    Environment: 'bg-emerald-50 text-emerald-600',
    Education: 'bg-amber-50 text-amber-600',
    Health: 'bg-rose-50 text-rose-600',
    Arts: 'bg-violet-50 text-violet-600',
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-on-surface mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Dashboard</h1>
          <p className="text-[14px] text-on-surface-variant">Overview of your volunteer program at a glance.</p>
        </div>
        <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg">
          {['Week', 'Month', 'Year'].map(p => (
            <button key={p} className={`px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${p === 'Week' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}>{p}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-outline-variant p-5 card-hover">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">{s.title}</span>
              <div className={`w-9 h-9 rounded-lg ${s.bg} ${s.color} flex items-center justify-center`}>
                <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
              </div>
            </div>
            <div className="text-[30px] font-bold text-on-surface" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</div>
            <div className="flex items-center gap-1 mt-1 text-[12px] font-medium text-emerald-600">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              {s.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant p-5 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] font-bold text-on-surface" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Upcoming Events</h3>
            <button onClick={() => navigate('/opportunities')} className="text-[12px] text-primary font-medium hover:underline cursor-pointer">View all</button>
          </div>
          <div className="space-y-2">
            {events.filter(e => e.status !== 'completed').slice(0, 5).map(e => (
              <div key={e.id} className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold ${categoryColors[e.category] || 'bg-surface-container text-on-surface-variant'}`}>
                    {e.title.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-on-surface">{e.title}</div>
                    <div className="text-[12px] text-on-surface-variant">{e.date} &middot; {e.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-semibold text-on-surface">{e.registered}/{e.capacity}</div>
                  <div className="text-[11px] text-on-surface-variant">filled</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-outline-variant p-5 card-hover">
          <h3 className="text-[18px] font-bold text-on-surface mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((qa, i) => (
              <button key={i} onClick={qa.action} className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg ${qa.bg} transition-all cursor-pointer`}>
                <span className="material-symbols-outlined text-[22px]">{qa.icon}</span>
                <span className="text-[10px] font-semibold">{qa.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden card-hover">
        <div className="px-5 py-3.5 border-b border-outline-variant flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-on-surface" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Recent Activity</h3>
          <span className="text-[11px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">Today</span>
        </div>
        <div className="divide-y divide-outline-variant">
          {activities.map((a, i) => (
            <div key={i} className="px-5 py-3.5 flex items-center gap-3 hover:bg-surface-container-low transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.type === 'checkin' ? 'bg-emerald-50 text-emerald-600' : a.type === 'late' ? 'bg-amber-50 text-amber-600' : a.type === 'application' ? 'bg-blue-50 text-blue-600' : 'bg-surface-container text-on-surface-variant'}`}>
                <span className="material-symbols-outlined text-[16px]">{typeIcons[a.type] || 'circle'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[13px] text-on-surface">{a.text}</span>
              </div>
              <span className="text-[12px] text-on-surface-variant whitespace-nowrap">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
