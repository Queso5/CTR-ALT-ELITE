import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Paperclip, Link2, LogOut, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  status: "idea" | "ipr" | "startup";
}

const InnovatorDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", title: "AI-Powered Healthcare Monitor", status: "idea" },
    { id: "2", title: "Smart City Traffic System", status: "ipr" },
    { id: "3", title: "Sustainable Energy Storage", status: "startup" },
    { id: "4", title: "Voice-Controlled IoT Platform", status: "idea" },
  ]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleCreateProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "New Innovation Project",
      status: "idea"
    };
    setProjects([...projects, newProject]);
  };

  const getProjectsByStatus = (status: Project["status"]) => {
    return projects.filter(project => project.status === status);
  };

  const getStatusLabel = (status: Project["status"]) => {
    switch (status) {
      case "idea": return "Idea & Research";
      case "ipr": return "IPR Filing";
      case "startup": return "Startup / Commercialization";
    }
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <Card className="mb-4 border-border/50 bg-card hover:shadow-glow transition-smooth cursor-move">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-foreground">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="p-2">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="p-2">
              <Link2 className="h-4 w-4" />
            </Button>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {getStatusLabel(project.status)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">NexusFlow</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-foreground">Welcome, Jane Doe!</span>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Idea & Research Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Idea & Research</h2>
              <Badge variant="secondary">{getProjectsByStatus("idea").length}</Badge>
            </div>
            <div className="space-y-4">
              {getProjectsByStatus("idea").map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* IPR Filing Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">IPR Filing</h2>
              <Badge variant="secondary">{getProjectsByStatus("ipr").length}</Badge>
            </div>
            <div className="space-y-4">
              {getProjectsByStatus("ipr").map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Startup / Commercialization Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Startup / Commercialization</h2>
              <Badge variant="secondary">{getProjectsByStatus("startup").length}</Badge>
            </div>
            <div className="space-y-4">
              {getProjectsByStatus("startup").map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <Button
        onClick={handleCreateProject}
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-gradient-primary hover:shadow-glow text-primary-foreground border-0 shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default InnovatorDashboard;