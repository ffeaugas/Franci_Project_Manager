import NewTaskDialog from './dialogs/NewTaskDialog';
import { TaskSelect } from './types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ITaskCardProps {
  data: TaskSelect;
  refreshTaskColumns: () => void;
}

const TaskCard = ({ data, refreshTaskColumns }: ITaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: 'task_' + data.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <NewTaskDialog refreshTaskColumns={refreshTaskColumns} data={data}>
        <div className="flex flex-col rounded-lg p-4 bg-zinc-700 min-h-[100px] max-h-[200px] justify-center shadow-xl cursor-pointer">
          <p className="text-md font-bold text-white">{data.title}</p>
          <p className="text-sm text-slate-100 break-words line-clamp-3">
            {data.description}
          </p>
        </div>
      </NewTaskDialog>
    </div>
  );
};

export default TaskCard;
