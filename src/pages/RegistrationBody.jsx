import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DialogHeader } from '@/components/ui/dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';
import { deleteRegistration } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';

export default function RegistrationBody({ registration, fetchRegistration }) {
  const { userAuthToken } = useAuth();
  const exportToCSV = (data, fileName) => {
    if (!data.length) return alert('No data to export!');

    // Format Data for CSV
    const formattedData = data.map((elm) => ({
      Event_Name: elm.eventId?.name,
      Category: elm.catId.categoryName,
      College_Name: elm.userId.college_name,
      Team_Name: elm.teamName,
      Captain_Name: elm.captainName,
      Members: elm.member.length,
      Officials: elm.faculty.length,
      College_Mail: elm.clgMail,
      Payment_Status: elm.payStatus ? 'Paid' : 'Not Paid',
      Registration_Amount: elm.amount,
      Phone_Number: `"${elm.phoneNo}"`,
      Alternate_Number: `"${elm.alternateNo}"`,
      Accommodation: elm.accommodation ? 'Yes' : 'No',
      Accommodation_Amount: (elm.member.length + elm.faculty.length) * 1000,
      Accommodation_Payment: elm.payAccommodation ? 'Paid' : 'Not Paid',
    }));

    // Convert to CSV and Download
    const csv = unparse(formattedData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${fileName}.csv`);
  };

  // Function to Export Only Paid Teams to CSV
  const exportPaidRegistrationsToCSV = () => {
    const paidRegistrations = registration.filter((elm) => elm.payStatus);

    exportToCSV(paidRegistrations, 'Paid Registrations'); // Use the existing exportToCSV function to export the paid teams
  };

  // Function to Export Team Members CSV
  const exportTeamMembersToCSV = () => {
    const allMembers = registration
      .map((elm) => {
        return elm.member?.map((member) => ({
          Event_Name: elm.eventId?.name,
          Category: elm.catId.categoryName,
          College_Name: elm.userId.college_name,
          Team_Name: elm.teamName,
          Member_Name: `"${member.memberName}"`,
          College_ID: `"${member.clgId}"`,
          Aadhar_Id: `"${member.govId}"`,
          Gender: member.gender,
        }));
      })
      .flat();

    if (allMembers.length === 0) return alert('No team members to export!');

    // Convert to CSV and Download
    const csv = unparse(allMembers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Team_Members.csv');
  };

  const handelDeleteRegistration = async (id) => {
    const res = await deleteRegistration({
      id,
      headers: {
        Authorization: `Bearer ${userAuthToken}`,
      },
    });
    fetchRegistration();
  };

  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-semibold">
            Total Registrations - {registration.length}
          </p>
          <Button
            onClick={() => exportToCSV(registration, 'Registrations')}
            variant="default"
          >
            Download Registration CSV
          </Button>
          <Button onClick={exportPaidRegistrationsToCSV} variant="default">
            Download Paid Teams CSV
          </Button>
          <Button onClick={exportTeamMembersToCSV} variant="default">
            Download Team Members CSV
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {registration?.map((elm) => (
            <Card key={elm._id}>
              <CardHeader>
                <CardTitle>{elm.userId.college_name}</CardTitle>
                <CardDescription>
                  {elm.eventId?.name} - {elm.catId?.categoryName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Table Start */}
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        College Mail
                      </TableCell>
                      <TableCell className="text-right">
                        {elm.clgMail}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Payment Status
                      </TableCell>
                      <TableCell className="text-right">
                        {elm.payStatus ? (
                          <span className="text-green-300">True</span>
                        ) : (
                          <span className="text-red-300">False</span>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Registration Amount
                      </TableCell>
                      <TableCell className="text-right">{elm.amount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Phone Number
                      </TableCell>
                      <TableCell className="text-right">
                        {elm.phoneNo}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Alternate Number
                      </TableCell>
                      <TableCell className="text-right">
                        {elm.alternateNo}
                      </TableCell>
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
                      <TableCell className="font-medium">
                        Accommodation
                      </TableCell>
                      <TableCell className="text-right">
                        {elm.accommodation ? (
                          <span className="text-green-300">True</span>
                        ) : (
                          <span className="text-red-300">False</span>
                        )}
                      </TableCell>
                    </TableRow>
                    {elm.accommodation ? (
                      <TableRow>
                        <TableCell className="font-medium">
                          Acc Amount
                        </TableCell>
                        <TableCell className="text-right">
                          {(elm.member.length + elm.faculty.length) * 1000}
                        </TableCell>
                      </TableRow>
                    ) : (
                      <></>
                    )}
                    {elm.accommodation ? (
                      <TableRow>
                        <TableCell className="font-medium">
                          Accommodation Payment
                        </TableCell>
                        <TableCell className="text-right">
                          {elm.payAccommodation ? (
                            <span className="text-green-300">True</span>
                          ) : (
                            <span className="text-red-300">False</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ) : (
                      <></>
                    )}
                  </TableBody>
                </Table>
                {/* Table End */}
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="mr-4">
                      Members
                    </Button>
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
                                <span>College ID - {elmt.clgId}</span>
                                <span>Government ID - {elmt.govId}</span>
                                <span>Gender - {elmt.gender}</span>
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
                    <Button variant="default" className="mr-4">
                      Officials
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>
                        Officials List of {elm?.teamName}
                      </DialogTitle>
                      <DialogDescription>
                        <div className="mt-3 grid grid-cols-2">
                          {elm.faculty?.map((elmt, indx) => (
                            <div key={indx * 10}>
                              <div className="m-4 flex gap-1 flex-col">
                                <span>Name - {elmt?.facultyName}</span>
                                <span>
                                  Government ID - {elmt?.facultyAadhar}
                                </span>
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
                    <Button variant="default" className="mr-4">
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[350px]">
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to delete this Registration
                      </DialogTitle>
                      <DialogDescription>
                        <div className="mt-4 flex justify-around">
                          <DialogClose>
                            <Button
                              variant="outline"
                              onClick={() => handelDeleteRegistration(elm._id)}
                            >
                              Yes
                            </Button>
                          </DialogClose>
                          <DialogClose>
                            <Button variant="outline">No</Button>
                          </DialogClose>
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
