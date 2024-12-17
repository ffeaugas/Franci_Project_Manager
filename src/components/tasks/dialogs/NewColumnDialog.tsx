'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newColumnSchema, NewColumnType, TaskColumnWithTasks } from '../types';
import { useState } from 'react';

interface INewColumnDialogProps {
  refreshTaskColumns: () => void;
  data?: TaskColumnWithTasks | null;
  children: React.ReactNode;
}

const NewColumnDialog = ({
  refreshTaskColumns,
  data = null,
  children,
}: INewColumnDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewColumnType>({
    defaultValues: {
      name: data?.name || '',
      color: data?.color || '',
    },
    resolver: zodResolver(newColumnSchema),
  });
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit: SubmitHandler<NewColumnType> = async (bodyData) => {
    try {
      const response = await fetch('/api/task-columns', {
        method: data ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bodyData, id: data?.id }),
      });
      if (!response.ok) throw new Error('Failed to create task');
      reset();
      refreshTaskColumns();
      setIsOpen(false);
    } catch (e) {
      console.error('Error creating task :', e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{data ? 'Edit' : 'Add a new'} column</DialogTitle>
            <DialogDescription>
              Add a new column and its color. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input {...register('name')} id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <Input {...register('color')} id="color" className="col-span-3" />
            </div>
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            {errors.color && <span className="text-red-500">{errors.color.message}</span>}
          </div>
          <DialogFooter>
            <Button type="submit">Save {!data && 'column'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewColumnDialog;
