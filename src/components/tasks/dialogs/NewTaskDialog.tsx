'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { DialogFooter, DialogHeader } from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newTaskSchema, NewTaskType, TaskColumnWithTasks, TaskSelect } from '../types';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import DeleteDialog from '@/components/utils/DeleteDialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface INewTaskDialogProps {
  refreshTaskColumns: () => void;
  taskColumns: TaskColumnWithTasks[];
  children: React.ReactNode;
  data?: TaskSelect | null;
}

const NewTaskDialog = ({
  refreshTaskColumns,
  taskColumns,
  children,
  data = null,
}: INewTaskDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, control } = useForm<NewTaskType>({
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
      columnId: data?.columnId || undefined,
    },
    resolver: zodResolver(newTaskSchema),
  });

  const onSubmit: SubmitHandler<NewTaskType> = async (bodyData) => {
    try {
      const response = await fetch('/api/tasks', {
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
            <DialogTitle>{data ? 'Edit' : 'Add a new'} task</DialogTitle>
            <DialogDescription>
              Add a new task and its description. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!data && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="columnId" className="text-right">
                  Colonne
                </Label>
                <div className="col-span-3">
                  <Controller
                    name="columnId"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a column" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {taskColumns.map((col) => (
                              <SelectItem key={col.id} value={col.id + ''}>
                                {col.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input {...register('title')} id="title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                {...register('description')}
                id="description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {data && (
              <DeleteDialog
                id={data.id}
                route="/api/tasks"
                title="Delete this task ?"
                message="Are you sure you want to delete this task ? This action cannot be undone."
                onSuccess={refreshTaskColumns}
              >
                <Button className="bg-transparent border-red-900/50 border-2 p-2 hover:bg-transparent hover:border-red-900">
                  <Trash color="#AA0000" size={20} />
                </Button>
              </DeleteDialog>
            )}
            <Button type="submit">Save{!data && ' task'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
