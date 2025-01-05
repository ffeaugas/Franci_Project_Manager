'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensors,
  useSensor,
  PointerSensor,
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import TaskColumn from './TaskColumn';
import TaskHeader from './TaskHeader';
import { TaskColumnWithTasks, TaskSelect } from './types';
import NewColumnDialog from './dialogs/NewColumnDialog';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';
import TaskCard from './TaskCard';

const TaskBody = () => {
  const [taskColumns, setTaskColumns] = useState<TaskColumnWithTasks[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTask, setActiveTask] = useState<TaskSelect | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = findTask(taskColumns, active.id as string);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { over } = event;
    if (!over) return;
    const overColumn = findColumn(taskColumns, over.id as string);

    if (!overColumn || !activeTask) return;
    if (activeTask.columnId === overColumn.id) return;

    setTaskColumns((prev) => {
      return prev.map((column) => {
        if (column.id !== overColumn.id) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== activeTask.id),
          };
        }
        // Add to new column
        if (
          column.id === overColumn.id &&
          !overColumn.tasks.some((task) => task.id === activeTask.id)
        ) {
          return {
            ...column,
            tasks: [...column.tasks, { ...activeTask, columnId: overColumn.id }],
          };
        }
        return column;
      });
    });

    try {
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...activeTask, columnId: overColumn.id }),
      });
    } catch (error) {
      console.error('Failed to update task column:', error);
    }

    setActiveTask(null);
  };

  const fetchTaskColumns = async () => {
    const response = await fetch(`/api/task-columns/?pageId=${1}`);
    const data = await response.json();
    setTaskColumns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTaskColumns();
  }, []);

  if (isLoading) return <Spinner size="large" />;

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-full max-h-screen">
        <TaskHeader refreshTaskColumns={fetchTaskColumns} taskColumns={taskColumns} />
        <div className="flex-1 overflow-auto">
          <div className="flex flex-row gap-6 p-6 min-w-fit h-full">
            {taskColumns.map((col) => (
              <TaskColumn
                key={col.id}
                data={col}
                refreshTaskColumns={fetchTaskColumns}
                taskColumns={taskColumns}
              />
            ))}
            <NewColumnDialog refreshTaskColumns={fetchTaskColumns}>
              <Button
                variant="outline"
                className="flex flex-col justify-center w-[300px] h-[500px] bg-transparent border-dashed border-2 border-zinc-700 p-4 text-zinc-500 text-xl mt-12"
              >
                Add Column
              </Button>
            </NewColumnDialog>
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeTask ? (
          <TaskCard
            data={activeTask}
            refreshTaskColumns={fetchTaskColumns}
            taskColumns={taskColumns}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBody;

// Utility functions
const findTask = (columns: TaskColumnWithTasks[], taskId: string) => {
  const id = parseInt(taskId.replace('task_', ''));

  for (const column of columns) {
    const task = column.tasks.find((t) => t.id === id);
    if (task) return task;
  }
  return null;
};

const findColumn = (columns: TaskColumnWithTasks[], overId: string) => {
  const [type, idStr] = overId.split('_');
  const id = parseInt(idStr);

  switch (type) {
    case 'task':
      return columns.find((col) => col.tasks.some((task) => task.id === id)) || null;
    case 'col':
      return columns.find((col) => col.id === id) || null;
    default:
      return null;
  }
};
