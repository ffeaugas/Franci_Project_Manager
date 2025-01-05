const ProjectCards = ({ cards }: any) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((card: any) => (
        <div key={card.id} className="flex flex-col justify-center items-center">
          <div className="w-full h-full bg-zinc-800 border-2 border-zinc-700 rounded-lg p-4">
            <p className="text-sm text-zinc-500">{card.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCards;
