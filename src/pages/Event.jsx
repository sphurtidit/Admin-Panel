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
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import useAuth from '@/store/useAuth';
import EventUpdateDialog from '@/components/custom/Events/EventUpdateDialog';
import EventCategoryUpdateDialog from '@/components/custom/Events/EventCategoryUpdateDialog';

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
      await deleteCategory({
        id,
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });
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
          <h1 className="text-4xl uppercase mb-6">{eventDetails.name}</h1>
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
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Registration Fees
                          </TableCell>
                          <TableCell className="text-right">
                            {elm.registrationFees}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Prize Winner
                          </TableCell>
                          <TableCell className="text-right">
                            {elm.prizeWinner}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Prize RunnerUp
                          </TableCell>
                          <TableCell className="text-right">
                            {elm.prizeRunnerUp}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Minimum Number
                          </TableCell>
                          <TableCell className="text-right">
                            {elm.minNumber}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Maximum Number
                          </TableCell>
                          <TableCell className="text-right">
                            {elm.maxNumber}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Prize Visible
                          </TableCell>
                          <TableCell className="text-right">
                            {elm.isPrizeVisible ? (
                              <span className="text-green-300">True</span>
                            ) : (
                              <span className="text-red-300">False</span>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-9">
                    <Link to={`schedule/${elm._id}`}>
                      <Button>Schedule</Button>
                    </Link>
                    <div className="flex gap-5">
                      <Button
                        onClick={() => {
                          handelDeleteEventCategory(elm._id);
                        }}
                        disabled={disabled}
                      >
                        Delete Category
                      </Button>
                      <EventCategoryUpdateDialog
                        data={elm}
                        fetchEvent={fetchEvent}
                      />
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          <div className="mt-6 flex gap-5">
            <Button
              variant="outline"
              onClick={deleteEventHandler}
              disabled={disabled}
            >
              Delete Event
            </Button>
            <EventUpdateDialog />
          </div>
        </>
      )}
    </div>
  );
}

export default Event;
