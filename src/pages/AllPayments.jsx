import PaymentsTable from '@/components/custom/PaymentsTable';
import React, {useState, useEffect} from 'react';
import { getAllPayments } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';

function AllPayments() {
  const userAuthToken = useAuth();
  const [payment, setPayment] = useState([]);

  const fetchPayment = async () => {
    const { data } = await getAllPayments({
      headers: {
        Authorization: `Bearer ${userAuthToken}`,
      },
    });
    setPayment(data);
  };
  console.log(payment);

  useEffect(() => {
    fetchPayment();
  }, []);

  if (!payment) return <div>Lodaing...</div>;

  return (
    <>
      <div>
        <PaymentsTable data={payment}/>
      </div>
    </>
  );
}

export default AllPayments;
