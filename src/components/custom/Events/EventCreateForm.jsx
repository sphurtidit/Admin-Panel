import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createEvent } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import { toast } from 'sonner';

function EventCreateForm({ setEventId }) {
  const { userAuthToken } = useAuth();
  const [coordinater, setCoordinater] = useState([]);
  const [eventName, setEventName] = useState('');
  const [file, setFile] = useState(null);
  const [disabled, setdisabled] = useState(false);

  const formData = new FormData();

  const handelEventSubmit = async (event) => {
    event.preventDefault();
    setdisabled(true);
    formData.append('name', eventName);
    formData.append('rulebook', file);
    coordinater.forEach((coordinator, index) => {
      formData.append(`coordinator${index + 1}`, coordinator);
    });

    try {
      const data = await createEvent({
        formData,
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
          // 'Content-Type': 'multipart/form-data',
        },
      });

      if (data.status == 403) {
        toast('Authorization Failed', {
          description: `You are not authorized for this action`,
        });
        return;
      }

      setEventId(data._id);

      setdisabled(false);
      toast('Event Created', {
        description: `New Event has been Created`,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setEventName('');
      setCoordinater([]);
      setFile(null);
      document.getElementById('fileInput').value = '';
    }
  };

  const handelCoordinater = (inx, value) => {
    const updatedFields = [...coordinater];
    updatedFields[inx] = value;
    setCoordinater(updatedFields);
  };

  const handelFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handelEventSubmit}>
      <div className="my-6 flex flex-col gap-6">
        <div className="flex gap-2 flex-col">
          <Label>Enter Event Name</Label>
          <Input
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => {
              setEventName(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-3 flex-col">
          <Label>Enter Event Name</Label>
          <Input
            type="file"
            id="fileInput"
            onChange={handelFile}
            accept="application/pdf"
          />
        </div>
        <div>
          <h3 className="mb-2">Add Co-ordinator</h3>
          <Button
            variant="outline"
            onClick={() => {
              setCoordinater((pre) => [...pre, '']);
            }}
            type="button"
          >
            <CirclePlus />
            <span>Add</span>
          </Button>
          <div>
            {coordinater.map((elm, inx) => {
              return (
                <div className="mt-2" key={inx}>
                  <span className="mb-2">Coordinator {inx + 1}</span>
                  <div className="flex gap-3 items-center justify-start">
                    <Input
                      className="flex-1"
                      onChange={(e) => {
                        handelCoordinater(inx, e.target.value);
                      }}
                    />
                    <div className="flex-1">
                      <CircleMinus
                        className="cursor-pointer"
                        onClick={() => {
                          console.log(inx);
                          const updatedFields = coordinater.filter(
                            (_, i) => i !== inx
                          );
                          console.log(inx);
                          setCoordinater(updatedFields);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Button type="submit" disabled={disabled}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EventCreateForm;
