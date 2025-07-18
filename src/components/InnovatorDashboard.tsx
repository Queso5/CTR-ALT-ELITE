import { useState } from "react";
type Project = {
  id: string;
  title: string;
  milestone?: number; // 0: not started, 1: research done, 2: IPR done, 3: commercialised
};

// Minimal milestone label
function getMilestoneLabel(milestone?: number) {
  switch (milestone) {
    case 1: return "Research Completed";
    case 2: return "IPR Filing Completed";
    case 3: return "Commercialised";
    default: return "Not Started";
  }
}

// Minimal ProjectCard
const ProjectCard = ({ project }: { project: Project }) => (
  <div className="mb-6 p-4 border rounded-lg bg-white shadow">
    <div className="text-lg font-bold mb-2">{project.title}</div>
    <div className="mb-2 text-sm text-gray-500">Milestone: {getMilestoneLabel(project.milestone)}</div>
    <div className="flex flex-row items-center w-64 h-10 rounded-full border-4 border-blue-500 bg-gray-100 shadow overflow-hidden">
      <div className={`flex flex-col items-center justify-center w-1/3 h-full ${project.milestone >= 1 ? 'bg-blue-200' : 'bg-gray-200'}`}>
        <span className={`text-lg ${project.milestone >= 1 ? 'text-blue-700' : 'text-gray-400'}`}>🔬</span>
        <span className={`text-xs font-semibold ${project.milestone >= 1 ? 'text-blue-700' : 'text-gray-400'}`}>P1</span>
      </div>
      <div className={`flex flex-col items-center justify-center w-1/3 h-full ${project.milestone >= 2 ? 'bg-purple-200' : 'bg-gray-200'}`}>
        <span className={`text-lg ${project.milestone >= 2 ? 'text-purple-700' : 'text-gray-400'}`}>📄</span>
        <span className={`text-xs font-semibold ${project.milestone >= 2 ? 'text-purple-700' : 'text-gray-400'}`}>P2</span>
      </div>
      <div className={`flex flex-col items-center justify-center w-1/3 h-full ${project.milestone >= 3 ? 'bg-green-200' : 'bg-gray-200'}`}>
        <span className={`text-lg ${project.milestone >= 3 ? 'text-green-700' : 'text-gray-400'}`}>🚀</span>
        <span className={`text-xs font-semibold ${project.milestone >= 3 ? 'text-green-700' : 'text-gray-400'}`}>P3</span>
      </div>
    </div>
  </div>
);

const InnovatorDashboard = () => {
  const [projects] = useState<Project[]>([
    { id: "1", title: "AI-Powered Healthcare Monitor", milestone: 1 },
    { id: "2", title: "Smart City Traffic System", milestone: 2 },
    { id: "3", title: "Sustainable Energy Storage", milestone: 3 },
    { id: "4", title: "Voice-Controlled IoT Platform", milestone: 1 },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">NexusFlow Projects</h1>
      <div className="max-w-xl mx-auto">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
// };

export default InnovatorDashboard;