import { useState, useEffect } from 'react';
import { getCommunications } from '../api/communication';
import { getAnnouncements } from '../api/announcement';
import ComposeModal from '../components/ComposeModal';

export default function Communications() {
  const [conversations, setConversations] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const commRes = await getCommunications();
      const annRes = await getAnnouncements();

      setConversations(commRes.data);
      setAnnouncements(annRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Communications</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          Compose
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border p-5">
          <h3 className="font-bold mb-4">Conversations</h3>
          {conversations.map(c => (
            <div key={c._id} className="mb-4 border-b pb-3">
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm">{c.lastMessage}</div>
              <div className="text-xs text-gray-500">{c.time}</div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border p-5">
          <h3 className="font-bold mb-4">Announcements</h3>
          {announcements.map(a => (
            <div key={a._id} className="mb-4 border-b pb-3">
              <h4 className="font-semibold">{a.subject}</h4>
              <p>{a.message}</p>
              <div className="text-sm text-gray-500">
                {a.author} • {a.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && <ComposeModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}