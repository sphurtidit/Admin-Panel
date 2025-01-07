import EventCard from '@/components/custom/Events/EventCard';
import React, { useEffect, useState } from 'react';
import { fetchAllEvents } from '@/services/api/apiAdmin';
import { Button } from '@/components/ui/button';
import Loading from './Loading';

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await fetchAllEvents();
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="m-16">
          <div className="flex flex-wrap gap-4">
            {events.map((elm, inx) => {
              return (
                <div key={elm._id} className="basis-1/4 grow">
                  <EventCard data={elm} key={elm._id} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default AllEvents;
