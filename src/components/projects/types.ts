import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ProjectSelect = {
  id: true,
  name: true,
  icon: true,
  projectCards: {
    select: {
      id: true,
      name: true,
      description: true,
    },
  },
};

export type ProjectDatas = Prisma.ProjectGetPayload<{
  select: typeof ProjectSelect;
}>;

export type NewProjectCardForm = {
  id?: number;
  projectId: string;
  name: string;
  description: string;
};

export const newProjectCardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  projectId: z.string().min(1, 'Process is required'),
  description: z.string().min(1, 'Description is required'),
});

export type NewProjectCardType = z.infer<typeof newProjectCardSchema>;

export type ProjectCardSelect = ProjectDatas['projectCards'][number];
