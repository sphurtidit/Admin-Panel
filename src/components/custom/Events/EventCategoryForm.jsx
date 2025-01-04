import React, { useState } from 'react';
import EventCaregoryFormFields from './EventCaregoryFormFields';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function EventCategoryForm({ eventId }) {
  const handelEventSubmit = (event) => {
    event.preventDefault();
    const eventCategoryData = {
      ...category,
      eventId,
    };

    console.log(eventCategoryData);
  };

  const [category, setCategory] = useState({
    categoryName: '',
    registrationFees: '',
    minNumber: '',
    maxNumber: '',
    prizeWinner: '',
    prizeRunnerUp: '',
  });

  const handelCategory = (event) => {
    const { name, value } = event.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form type="submit" onSubmit={handelEventSubmit}>
      <CardContent>
        <div className="flex gap-3 flex-wrap">
          <EventCaregoryFormFields
            fieldname={'Event Id'}
            value={eventId}
            name="eventId"
            disabled={true}
          />
          <EventCaregoryFormFields
            fieldname={'Category Name'}
            value={category.categoryName}
            handelCategory={handelCategory}
            name="categoryName"
          />
          <EventCaregoryFormFields
            fieldname={'Registration Fees'}
            value={category.registrationFees}
            handelCategory={handelCategory}
            name="registrationFees"
          />
          <EventCaregoryFormFields
            fieldname={'Minimum Number'}
            value={category.minNumber}
            handelCategory={handelCategory}
            name="minNumber"
          />
          <EventCaregoryFormFields
            fieldname={'Maximum Number'}
            value={category.maxNumber}
            handelCategory={handelCategory}
            name="maxNumber"
          />
          <EventCaregoryFormFields
            fieldname={'Prize Winner'}
            value={category.prizeWinner}
            handelCategory={handelCategory}
            name="prizeWinner"
          />
          <EventCaregoryFormFields
            fieldname={'Prize RunnerUp'}
            value={category.prizeRunnerUp}
            handelCategory={handelCategory}
            name="prizeRunnerUp"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" type="submit">
          Submit
        </Button>
      </CardFooter>
    </form>
  );
}

export default EventCategoryForm;
