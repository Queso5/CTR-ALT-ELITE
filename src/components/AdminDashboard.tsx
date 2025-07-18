import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, Zap, Users, FolderOpen, PieChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  // Helper to parse budget string to number
  const parseBudget = (budget) => {
    if (!budget) return 0;
    return Number(budget.replace(/[^\d.]/g, ""));
  };

  // Progress calculation based on status
  const getProgress = (status) => {
    switch (status) {
      case "Idea & Research": return 0;
      case "IPR Filing": return 33;
      case "Startup / Commercialization": return 66;
      case "Profitable Business": return 100;
      default: return 0;
    }
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
    { title: "AI-Powered Healthcare Monitor", innovator: "Jane Doe", status: "Idea & Research", dateCreated: "2024-01-15", budget: "$12,000" },
    { title: "Smart City Traffic System", innovator: "John Smith", status: "IPR Filing", dateCreated: "2024-01-10", budget: "$25,000" },
    { title: "Sustainable Energy Storage", innovator: "Sarah Johnson", status: "Startup / Commercialization", dateCreated: "2024-01-08", budget: "$18,500" },
    { title: "Voice-Controlled IoT Platform", innovator: "Mike Chen", status: "Idea & Research", dateCreated: "2024-01-12", budget: "$9,000" },
    { title: "Blockchain Supply Chain", innovator: "Emma Wilson", status: "IPR Filing", dateCreated: "2024-01-05", budget: "$22,000" },
    { title: "AR Educational Platform", innovator: "David Brown", status: "Startup / Commercialization", dateCreated: "2024-01-03", budget: "$15,000" },
  ];

  // Filtered projects
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.innovator.toLowerCase().includes(searchTerm.toLowerCase());
    const budget = parseBudget(project.budget || "");
    const min = minBudget ? parseFloat(minBudget) : null;
    const max = maxBudget ? parseFloat(maxBudget) : null;
    const matchesBudget =
      (min === null || budget >= min) &&
      (max === null || budget <= max);
    return matchesSearch && matchesBudget;
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

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
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 bg-card/70 rounded-xl p-4 shadow">
          <input
            type="text"
            placeholder="Search by project or innovator..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="0"
              placeholder="Min Budget ($)"
              className="border border-gray-300 rounded-lg px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={minBudget}
              onChange={e => setMinBudget(e.target.value)}
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              min="0"
              placeholder="Max Budget ($)"
              className="border border-gray-300 rounded-lg px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={maxBudget}
              onChange={e => setMaxBudget(e.target.value)}
            />
          </div>
        </div>
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
            <div className="rounded-md border border-border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-foreground">Project Title</TableHead>
                    <TableHead className="text-foreground">Innovator Name</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                    <TableHead className="text-foreground">Budget</TableHead>
                    <TableHead className="text-foreground">Progress</TableHead>
                    <TableHead className="text-foreground">Date Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-blue-500 py-8 font-semibold">No projects found</TableCell>
                    </TableRow>
                  ) : (
                    filteredProjects.map((project, index) => (
                      <TableRow key={index} className="border-border">
                        <TableCell className="font-medium text-foreground">{project.title}</TableCell>
                        <TableCell className="text-foreground">{project.innovator}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-green-700 font-semibold">{project.budget || "-"}</TableCell>
                        <TableCell>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-32 h-2 bg-gray-200 rounded-full relative">
                              <div
                                className="absolute top-0 left-0 h-2 rounded-full bg-blue-500 transition-all"
                                style={{ width: `${getProgress(project.status)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-blue-700 font-bold">{getProgress(project.status)}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{project.dateCreated}</TableCell>
                      </TableRow>
                    ))
                  )}
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