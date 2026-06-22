import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant px-gutter py-5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="font-headline-sm text-[16px] font-bold">
            <span className="gradient-text">VolunteerLink</span>
          </span>
          <span className="text-[13px] text-on-surface-variant hidden sm:inline">© 2024 Volunteer Management Systems.</span>
        </div>
        <div className="flex flex-wrap justify-center gap-5 text-[13px] text-on-surface-variant">
          <button onClick={() => navigate('/dashboard')} className="hover:text-primary transition-colors cursor-pointer">Dashboard</button>
          <button className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</button>
          <button className="hover:text-primary transition-colors cursor-pointer">Terms of Service</button>
          <button className="hover:text-primary transition-colors cursor-pointer">Support</button>
        </div>
      </div>
    </footer>
  );
}
