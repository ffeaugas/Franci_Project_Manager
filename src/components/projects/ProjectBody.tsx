import ProjectCards from './ProjectCards';
import ProjectHeader from './ProjectHeader';

interface IProjectBodyProps {
  datas: { id: number; name: string }[];
}

const ProjectBody = ({ datas }: IProjectBodyProps) => {
  console.log(datas); //TO_REMOVE
  return (
    <div className="flex flex-col h-full max-h-screen">
      <ProjectHeader />
      <div className="p-4">
        <ProjectCards cards={datas} />
      </div>
    </div>
  );
};

export default ProjectBody;
