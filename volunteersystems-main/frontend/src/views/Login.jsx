import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      if (success) navigate('/dashboard');
      else { setError('Invalid credentials'); setLoading(false); }
    }, 800);
  };

  const handleDemoLogin = () => {
    setEmail('coordinator@volunteerlink.org');
    setPassword('demo1234');
    setLoading(true);
    setTimeout(() => { login('coordinator@volunteerlink.org', 'demo1234'); navigate('/dashboard'); }, 600);
  };

  return (
    <div className="min-h-screen bg-surface flex">
      <div className="hidden lg:flex w-[480px] bg-white relative overflow-hidden items-center justify-center p-12 border-r border-outline-variant">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="relative text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[32px] text-white">volunteer_activism</span>
          </div>
          <h1 className="font-headline-lg text-[36px] font-bold text-on-surface mb-3">VolunteerLink</h1>
          <p className="text-[15px] text-on-surface-variant leading-relaxed">
            Your volunteer coordination hub. Manage events, track attendance, and engage your community.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: '10K+', label: 'Volunteers' },
              { value: '500+', label: 'Orgs' },
              { value: '50K+', label: 'Events' },
            ].map(s => (
              <div key={s.label} className="text-center p-3 bg-surface-container-lowest rounded-xl border border-outline-variant">
                <div className="text-[20px] font-bold text-primary">{s.value}</div>
                <div className="text-[11px] text-on-surface-variant">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm animate-slide-up">
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors mb-10 cursor-pointer text-[13px]">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to home
          </button>

          <div className="mb-7">
            <h2 className="font-headline-lg text-[28px] font-bold text-on-surface mb-1">Sign In</h2>
            <p className="text-[14px] text-on-surface-variant">Enter your credentials to access your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[13px] font-medium text-on-surface-variant mb-1.5 block">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@organization.org" className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] text-on-surface transition-all" />
            </div>
            <div>
              <label className="text-[13px] font-medium text-on-surface-variant mb-1.5 block">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] text-on-surface transition-all" />
            </div>

            {error && (
              <div className="p-3 bg-error/5 border border-error/10 rounded-xl text-[13px] text-error flex items-center gap-2 animate-slide-down">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary text-white rounded-xl text-[14px] font-semibold shadow-sm hover:shadow-md hover:brightness-110 active:brightness-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer">
              {loading ? <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button onClick={handleDemoLogin} className="text-[13px] text-primary font-medium hover:underline transition-colors cursor-pointer">
              Use Demo Credentials
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant text-center">
            <p className="text-[13px] text-on-surface-variant">
              Don't have an account? <span className="text-primary font-medium cursor-pointer hover:underline">Contact your admin</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
