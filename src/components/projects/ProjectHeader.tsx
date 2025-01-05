import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';
import NewProjectCardDialog from './dialogs/NewProjectCardDialog';

const ProjectHeader = () => {
  return (
    <div className="flex flex-row p-6 justify-between w-full bg-zinc-800 border-l-[1px] border-b-[1px] border-zinc-700 flex-shrink-0">
      <div className="flex flex-row gap-4 items-center">
        <SidebarTrigger />
      </div>
      <NewProjectCardDialog>
        <Button variant="outline" className="bg-zinc-900">
          Add card
        </Button>
      </NewProjectCardDialog>
    </div>
  );
};

export default ProjectHeader;
