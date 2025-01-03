import React, { useState } from 'react';

const PaymentsTable = () => {
  // Sample data
  const [data, setData] = useState([
    {
      orderId: 1,
      paymentId: 'P1001',
      userId: 'U123',
      registrationIds: 'R001',
    },
    {
      orderId: 2,
      paymentId: 'P1002',
      userId: 'U124',
      registrationIds: 'R003',
    },
    {
      orderId: 3,
      paymentId: 'P1003',
      userId: 'U125',
      registrationIds: 'R005',
    },
  ]);

  return (
    <div className="flex justify-center mt-7 w-full">
      <table className="w-full">
        <thead className="mb-6 block w-full mx-auto">
          <tr className="flex justify-between">
            <th className="text-center flex-1">Order ID</th>
            <th className="text-center flex-1">Payment ID</th>
            <th className="text-center flex-1">User ID</th>
            <th className="text-center flex-1">Registration IDs</th>
          </tr>
        </thead>
        <tbody className="block">
          {data.map((row, index) => (
            <tr key={index} className="flex w-full justify-between mb-4">
              <td className="text-center flex-1">{row.orderId}</td>
              <td className="text-center flex-1">{row.paymentId}</td>
              <td className="text-center flex-1">{row.userId}</td>
              <td className="text-center flex-1">{row.registrationIds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
