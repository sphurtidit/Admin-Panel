import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  fetchEventById,
  deleteEvent,
  deleteCategory,
} from '@/services/api/apiAdmin';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import useAuth from '@/store/useAuth';

function Event() {
  const id = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const { userAuthToken } = useAuth();
  const navigate = useNavigate();

  const fetchEvent = async () => {
    const data = await fetchEventById(id);
    setEventDetails(data);
    setLoading(false);
  };

  const deleteEventHandler = async () => {
    setDisabled(true);
    try {
      await deleteEvent({
        id: id.id,
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });
      navigate('/all-events');
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  const handelDeleteEventCategory = async (id) => {
    setDisabled(true);
    try {
      await deleteCategory(id);
      await fetchEvent();
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div className="mx-16 mt-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-4xl uppercase">{eventDetails.name}</h1>
          <div className="my-6 flex flex-col gap-2">
            <p className="text-lg">
              Coordinator 1 - {eventDetails.coordinator1}
            </p>
            <p className="text-lg">
              Coordinator2 - {eventDetails.coordinator2}
            </p>
          </div>
          <div>
            <Button variant="outline">Rulebook</Button>
          </div>
          <div className="flex gap-3 mt-10">
            {eventDetails.eventCategory?.map((elm, inx) => {
              return (
                <Card className="flex-1" key={elm._id}>
                  <CardHeader>
                    <CardTitle className="uppercase text-2xl">
                      {elm.categoryName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <h3>Registration Fees - {elm.registrationFees}</h3>
                      <span>Minimum Number of Members - {elm.minNumber}</span>
                      <span>Maximum Number of Members - {elm.maxNumber}</span>
                      <span>Prize Winner - {elm.prizeWinner}</span>
                      <span>Prize RunnerUp - {elm.prizeRunnerUp}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-9">
                    <Link to={`schedule/${elm._id}`}>
                      <Button>Schedule</Button>
                    </Link>
                    <Button
                      onClick={() => {
                        handelDeleteEventCategory(elm._id);
                      }}
                      disabled={disabled}
                    >
                      Delete Category
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={deleteEventHandler}
              disabled={disabled}
            >
              Delete Event
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Event;
