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
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewProjectCardForm, newProjectCardSchema, NewProjectCardType } from '../types';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import DeleteDialog from '@/components/utils/DeleteDialog';
import { TaskSelect } from '@/components/tasks/types';

interface INewProjectCardDialogProps {
  children: React.ReactNode;
  data?: TaskSelect | null;
}

const NewProjectCardDialog = ({ children, data = null }: INewProjectCardDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, control } = useForm<NewProjectCardForm>({
    defaultValues: {
      name: data?.title || '',
      description: data?.description || '',
      projectId: '1',
    },
    resolver: zodResolver(newProjectCardSchema),
  });

  const onSubmit: SubmitHandler<NewProjectCardType> = async (bodyData) => {
    try {
      const response = await fetch('/api/project-cards', {
        method: data ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bodyData, id: data?.id }),
      });
      if (!response.ok) throw new Error('Failed to create project card');
      reset();
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
            <DialogTitle>{data ? 'Edit' : 'Add a new'} card</DialogTitle>
            <DialogDescription>
              Add a new card and its description. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input {...register('name')} id="name" className="col-span-3" />
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
                message="Are you sure you want to delete this card ? This action cannot be undone."
                onSuccess={() => {}}
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

export default NewProjectCardDialog;
