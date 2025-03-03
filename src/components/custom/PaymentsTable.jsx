import React, { useState } from 'react';

const PaymentsTable = ({data}) => {
  console.log(data)

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
              <td className="text-center flex-1">{row.userId.email}</td>
              <td className="text-center flex-1">{row.amount}</td>
              <td className="text-center flex-1">{row.regId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
