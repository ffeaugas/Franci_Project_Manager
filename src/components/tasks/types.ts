import { Prisma } from '@prisma/client';
import { z, ZodType } from 'zod';

interface NewTaskForm {
  id?: number;
  title: string;
  description: string;
}

export const newTaskSchema: ZodType<NewTaskForm> = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

export type NewTaskType = z.infer<typeof newTaskSchema>;

interface NewColumnForm {
  id?: number;
  name: string;
  color: string;
}

export const newColumnSchema: ZodType<NewColumnForm> = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Title is required'),
  color: z.string().min(1, 'Color is required'),
});

export type NewColumnType = z.infer<typeof newColumnSchema>;

export const TaskColumnSelect = {
  id: true,
  name: true,
  color: true,
  tasks: {
    select: {
      id: true,
      title: true,
      description: true,
      columnId: true,
    },
  },
};

export type TaskColumnWithTasks = Prisma.TaskColumnGetPayload<{
  select: typeof TaskColumnSelect;
}>;

export type TaskSelect = TaskColumnWithTasks['tasks'][number];
