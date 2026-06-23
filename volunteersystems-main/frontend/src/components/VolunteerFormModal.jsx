import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

export default function VolunteerFormModal({ volunteer, onClose }) {
  const { addVolunteer, updateVolunteer } = useData();
  const isEdit = !!volunteer;
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', tier: 'New Member', status: 'Active' });

  useEffect(() => {
    if (volunteer) setForm({ firstName: volunteer.firstName, lastName: volunteer.lastName, email: volunteer.email, tier: volunteer.tier, status: volunteer.status });
  }, [volunteer]);

  const handleChange = (f, v) => setForm(p => ({ ...p, [f]: v }));
  const handleSave = () => {
    if (!form.firstName || !form.lastName || !form.email) { alert('All fields required'); return; }
    if (isEdit) updateVolunteer(volunteer.id, form);
    else addVolunteer(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl animate-scale-in border border-outline-variant" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">{isEdit ? 'edit' : 'person_add'}</span>
            </div>
            <h2 className="font-headline-sm text-[20px] font-bold text-on-surface">{isEdit ? 'Edit Volunteer' : 'Add Volunteer'}</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-variant transition-colors cursor-pointer"><span className="material-symbols-outlined text-[20px]">close</span></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">First Name</label>
              <input value={form.firstName} onChange={e => handleChange('firstName', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all" />
            </div>
            <div>
              <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Last Name</label>
              <input value={form.lastName} onChange={e => handleChange('lastName', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all" />
            </div>
          </div>
          <div>
            <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Email</label>
            <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Tier</label>
              <select value={form.tier} onChange={e => handleChange('tier', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all">
                {['New Member','Tier 1 Volunteer','Tier 2 Volunteer','Lead Coordinator'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="font-label-md text-[13px] text-on-surface-variant mb-1.5 block">Status</label>
              <select value={form.status} onChange={e => handleChange('status', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-[14px] transition-all">
                {['Active','Inactive','On Leave'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button onClick={handleSave} className="w-full py-3 bg-primary text-white rounded-xl font-label-md text-[14px] hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer">{isEdit ? 'Update Volunteer' : 'Add Volunteer'}</button>
        </div>
      </div>
    </div>
  );
}
