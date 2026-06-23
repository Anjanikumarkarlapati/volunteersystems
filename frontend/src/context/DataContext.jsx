import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const DEFAULT_DATA = {
  events: [
    { id: 1, title: 'Community Kitchen', desc: 'Food preparation and distribution for local families.', date: '2024-10-01', category: 'Community', capacity: 15, status: 'ongoing', registered: 12 },
    { id: 2, title: 'Tree Planting Drive', desc: 'Plant 500 trees at Riverside Park.', date: '2024-10-07', category: 'Environment', capacity: 30, status: 'upcoming', registered: 18 },
    { id: 3, title: 'Youth Mentor Program', desc: 'Mentoring sessions for at-risk youth.', date: '2024-10-03', category: 'Education', capacity: 10, status: 'ongoing', registered: 8 },
    { id: 4, title: 'Gala Fundraiser', desc: 'Annual fundraising gala for community programs.', date: '2024-10-07', category: 'Community', capacity: 50, status: 'upcoming', registered: 35 },
    { id: 5, title: 'Beach Clean-Up', desc: 'Coastal conservation and litter removal.', date: '2024-10-15', category: 'Environment', capacity: 25, status: 'upcoming', registered: 10 },
    { id: 6, title: 'Senior Center Visit', desc: 'Companionship and activity assistance for seniors.', date: '2024-10-12', category: 'Community', capacity: 12, status: 'upcoming', registered: 7 },
    { id: 7, title: 'Food Bank Sorting', desc: 'Sort and pack donations at the regional food bank.', date: '2024-10-20', category: 'Community', capacity: 20, status: 'upcoming', registered: 0 },
    { id: 8, title: 'Literacy Tutoring', desc: 'One-on-one reading support for elementary students.', date: '2024-10-18', category: 'Education', capacity: 8, status: 'upcoming', registered: 5 },
  ],
  volunteers: [
    { id: 1, firstName: 'Marcus', lastName: 'Chen', email: 'marcus.chen@email.com', tier: 'Tier 2 Volunteer', status: 'Active' },
    { id: 2, firstName: 'Sarah', lastName: 'Miller', email: 'sarah.miller@email.com', tier: 'Lead Coordinator', status: 'Active' },
    { id: 3, firstName: 'Daniel', lastName: 'Park', email: 'daniel.park@email.com', tier: 'New Member', status: 'Active' },
    { id: 4, firstName: 'Emily', lastName: 'Rodriguez', email: 'emily.r@email.com', tier: 'Tier 1 Volunteer', status: 'Active' },
    { id: 5, firstName: 'James', lastName: 'Wilson', email: 'j.wilson@email.com', tier: 'Tier 2 Volunteer', status: 'Active' },
    { id: 6, firstName: 'Amara', lastName: 'Okafor', email: 'amara.o@email.com', tier: 'Lead Coordinator', status: 'Active' },
  ],
  shifts: [
    { id: 1, volunteerId: 1, eventId: 1, date: '2024-10-01', time: '09:00' },
    { id: 2, volunteerId: 2, eventId: 1, date: '2024-10-01', time: '09:00' },
    { id: 3, volunteerId: 3, eventId: 5, date: '2024-10-15', time: '11:30' },
    { id: 4, volunteerId: 4, eventId: 3, date: '2024-10-03', time: '16:00' },
  ],
  attendance: [
    { id: 1, volunteerId: 1, eventId: 1, scheduled: '09:00', checkedIn: '08:52', status: 'present' },
    { id: 2, volunteerId: 2, eventId: 1, scheduled: '09:00', checkedIn: '09:15', status: 'late' },
    { id: 3, volunteerId: 3, eventId: 5, scheduled: '11:30', checkedIn: null, status: 'pending' },
    { id: 4, volunteerId: 5, eventId: 1, scheduled: '09:00', checkedIn: '08:55', status: 'present' },
    { id: 5, volunteerId: 6, eventId: 3, scheduled: '16:00', checkedIn: '16:05', status: 'present' },
  ],
  applications: [
    { id: 1, name: 'Jessica Taylor', email: 'jessica.t@email.com', tier: 'Tier 1 Volunteer', status: 'pending', date: '2024-09-28' },
    { id: 2, name: 'Raj Patel', email: 'raj.p@email.com', tier: 'New Member', status: 'pending', date: '2024-09-27' },
    { id: 3, name: 'Lisa Kim', email: 'lisa.k@email.com', tier: 'Tier 2 Volunteer', status: 'approved', date: '2024-09-25' },
    { id: 4, name: 'Tomás Rivera', email: 't.rivera@email.com', tier: 'Lead Coordinator', status: 'pending', date: '2024-09-26' },
    { id: 5, name: 'Aisha Mohammed', email: 'aisha.m@email.com', tier: 'Tier 1 Volunteer', status: 'rejected', date: '2024-09-20' },
    { id: 6, name: "Kevin O'Brien", email: 'kevin.o@email.com', tier: 'New Member', status: 'pending', date: '2024-09-29' },
  ],
  training: [
    { id: 1, title: 'Volunteer Orientation', desc: 'Introduction to our mission, values, and operating procedures.', duration: '1 hour', category: 'Onboarding' },
    { id: 2, title: 'Safety & First Aid', desc: 'Basic first aid, emergency response, and workplace safety.', duration: '3 hours', category: 'Safety' },
    { id: 3, title: 'Team Leadership', desc: 'Developing leadership skills for coordinating volunteer teams.', duration: '4 hours', category: 'Leadership' },
    { id: 4, title: 'Data Entry Systems', desc: 'Training on our volunteer management software and data entry.', duration: '2 hours', category: 'Technical' },
  ],
  announcements: [
    { id: 1, subject: 'October Schedule Published', message: 'The October volunteer schedule is now live. Please review your shifts and sign up for open slots.', target: 'all', date: '2024-09-30', author: 'Sarah Miller' },
    { id: 2, subject: 'Gala Fundraiser - Volunteers Needed', message: 'We need 15 more volunteers for the annual gala. Sign up today!', target: 'active', date: '2024-09-28', author: 'Regional Office' },
    { id: 3, subject: 'New Safety Protocols', message: 'Please review the updated safety protocols before your next shift.', target: 'all', date: '2024-09-25', author: 'Safety Team' },
  ],
  conversations: [
    { id: 1, name: 'Marcus Chen', lastMessage: 'I can cover the extra shift on Saturday', time: '10:32 AM', unread: true },
    { id: 2, name: 'Daniel Park', lastMessage: 'When does the training start?', time: '9:15 AM', unread: false },
    { id: 3, name: 'Emily Rodriguez', lastMessage: 'Thanks for the update!', time: 'Yesterday', unread: false },
  ],
  activities: [
    { text: 'Marcus Chen checked in for Community Kitchen', time: '8:52 AM', type: 'checkin' },
    { text: 'Sarah Miller marked as arrived late (9:15 AM)', time: '9:15 AM', type: 'late' },
    { text: 'New application received from Raj Patel', time: '9:00 AM', type: 'application' },
    { text: 'Tree Planting Drive reached 60% capacity', time: '8:30 AM', type: 'milestone' },
    { text: 'Daniel Park assigned to Resource Sorting', time: 'Yesterday', type: 'assignment' },
    { text: 'Community Kitchen event started', time: 'Yesterday', type: 'event' },
  ],
};

function loadData() {
  try {
    const saved = localStorage.getItem('volunteerlink_data_react');
    if (saved) {
      const parsed = JSON.parse(saved);
      const merged = { ...DEFAULT_DATA };
      Object.keys(DEFAULT_DATA).forEach(k => { if (parsed[k]) merged[k] = parsed[k]; });
      return merged;
    }
  } catch (e) { /* ignore */ }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(loadData);
  const [toast, setToast] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('volunteerlink_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => { localStorage.setItem('volunteerlink_data_react', JSON.stringify(data)); }, [data]);
  useEffect(() => { localStorage.setItem('volunteerlink_user', JSON.stringify(user)); }, [user]);

  const isAuthenticated = !!user;

  const login = useCallback((email, password) => {
    if (email && password) {
      setUser({ email, name: 'Jane Cooper', role: 'Coordinator' });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('volunteerlink_user');
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addEvent = useCallback((event) => {
    setData(prev => ({
      ...prev,
      events: [...prev.events, { ...event, id: Date.now(), registered: 0 }],
      activities: [{ text: `New event created: ${event.title}`, time: 'Just now', type: 'event' }, ...prev.activities],
    }));
    showToast('Event created!');
  }, [showToast]);

  const updateEvent = useCallback((id, updates) => {
    setData(prev => ({ ...prev, events: prev.events.map(e => e.id === id ? { ...e, ...updates } : e) }));
    showToast('Event updated!');
  }, [showToast]);

  const deleteEvent = useCallback((id) => {
    setData(prev => ({ ...prev, events: prev.events.filter(e => e.id !== id), shifts: prev.shifts.filter(s => s.eventId !== id) }));
    showToast('Event deleted');
  }, [showToast]);

  const registerForEvent = useCallback((eventId) => {
    setData(prev => {
      const ev = prev.events.find(e => e.id === eventId);
      if (!ev || ev.registered >= ev.capacity) { showToast('Event is at full capacity!'); return prev; }
      return { ...prev, events: prev.events.map(e => e.id === eventId ? { ...e, registered: e.registered + 1 } : e), activities: [{ text: `Volunteer registered for ${ev.title}`, time: 'Just now', type: 'assignment' }, ...prev.activities] };
    });
    showToast('Registered for event!');
  }, [showToast]);

  const addVolunteer = useCallback((vol) => {
    setData(prev => ({ ...prev, volunteers: [...prev.volunteers, { ...vol, id: Date.now() }] }));
    showToast('Volunteer added!');
  }, [showToast]);

  const updateVolunteer = useCallback((id, updates) => {
    setData(prev => ({ ...prev, volunteers: prev.volunteers.map(v => v.id === id ? { ...v, ...updates } : v) }));
    showToast('Volunteer updated!');
  }, [showToast]);

  const deleteVolunteer = useCallback((id) => {
    setData(prev => ({ ...prev, volunteers: prev.volunteers.filter(v => v.id !== id) }));
    showToast('Volunteer removed');
  }, [showToast]);

  const addShift = useCallback((shift) => {
    setData(prev => {
      if (prev.shifts.some(s => s.volunteerId === shift.volunteerId && s.eventId === shift.eventId && s.date === shift.date)) {
        showToast('Shift already exists'); return prev;
      }
      const ev = prev.events.find(e => e.id === shift.eventId);
      if (ev && ev.registered >= ev.capacity) { showToast('Event is at full capacity'); return prev; }
      return { ...prev, shifts: [...prev.shifts, { ...shift, id: Date.now() }], events: ev ? prev.events.map(e => e.id === shift.eventId ? { ...e, registered: e.registered + 1 } : e) : prev.events };
    });
    showToast('Shift assigned!');
  }, [showToast]);

  const deleteShift = useCallback((id) => {
    setData(prev => {
      const s = prev.shifts.find(x => x.id === id);
      return { ...prev, shifts: prev.shifts.filter(x => x.id !== id), events: s ? prev.events.map(e => e.id === s.eventId && e.registered > 0 ? { ...e, registered: e.registered - 1 } : e) : prev.events };
    });
    showToast('Shift removed');
  }, [showToast]);

  const updateAttendance = useCallback((id, status) => {
    setData(prev => ({ ...prev, attendance: prev.attendance.map(a => a.id !== id ? a : { ...a, status, checkedIn: (status === 'present' && !a.checkedIn) ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : a.checkedIn }) }));
    showToast(`Marked as ${status}`);
  }, [showToast]);

  const approveApplication = useCallback((id) => {
    setData(prev => {
      const app = prev.applications.find(a => a.id === id);
      if (!app) return prev;
      const names = app.name.split(' ');
      return { ...prev, applications: prev.applications.map(a => a.id === id ? { ...a, status: 'approved' } : a), volunteers: [...prev.volunteers, { id: Date.now(), firstName: names[0], lastName: names.slice(1).join(' ') || '', email: app.email, tier: app.tier, status: 'Active' }] };
    });
    showToast('Application approved!');
  }, [showToast]);

  const rejectApplication = useCallback((id) => {
    setData(prev => ({ ...prev, applications: prev.applications.map(a => a.id === id ? { ...a, status: 'rejected' } : a) }));
    showToast('Application rejected');
  }, [showToast]);

  const deleteApplication = useCallback((id) => {
    setData(prev => ({ ...prev, applications: prev.applications.filter(a => a.id !== id) }));
    showToast('Application removed');
  }, [showToast]);

  const addTraining = useCallback((training) => {
    setData(prev => ({ ...prev, training: [...prev.training, { ...training, id: Date.now() }] }));
    showToast('Training module added!');
  }, [showToast]);

  const sendAnnouncement = useCallback((ann) => {
    setData(prev => ({ ...prev, announcements: [{ ...ann, id: Date.now(), date: new Date().toISOString().split('T')[0], author: 'You' }, ...prev.announcements] }));
    showToast('Announcement sent!');
  }, [showToast]);

  const value = {
    data, toast, showToast, user, isAuthenticated, login, logout,
    mobileSidebarOpen, setMobileSidebarOpen,
    addEvent, updateEvent, deleteEvent, registerForEvent,
    addVolunteer, updateVolunteer, deleteVolunteer,
    addShift, deleteShift, updateAttendance,
    approveApplication, rejectApplication, deleteApplication,
    addTraining, sendAnnouncement,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
