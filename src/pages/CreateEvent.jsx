import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import EventCreateForm from '@/components/custom/Events/EventCreateForm';
import EventCategoryForm from '@/components/custom/Events/EventCategoryForm';

function CreateEvent() {
  return (
    <div>
      <div className="m-12">
        <Card>
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
            <CardDescription>
              You can create a sports event with in two category Boys and Girls
            </CardDescription>
            <CardContent>
              {/* Event Form */}
              <EventCreateForm />
              {/* Event Form */}
              <div className="flex gap-3">
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>Event category (Boys or Girls)</CardTitle>
                    <CardDescription>Create a evet category</CardDescription>
                    {/* Event Category Form */}
                    <EventCategoryForm />
                    {/* Event Category Form */}
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default CreateEvent;
