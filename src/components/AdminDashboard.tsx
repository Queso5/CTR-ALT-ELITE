import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, Zap, Users, FolderOpen, PieChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  // Mock data
  const totalInnovators = 1247;
  const totalProjects = 3856;
  const projectStatusData = [
    { status: "Idea & Research", count: 1523, percentage: 39.5 },
    { status: "IPR Filing", count: 1289, percentage: 33.4 },
    { status: "Startup / Commercialization", count: 1044, percentage: 27.1 },
  ];

  const allProjects = [
    { title: "AI-Powered Healthcare Monitor", innovator: "Jane Doe", status: "Idea & Research", dateCreated: "2024-01-15" },
    { title: "Smart City Traffic System", innovator: "John Smith", status: "IPR Filing", dateCreated: "2024-01-10" },
    { title: "Sustainable Energy Storage", innovator: "Sarah Johnson", status: "Startup / Commercialization", dateCreated: "2024-01-08" },
    { title: "Voice-Controlled IoT Platform", innovator: "Mike Chen", status: "Idea & Research", dateCreated: "2024-01-12" },
    { title: "Blockchain Supply Chain", innovator: "Emma Wilson", status: "IPR Filing", dateCreated: "2024-01-05" },
    { title: "AR Educational Platform", innovator: "David Brown", status: "Startup / Commercialization", dateCreated: "2024-01-03" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Idea & Research": return "bg-blue-500/10 text-blue-500";
      case "IPR Filing": return "bg-orange-500/10 text-orange-500";
      case "Startup / Commercialization": return "bg-green-500/10 text-green-500";
      default: return "bg-muted text-muted-foreground";
    }
  };

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
              <Badge variant="secondary" className="ml-2">Admin Panel</Badge>
            </div>
            
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        {/* Analytics Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Innovators */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Innovators</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalInnovators.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          {/* Total Projects */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalProjects.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          {/* Project Status Distribution */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Project Distribution</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {projectStatusData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.status.split(" ")[0]}</span>
                    <span className="font-medium text-foreground">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">All Projects</CardTitle>
            <CardDescription className="text-muted-foreground">
              Complete overview of innovation pipeline across all users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-foreground">Project Title</TableHead>
                    <TableHead className="text-foreground">Innovator Name</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                    <TableHead className="text-foreground">Date Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allProjects.map((project, index) => (
                    <TableRow key={index} className="border-border">
                      <TableCell className="font-medium text-foreground">{project.title}</TableCell>
                      <TableCell className="text-foreground">{project.innovator}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{project.dateCreated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;