import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function EventCaregoryFormFields({ fieldname, value, handelCategory, name }) {
  return (
    <div className="basis-3/12 flex-1">
      <Label className="mb-2 block">{fieldname}</Label>
      <Input value={value} onChange={handelCategory} name={name} />
    </div>
  );
}

export default EventCaregoryFormFields;
