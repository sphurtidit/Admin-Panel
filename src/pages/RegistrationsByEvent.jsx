import EventCard from '@/components/custom/Events/EventCard';
import React, { useEffect, useState } from 'react';
import { fetchAllEvents } from '@/services/api/apiAdmin';
import { Button } from '@/components/ui/button';
import Loading from './Loading';
import { getRegistrationsByCategory } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth'; // Assume this is the API function to fetch registration data

function RegistrationsByEvents() {
  const { userAuthToken } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await fetchAllEvents();
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedCategory(null); // Reset category selection
    setRegistrations([]); // Reset registrations when a new event is selected
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setCategoryLoading(true); // Set loading state while fetching data
    setRegistrations([]); // Clear previous data

    try {
      // Fetch registration data for the selected category
      const response = await getRegistrationsByCategory({
        id: category._id, // Passing the category ID
        headers: {
          Authorization: `Bearer ${userAuthToken}`, // Passing the token in headers
        },
      });
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registration data:', error);
    } finally {
      setCategoryLoading(false); // Turn off loading state
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="m-16">
          {/* Event Buttons at the Top */}
          <div className="flex gap-4 mb-6">
            {events.map((event) => (
              <Button
                key={event._id}
                onClick={() => handleEventClick(event)}
                className="p-2 bg-blue-500 text-white rounded"
              >
                {event.name}
              </Button>
            ))}
          </div>

          {/* If an event is selected, show categories */}
          {selectedEvent ? (
            <div className="mb-6">
              <h2 className="text-xl font-bold">Select a Category for {selectedEvent.name}</h2>
              <div className="flex flex-wrap gap-4 mt-4">
                {selectedEvent.eventCategory.map((category) => (
                  <Button
                    key={category._id}
                    onClick={() => handleCategoryClick(category)}
                    className="p-2 bg-green-500 text-white rounded"
                  >
                    {category.categoryName}
                  </Button>
                ))}
              </div>

              {/* Show Loading or Registration Data */}
              {categoryLoading ? (
                <p>Loading registration data...</p>
              ) : (
                <div className="mt-6">
                  {registrations.length > 0 ? (
                    registrations.map((registration) => (
                      <div key={registration._id} className="p-4 border rounded mb-4">
                        <h3 className="text-lg font-bold">{registration.teamName}</h3>
                        <p>{registration.userId.college_name} - {registration.catId.categoryName}</p>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">College Mail</TableCell>
                              <TableCell className="text-right">{registration.clgMail}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Payment Status</TableCell>
                              <TableCell className="text-right">
                                {registration.payStatus ? (
                                  <span className="text-green-300">Paid</span>
                                ) : (
                                  <span className="text-red-300">Not Paid</span>
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Registration Amount</TableCell>
                              <TableCell className="text-right">{registration.amount}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Phone Number</TableCell>
                              <TableCell className="text-right">{registration.phoneNo}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    ))
                  ) : (
                    <p>No registrations found for this category.</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p>Please select an event to view categories.</p>
          )}
        </div>
      )}
    </>
  );
}

export default RegistrationsByEvents;
