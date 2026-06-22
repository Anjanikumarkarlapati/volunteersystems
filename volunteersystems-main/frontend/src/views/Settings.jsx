import { useState } from 'react';
import { useData } from '../context/DataContext';

export default function Settings() {
  const { showToast } = useData();
  const [theme, setTheme] = useState('Light');
  const [notifications, setNotifications] = useState({
    email: true, sms: true, digest: false, lateAlerts: true, training: true,
  });

  const toggleNotif = (key) => setNotifications(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg text-[32px] font-bold text-on-surface mb-1">Settings</h1>
          <p className="text-[15px] text-on-surface-variant">Configure your volunteer management system.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Organization */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">business</span>
            </div>
            <h3 className="font-headline-sm text-[20px] font-bold text-on-surface">Organization</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[13px] text-on-surface-variant font-medium mb-1.5 block">Organization Name</label>
              <input defaultValue="Regional Volunteer Network" className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px]" />
            </div>
            <div>
              <label className="text-[13px] text-on-surface-variant font-medium mb-1.5 block">Email</label>
              <input defaultValue="admin@regionalvolunteers.org" className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px]" />
            </div>
            <div>
              <label className="text-[13px] text-on-surface-variant font-medium mb-1.5 block">Timezone</label>
              <select className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px]">
                <option>UTC-5 (Eastern)</option>
                <option>UTC-6 (Central)</option>
                <option>UTC-7 (Mountain)</option>
                <option>UTC-8 (Pacific)</option>
              </select>
            </div>
            <button onClick={() => showToast('Settings saved!')} className="w-full py-2.5 bg-primary text-white rounded-xl text-[13px] font-semibold hover:shadow-md transition-all cursor-pointer mt-2">Save Changes</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </div>
            <h3 className="font-headline-sm text-[20px] font-bold text-on-surface">Notifications</h3>
          </div>
          <div className="space-y-1">
            {[
              { key: 'email', label: 'Email notifications for new applications' },
              { key: 'sms', label: 'SMS reminders for upcoming shifts' },
              { key: 'digest', label: 'Weekly volunteer activity digest' },
              { key: 'lateAlerts', label: 'Late check-in alerts' },
              { key: 'training', label: 'New training module notifications' },
            ].map(item => (
              <label key={item.key} className="flex items-center gap-3 py-3 cursor-pointer group border-b border-outline-variant/50 last:border-0">
                <div
                  onClick={() => toggleNotif(item.key)}
                  className={`w-11 h-6 rounded-full relative transition-all shrink-0 cursor-pointer ${notifications[item.key] ? 'bg-primary' : 'bg-surface-container-highest'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-all absolute top-0.5 ${notifications[item.key] ? 'left-[22px]' : 'left-0.5'}`} />
                </div>
                <span className="text-[14px] text-on-surface">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">palette</span>
            </div>
            <h3 className="font-headline-sm text-[20px] font-bold text-on-surface">Appearance</h3>
          </div>
          <div>
            <label className="text-[13px] text-on-surface-variant font-medium mb-3 block">Theme</label>
            <div className="flex gap-3">
              {['Light', 'Dark', 'System'].map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all cursor-pointer border ${
                    theme === t
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant border-outline-variant hover:bg-surface-variant'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">delete_sweep</span>
            </div>
            <h3 className="font-headline-sm text-[20px] font-bold text-on-surface">Data Management</h3>
          </div>
          <p className="text-[13px] text-on-surface-variant mb-4">Manage your organization's data and storage.</p>
          <button
            onClick={() => { if (window.confirm('This will reset all demo data. Are you sure?')) { localStorage.removeItem('volunteerlink_data_react'); window.location.reload(); } }}
            className="w-full py-2.5 border border-rose-200 text-rose-600 rounded-xl text-[13px] font-medium hover:bg-rose-50 transition-all cursor-pointer"
          >
            Reset Demo Data
          </button>
        </div>
      </div>
    </div>
  );
}
