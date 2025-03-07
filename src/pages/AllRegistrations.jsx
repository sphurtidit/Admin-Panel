import React, { useEffect, useState } from "react";
import RegistrationBody from "./RegistrationBody";

function AllRegistrations() {
  const userAuthToken = useAuth();
  const [registration, setRegistration] = useState([]);

  const fetchRegistration = async () => {
    const { data } = await getAllRegistrations({
      headers: {
        Authorization: `Bearer ${userAuthToken}`,
      },
    });
    setRegistration(data);
  };

  console.log(registration);

  useEffect(() => {
    fetchRegistration();
  }, []);

  if (!registration) return <div>Loading...</div>;

  return <RegistrationBody registration={registration} />;
  
}

export default AllRegistrations;
