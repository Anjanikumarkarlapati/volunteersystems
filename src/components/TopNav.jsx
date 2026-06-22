import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

const links = [
  { view: 'dashboard', label: 'Dashboard' },
  { view: 'opportunities', label: 'Opportunities' },
  { view: 'volunteers', label: 'Volunteers' },
  { view: 'scheduling', label: 'Scheduling' },
];

export default function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentView = location.pathname.replace('/', '') || 'dashboard';
  const { setMobileSidebarOpen, showToast, user, logout } = useData();

  return (
    <header className="bg-surface-container-lowest/80 backdrop-blur-md sticky top-0 z-10 w-full h-16 border-b border-outline-variant flex items-center justify-between px-gutter shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="font-headline-md text-[22px] font-bold cursor-pointer" onClick={() => navigate('/dashboard')}>
          <span className="gradient-text">VolunteerLink</span>
        </span>
        <div className="hidden md:flex items-center ml-6">
          <div className="flex gap-1 bg-surface-container p-1 rounded-xl">
            {links.map(link => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => navigate(link.view === 'dashboard' ? '/dashboard' : `/${link.view}`)}
                  className={`px-4 py-2 rounded-lg font-label-md text-[13px] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => showToast('No new notifications')} className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant rounded-xl transition-all cursor-pointer relative">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface-container-lowest" />
        </button>
        <button onClick={() => navigate('/opportunities')} className="hidden sm:flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl font-label-md text-[13px] hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Create Event
        </button>
        <div className="relative group">
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-outline-variant cursor-pointer bg-primary text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'JC'}
          </div>
          <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-outline-variant">
              <div className="font-label-md text-[14px] text-on-surface">{user?.name || 'Jane Cooper'}</div>
              <div className="text-[12px] text-on-surface-variant">{user?.email || 'coordinator@org.com'}</div>
            </div>
            <button onClick={() => { navigate('/settings'); }} className="w-full text-left px-4 py-2 text-[14px] text-on-surface-variant hover:bg-surface-variant transition-colors cursor-pointer">Settings</button>
            <button onClick={() => { logout(); navigate('/'); }} className="w-full text-left px-4 py-2 text-[14px] text-error hover:bg-error/5 transition-colors cursor-pointer">Sign Out</button>
          </div>
        </div>
      </div>
    </header>
  );
}
