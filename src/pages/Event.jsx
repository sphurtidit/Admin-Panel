import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

function Event() {
  return (
    <div className="m-16">
      <h1 className="text-3xl">Event Title</h1>
      <div className="my-6 flex flex-col gap-2">
        <p className="text-lg">Coordinator1: </p>
        <p className="text-lg">Coordinator2: </p>
      </div>
      <div>
        <Button variant="outline">Rulebook</Button>
      </div>
      <div className="flex gap-3 mt-10">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <h3>Registration Fees: </h3>
              <span>Minimum Number of Members: </span>
              <span>Maximum Number of Members: </span>
              <span>Prize Winner: </span>
              <span>Prize RunnerUp: </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Event;
