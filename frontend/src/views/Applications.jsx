import { useState, useEffect } from 'react';
import {
  getApplications,
  approveApplication,
  rejectApplication,
  deleteApplication
} from '../api/application';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('all');
  useEffect(() => {
  fetchApplications();
}, []);

const fetchApplications = async () => {
  try {
    const res = await getApplications();
    setApplications(res.data);
  } catch (error) {
    console.log(error);
  }
};

  const filtered = filter === 'all'
  ? applications
  : applications.filter(a => a.status === filter);
  const counts = {
  all: applications.length,
  pending: applications.filter(a => a.status === 'pending').length,
  approved: applications.filter(a => a.status === 'approved').length,
  rejected: applications.filter(a => a.status === 'rejected').length,
};
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg text-[32px] font-bold text-on-surface mb-1">Applications</h1>
          <p className="text-[15px] text-on-surface-variant">Review and process volunteer applications.</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {['all', 'pending', 'approved', 'rejected'].map(s => {
          const colors = { all: 'bg-primary text-white', pending: 'bg-amber-50 text-amber-700', approved: 'bg-emerald-50 text-emerald-700', rejected: 'bg-rose-50 text-rose-700' };
          return (
            <button key={s} onClick={() => setFilter(s)} className={`px-5 py-2.5 rounded-xl text-[13px] transition-all cursor-pointer flex items-center gap-2 font-medium ${filter === s ? colors[s] + ' shadow-md' : 'bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-variant'}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${filter === s ? 'bg-white/20' : 'bg-surface-container text-on-surface-variant'}`}>{counts[s]}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant">inbox</span>
          </div>
          <h3 className="font-headline-sm text-[18px] text-on-surface mb-2">No applications</h3>
          <p className="text-[14px] text-on-surface-variant">There are no {filter === 'all' ? '' : filter} applications to review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(a => (
            <div key={a.id} className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 card-hover animate-fade-in">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-blue-400 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {a.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="font-label-md text-[15px] font-semibold text-on-surface">{a.name}</div>
                  <div className="text-[13px] text-on-surface-variant">{a.email}</div>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                  a.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  a.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  {a.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[13px] text-on-surface-variant mb-5">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">calendar_today</span>Applied: {a.date}</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">badge</span>{a.tier}</span>
              </div>
              <div className="flex gap-2">
                {a.status === 'pending' ? (
                  <>
                    <button onClick={async () => {
  try {
    await approveApplication(a._id);
    setApplications(applications.map(app =>
      app._id === a._id ? { ...app, status: 'approved' } : app
    ));
  } catch (error) {
    console.log(error);
  }
}}className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-on-secondary rounded-xl font-label-md text-[12px] hover:shadow-lg hover:shadow-emerald-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
                      <span className="flex items-center justify-center gap-1.5"><span className="material-symbols-outlined text-[16px]">check</span>Approve</span>
                    </button>
                    <button onClick={async () => {
  try {
    await rejectApplication(a._id);
    setApplications(applications.map(app =>
      app._id === a._id ? { ...app, status: 'rejected' } : app
    ));
  } catch (error) {
    console.log(error);
  }
}} className="flex-1 py-2.5 border border-rose-200 text-rose-600 rounded-xl font-label-md text-[12px] hover:bg-rose-50 transition-all cursor-pointer">
                      <span className="flex items-center justify-center gap-1.5"><span className="material-symbols-outlined text-[16px]">close</span>Reject</span>
                    </button>
                  </>
                ) : (
                  <button onClick={async () => {
  if (window.confirm('Remove this application?')) {
    try {
      await deleteApplication(a._id);
      setApplications(applications.filter(app => app._id !== a._id));
    } catch (error) {
      console.log(error);
    }
  }
 }} className="flex-1 py-2.5 border border-outline-variant rounded-xl font-label-md text-[12px] text-on-surface-variant hover:bg-surface-variant transition-all cursor-pointer">Remove</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
