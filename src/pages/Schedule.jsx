import ScheduleDialog from '@/components/custom/Events/ScheduleDialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { deleteSchedule, getSchedule } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

function Schedule() {
  const { eventCategoryId } = useParams();
  const [schedules, setSchedules] = useState(null);
  const { userAuthToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const fetchSchedule = async () => {
    const data = await getSchedule(eventCategoryId);
    setSchedules(data.data);
    setLoading(false);
  };

  const handelDeleteSchedule = async (id) => {
    setDisabled(true);
    const data = await deleteSchedule({
      id,
      headers: {
        Authorization: `Bearer ${userAuthToken}`,
      },
    });
    await fetchSchedule();
    setDisabled(false);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="m-16">
      <div>
        <ScheduleDialog fetchSchedule={fetchSchedule} />
      </div>
      <div className="mt-16 flex gap-2 flex-wrap">
        {schedules &&
          schedules.map((elm, inx) => {
            return (
              <Card key={elm._id} className="mb-3 basis-1/4 grow">
                <CardHeader>
                  <CardTitle>Schedule {inx + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <span>Order - {elm.order}</span>
                    <span>TeamA - {elm.teamA}</span>
                    <span>TeamB - {elm.teamB}</span>
                    <span>Start Time - {elm.startTime}</span>
                    <span>Match Completed - {`${elm.isMatchComplete}`}</span>
                    <span>Score - {elm.score}</span>
                    <span>Winner - {elm.winner}</span>
                    <span>Match Name - {elm.matchName}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handelDeleteSchedule(elm._id)}
                    disabled={disabled}
                  >
                    Delete Schedule
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default Schedule;
