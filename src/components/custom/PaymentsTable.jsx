import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PaymentsTable = ({ data }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleDetailsClick = (row) => {
    // Set the selected row's details and open the dialog
    console.log(row);
    setSelectedDetails(row);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedDetails(null);
  };

  return (
    <div className="overflow-x-auto mt-7 w-full">
      <table className="min-w-full bg-black text-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-black border-b border-white">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold">Order ID</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Payment ID</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">User ID</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Amount</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`border-t border-white ${
                index % 2 === 0 ? "bg-black" : "bg-gray-900"
              }`}
            >
              <td className="py-3 px-4 text-sm">{row.orderId}</td>
              <td className="py-3 px-4 text-sm">{row.paymentId}</td>
              <td className="py-3 px-4 text-sm">{row.userId.email}</td>
              <td className="py-3 px-4 text-sm">{row.amount}</td>
              <td className="py-3 px-4 text-sm">
                <button
                  onClick={() => handleDetailsClick(row)}
                  className="bg-transparent text-white border-2 border-white py-1 px-3 rounded-lg"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for showing details */}
      {selectedDetails && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger />
          <DialogContent className="bg-black text-white p-8 rounded-lg max-w-md mx-auto">
            <DialogTitle className="text-xl font-semibold">Payment Details</DialogTitle>
            <DialogDescription className="mt-4">
              <div className="mt-3">
                {/* Properly render details */}
                {selectedDetails.details?.map((elmt, inx) => (
                  <div key={inx} className="grid grid-cols-2 gap-4">
                    <div>
                      <p>
                        <strong>Amount:</strong> {elmt.amount}
                      </p>
                      <p>
                        <strong>Event Name:</strong> {elmt.eventName}
                      </p>
                      <p>
                        <strong>Type:</strong> {elmt.type}
                      </p>
                      <p>
                        <strong>Registration ID:</strong> {elmt.regId}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogDescription>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseDialog}
                className="bg-white text-black py-2 px-6 rounded-lg"
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentsTable;
