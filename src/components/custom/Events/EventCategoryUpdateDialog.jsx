import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function EventCategoryUpdateDialog({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const handelFormSubmit = () => {};
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Event Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handelFormSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Event Category</DialogTitle>
            <DialogDescription>
              Make changes to your Event Category here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="registrationFees" className="text-right">
                Registration Fees
              </Label>
              <Input
                id="registrationFees"
                placeholder={data.registrationFees}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="minNumber" className="text-right">
                Minimum Number
              </Label>
              <Input
                id="minNumber"
                placeholder={data.minNumber}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxNumber" className="text-right">
                Maximum Number
              </Label>
              <Input
                id="maxNumber"
                placeholder={data.maxNumber}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prizeWinner" className="text-right">
                Prize Winner
              </Label>
              <Input
                id="prizeWinner"
                placeholder={data.prizeWinner}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prizeRunnerUp" className="text-right">
                Prize Runner Up
              </Label>
              <Input
                id="prizeRunnerUp"
                placeholder={data.prizeRunnerUp}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isPrizeVisible" className="text-right">
                Is Prize Visible
              </Label>
              <Input
                id="isPrizeVisible"
                placeholder={data.isPrizeVisible}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EventCategoryUpdateDialog;
