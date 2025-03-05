import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogHeader } from '@/components/ui/dialog';
import { getAllRegistrations } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';

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

  // Function to Export CSV
  const exportToCSV = () => {
    if (!registration.length) return alert("No data to export!");

    // Format Data for CSV
    const formattedData = registration.map((elm) => ({
      Team_Name: elm.teamName,
      Captain_Name: elm.captainName,
      Members: elm.member.length,
      Officials: elm.faculty.length,
      College_Name: elm.userId.college_name,
      Event_Name: elm.eventId?.name,
      Category: elm.catId.categoryName,
      College_Mail: elm.clgMail,
      Payment_Status: elm.payStatus ? 'Paid' : 'Not Paid',
      Registration_Amount: elm.amount,
      Phone_Number: elm.phoneNo,
      Alternate_Number: elm.alternateNo,
      Accomodation: elm.accomodation ? 'Yes' : 'No',
      Accomodation_Amount: (elm.member.length + elm.faculty.length) * 1300,
      Accomodation_Payment: elm.payAccommodation ? 'Paid' : 'Not Paid',
    }));

    // Convert to CSV and Download
    const csv = unparse(formattedData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Registrations.csv');
  };

  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-semibold">Total Registrations - {registration.length}</p>
          <Button onClick={exportToCSV} variant="default">Download CSV</Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {registration?.map((elm) => (
            <Card key={elm._id}>
              <CardHeader>
                <CardTitle>{elm?.teamName}</CardTitle>
                <CardDescription>
                  {elm.eventId?.name} - {elm.catName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Table Start */}
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">College Mail</TableCell>
                      <TableCell className="text-right">{elm.clgMail}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Payment Status</TableCell>
                      <TableCell className="text-right">
                        {elm.payStatus ? <span className="text-green-300">True</span> : <span className="text-red-300">False</span>}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Registration Amount</TableCell>
                      <TableCell className="text-right">{elm.amount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Phone Number</TableCell>
                      <TableCell className="text-right">{elm.phoneNo}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Alternate Number</TableCell>
                      <TableCell className="text-right">{elm.alternateNo}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Name VC</TableCell>
                      <TableCell className="text-right">{elm.nameVC}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Name SO</TableCell>
                      <TableCell className="text-right">{elm.nameSO}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Accomodation</TableCell>
                      <TableCell className="text-right">
                        {elm.accomodation ? <span className="text-green-300">True</span> : <span className="text-red-300">False</span>}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Acc Amount</TableCell>
                      <TableCell className="text-right">{(elm.member.length + elm.faculty.length) * 1000}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Accomodation Payment</TableCell>
                      <TableCell className="text-right">
                        {elm.payAccommodation ? <span className="text-green-300">True</span> : <span className="text-red-300">False</span>}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                {/* Table End */}
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="mr-4">Members</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Member List of {elm?.teamName}</DialogTitle>
                      <DialogDescription>
                        <div className="mt-3 grid grid-cols-2">
                          {elm.member?.map((elmt, inx) => (
                            <div key={inx * 10}>
                              <div className="m-4 flex gap-1 flex-col">
                                <span>Name - {elmt.memberName}</span>
                                <span>College ID - {elmt.clgid}</span>
                                <span>Government ID - {elmt.govId}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="mr-4">Officials</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Officials List of {elm?.teamName}</DialogTitle>
                      <DialogDescription>
                        <div className="mt-3 grid grid-cols-2">
                          {elm.faculty?.map((elmt, indx) => (
                            <div key={indx * 10}>
                              <div className="m-4 flex gap-1 flex-col">
                                <span>Name - {elmt?.facultyName}</span>
                                <span>Government ID - {elmt?.facultyAadhar}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllRegistrations;
