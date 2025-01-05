import ScheduleDialog from '@/components/custom/Events/ScheduleDialog';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

function Schedule() {
  return (
    <div className="m-16">
      <div>
        <ScheduleDialog />
      </div>
      <div className="mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Schedule 1</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default Schedule;
