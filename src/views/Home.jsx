import { useNavigate } from 'react-router-dom';

const features = [
  { icon: 'calendar_month', title: 'Smart Scheduling', desc: 'Drag-and-drop shift planning with auto-conflict detection and capacity management.' },
  { icon: 'fact_check', title: 'Live Attendance', desc: 'Real-time check-ins with QR codes, late notifications, and instant status updates.' },
  { icon: 'groups', title: 'Volunteer Directory', desc: 'Comprehensive profiles with skills tracking, availability, and engagement history.' },
  { icon: 'school', title: 'Training & Certifications', desc: 'Built-in module management with enrollment tracking and completion certificates.' },
  { icon: 'mail', title: 'Communications Hub', desc: 'Broadcast announcements, direct messaging, and automated shift reminders.' },
  { icon: 'analytics', title: 'Impact Analytics', desc: 'Beautiful dashboards with volunteer hours, retention rates, and program metrics.' },
];

const stats = [
  { value: '10K+', label: 'Active Volunteers' },
  { value: '500+', label: 'Organizations' },
  { value: '50K+', label: 'Events Managed' },
  { value: '2M+', label: 'Hours Tracked' },
];

const testimonials = [
  { name: 'Maria Gonzalez', role: 'Program Director, City Relief', text: 'VolunteerLink transformed how we manage our volunteer programs. We went from spreadsheets to seamless coordination in days.', avatar: 'MG' },
  { name: 'David Chen', role: 'Volunteer Coordinator, Green Earth', text: 'The attendance tracking alone saved us 10 hours a week. Our volunteers love the easy check-in system.', avatar: 'DC' },
  { name: 'Sarah Thompson', role: 'Executive Director, LearnForward', text: 'We scaled from 50 to 500 volunteers without adding admin overhead. This platform is a game-changer.', avatar: 'ST' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-headline-md text-[24px] font-bold gradient-text">VolunteerLink</span>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/login')} className="px-5 py-2 text-on-surface-variant hover:text-primary font-label-md text-[14px] transition-colors cursor-pointer">Log in</button>
            <button onClick={() => navigate('/login')} className="px-5 py-2 bg-primary text-white rounded-full font-label-md text-[14px] hover:shadow-lg hover:shadow-primary/30 transition-all cursor-pointer">Get Started Free</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Trusted by 500+ organizations worldwide
          </div>
          <h1 className="font-headline-lg text-[56px] md:text-[72px] font-extrabold text-on-surface leading-[1.1] mb-6 animate-slide-up">
            Volunteer Management
            <br />
            <span className="gradient-text">Made Simple</span>
          </h1>
          <p className="text-[18px] text-on-surface-variant max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            The all-in-one platform to recruit, schedule, track, and engage your volunteers.
            From small nonprofits to large-scale programs — we've got you covered.
          </p>
          <div className="flex items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button onClick={() => navigate('/login')} className="px-8 py-3.5 gradient-primary text-white rounded-full font-label-md text-[16px] shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all cursor-pointer">
              Start Free Trial
            </button>
            <button className="px-8 py-3.5 border-2 border-outline-variant text-on-surface rounded-full font-label-md text-[16px] hover:bg-surface-container hover:border-outline transition-all cursor-pointer flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">play_circle</span>
              Watch Demo
            </button>
          </div>
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-on-surface-variant animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="flex items-center gap-2"><span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span> No credit card</span>
            <span className="flex items-center gap-2"><span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span> Free 14-day trial</span>
            <span className="flex items-center gap-2"><span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span> Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-8 text-center card-hover">
                <div className="font-headline-lg text-[40px] font-bold gradient-text">{s.value}</div>
                <div className="text-[15px] text-on-surface-variant mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-[40px] font-bold text-on-surface mb-4">Everything You Need</h2>
            <p className="text-[18px] text-on-surface-variant max-w-2xl mx-auto">Powerful tools that streamline every aspect of volunteer coordination.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-8 card-hover group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">{f.icon}</span>
                </div>
                <h3 className="font-headline-sm text-[20px] text-on-surface mb-2">{f.title}</h3>
                <p className="text-[15px] text-on-surface-variant leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-[40px] font-bold text-on-surface mb-4">Loved by Program Leaders</h2>
            <p className="text-[18px] text-on-surface-variant max-w-2xl mx-auto">See what organizations are saying about VolunteerLink.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-8 card-hover">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => <span key={j} className="material-symbols-outlined text-[20px] text-yellow-500">star</span>)}
                </div>
                <p className="text-[15px] text-on-surface-variant leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">{t.avatar}</div>
                  <div>
                    <div className="font-label-md text-[14px] text-on-surface">{t.name}</div>
                    <div className="text-[13px] text-on-surface-variant">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="gradient-primary rounded-3xl p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <h2 className="font-headline-lg text-[36px] md:text-[44px] font-bold text-white mb-4 relative">Ready to Simplify Your Workflow?</h2>
            <p className="text-[16px] text-white/80 max-w-xl mx-auto mb-8 relative">Join thousands of organizations using VolunteerLink to make a bigger impact.</p>
            <button onClick={() => navigate('/login')} className="px-8 py-3.5 bg-white text-primary rounded-full font-label-md text-[16px] hover:shadow-xl hover:scale-105 transition-all relative cursor-pointer">
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-outline-variant py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-headline-md text-[20px] font-bold text-on-surface">VolunteerLink</span>
          <span className="text-[14px] text-on-surface-variant">&copy; 2024 Volunteer Management Systems. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
