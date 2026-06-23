import { useData } from '../context/DataContext';
import { useLocation, useNavigate } from 'react-router-dom';

const links = [
  { view: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
  { view: 'opportunities', icon: 'volunteer_activism', label: 'Opportunities' },
  { view: 'volunteers', icon: 'groups', label: 'Volunteers' },
  { view: 'scheduling', icon: 'calendar_month', label: 'Scheduling' },
  { view: 'attendance', icon: 'fact_check', label: 'Attendance' },
  { view: 'applications', icon: 'assignment_ind', label: 'Applications' },
  { view: 'training', icon: 'school', label: 'Training' },
  { view: 'communications', icon: 'mail', label: 'Communications' },
  { view: 'settings', icon: 'settings', label: 'Settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentView = location.pathname.replace('/', '') || 'dashboard';
  const { showToast, mobileSidebarOpen, setMobileSidebarOpen } = useData();

  const handleNav = (view) => {
    navigate(view === 'dashboard' ? '/dashboard' : `/${view}`);
    setMobileSidebarOpen(false);
  };

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
          <span className="material-symbols-outlined text-white text-[22px]">volunteer_activism</span>
        </div>
        <div>
          <h2 className="font-headline-sm text-[18px] font-bold text-on-surface">Coordinator Hub</h2>
          <span className="text-[12px] text-on-surface-variant">Regional Office</span>
        </div>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(link => {
          const isActive = currentView === link.view;
          return (
            <button
              key={link.view}
              onClick={() => handleNav(link.view)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] ${isActive ? '' : ''}`}>
                {link.icon}
              </span>
              <span className="font-label-md text-[14px]">{link.label}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />}
            </button>
          );
        })}
      </nav>
      <button
        onClick={() => showToast('Opening support portal...')}
        className="mt-auto flex items-center justify-center gap-2.5 bg-surface-variant text-on-surface py-3 rounded-xl font-label-md text-[14px] hover:bg-surface-container-high transition-all cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">support_agent</span>
        Support Portal
      </button>
    </>
  );

  return (
    <>
      <aside className="w-64 h-screen sticky top-0 left-0 bg-surface-container-lowest border-r border-outline-variant flex-col p-5 gap-2 hidden md:flex shadow-sm">
        {sidebarContent}
      </aside>
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
      )}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-40 md:hidden flex flex-col p-5 gap-2 transition-transform duration-300 shadow-2xl ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-white text-[22px]">volunteer_activism</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-[18px] font-bold text-on-surface">Coordinator Hub</h2>
              <span className="text-[12px] text-on-surface-variant">Regional Office</span>
            </div>
          </div>
          <button onClick={() => setMobileSidebarOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-variant transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {links.map(link => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => handleNav(link.view)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">{link.icon}</span>
                <span className="font-label-md text-[14px]">{link.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
