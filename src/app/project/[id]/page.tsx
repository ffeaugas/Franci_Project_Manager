import ProjectBody from '@/components/projects/ProjectBody';

export default async function Project({ params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    const datas = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects?projectId=${id}`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (!datas.ok) {
      throw new Error(`HTTP error! status: ${datas.status}`);
    }

    const projectData = await datas.json();

    return (
      <div className="min-h-screen w-full overflow-hidden">
        <ProjectBody datas={projectData} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching project:', error);
    return <div>Failed to load project</div>;
  }
}
