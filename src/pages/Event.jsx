import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchEventById, deleteEvent } from '@/services/api/apiAdmin';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Event() {
  const id = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const navigate = useNavigate();

  const fetchEvent = async () => {
    const data = await fetchEventById(id);
    setEventDetails(data);
  };

  const deleteEventHandler = async () => {
    try {
      await deleteEvent(id);
      navigate('/all-events');
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div className="m-16">
      <h1 className="text-3xl">Event Title</h1>
      <div className="my-6 flex flex-col gap-2">
        <p className="text-lg">Coordinator1: </p>
        <p className="text-lg">Coordinator2: </p>
      </div>
      <div>
        <Button variant="outline">Rulebook</Button>
      </div>
      <div className="flex gap-3 mt-10">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <h3>Registration Fees: </h3>
              <span>Minimum Number of Members: </span>
              <span>Maximum Number of Members: </span>
              <span>Prize Winner: </span>
              <span>Prize RunnerUp: </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between mt-9">
        <Link to="schedule">
          <Button>Schedule</Button>
        </Link>
        <Button onClick={deleteEventHandler}>Delete Event</Button>
      </div>
    </div>
  );
}

export default Event;
