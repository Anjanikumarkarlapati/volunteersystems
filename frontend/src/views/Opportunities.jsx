import { useState, useEffect } from 'react';
import { getEvents, deleteEvent } from '../api/event';
import EventFormModal from '../components/EventFormModal';

const categoryThemes = {
  Community: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'groups' },
  Environment: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'park' },
  Education: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'school' },
  Health: { bg: 'bg-rose-50', text: 'text-rose-700', icon: 'monitoring' },
  Arts: { bg: 'bg-violet-50', text: 'text-violet-700', icon: 'palette' },
};

export default function Opportunities() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered =
    filter === 'all'
      ? events
      : events.filter((e) => e.status === filter);

  const filters = [
    { key: 'all', label: 'All Events', count: events.length },
    {
      key: 'upcoming',
      label: 'Upcoming',
      count: events.filter((e) => e.status === 'upcoming').length,
    },
    {
      key: 'ongoing',
      label: 'Ongoing',
      count: events.filter((e) => e.status === 'ongoing').length,
    },
    {
      key: 'completed',
      label: 'Completed',
      count: events.filter((e) => e.status === 'completed').length,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Opportunities</h1>
          <p>Create and manage volunteer events.</p>
        </div>

        <button
          onClick={() => {
            setEditingEvent(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Opportunity
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="px-4 py-2 border rounded"
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p>No events found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((e) => {
            const theme =
              categoryThemes[e.category] || categoryThemes.Community;

            return (
              <div key={e._id} className="border rounded-xl p-5 shadow">
                <div className="mb-4">
                  <span>{theme.icon}</span>
                </div>

                <h3 className="text-lg font-bold">{e.title}</h3>
                <p>{e.desc}</p>

                <p>Date: {e.date}</p>
                <p>Category: {e.category}</p>
                <p>Status: {e.status}</p>
                <p>
                  Registered: {e.registered}/{e.capacity}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditingEvent(e);
                      setModalOpen(true);
                    }}
                    className="border px-3 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => alert('Register feature later')}
                    className="bg-blue-600 text-white px-3 py-2 rounded"
                  >
                    Register
                  </button>

                  <button
                    onClick={async () => {
                      if (window.confirm('Delete this event?')) {
                        try {
                          await deleteEvent(e._id);
                          setEvents(
                            events.filter((event) => event._id !== e._id)
                          );
                        } catch (error) {
                          console.log(error);
                        }
                      }
                    }}
                    className="border px-3 py-2 rounded text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && (
        <EventFormModal
          event={editingEvent}
          onClose={() => {
            setModalOpen(false);
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
}