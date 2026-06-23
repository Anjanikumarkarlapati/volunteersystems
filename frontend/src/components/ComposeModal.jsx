import { useState } from 'react';
import { addAnnouncement } from '../api/announcement';

export default function ComposeModal({ onClose }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('all');

  const handleSend = async () => {
    if (!subject || !message) {
      alert('Subject and message required');
      return;
    }

    try {
      await addAnnouncement({
        subject,
        message,
        target,
        author: 'Admin',
        date: new Date().toISOString().split('T')[0]
      });

      window.location.reload();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">New Announcement</h2>

        <input
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="Subject"
          className="w-full border p-3 rounded-xl mb-4"
        />

        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows="5"
          placeholder="Message"
          className="w-full border p-3 rounded-xl mb-4"
        />

        <select
          value={target}
          onChange={e => setTarget(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        >
          <option value="all">All Volunteers</option>
          <option value="active">Active Volunteers</option>
          <option value="coordinators">Coordinators</option>
        </select>

        <button onClick={handleSend} className="w-full bg-blue-600 text-white py-3 rounded-xl">
          Send Announcement
        </button>
      </div>
    </div>
  );
}