
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, Zap, Users, FolderOpen, PieChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactModal from 'react-modal';

const AdminDashboard = () => {
  // Comparison state
  const [compareSelection, setCompareSelection] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Handle selection for comparison
  const handleCompareSelect = (project) => {
    setCompareSelection((prev) => {
      if (prev.some(p => p.title === project.title)) {
        // Deselect if already selected
        return prev.filter(p => p.title !== project.title);
      }
      if (prev.length < 2) {
        return [...prev, project];
      }
      // Replace the first if already two selected
      return [prev[1], project];
    });
  };

  // Open comparison modal if two selected
  const openCompareModal = () => {
    if (compareSelection.length === 2) setShowCompareModal(true);
  };
  const closeCompareModal = () => setShowCompareModal(false);
  const [sortOption, setSortOption] = useState('none');
  const [sortOrder, setSortOrder] = useState('asc');
  const sortOptions = [
    { value: 'budget', label: 'Budget' },
    { value: 'date', label: 'Date Created' },
    { value: 'progress', label: 'Progress' },
    { value: 'title', label: 'Project Title' },
  ];
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleSortOrder = () => setSortOrder(order => order === 'asc' ? 'desc' : 'asc');
  const getProgressValue = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'ideation': return 0;
      case 'validation': return 33;
      case 'traction': return 66;
      case 'scaling': return 100;
      default: return 0;
    }
  };
  // Helper to format date as dd/mm/yyyy
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  };
  // Timeline events and attached documents for modal details
  const timelineEvents = [
    { label: "Project created in Idea & Research phase", date: "2024-01-15", note: "Initial concept and brainstorming." },
    { label: "Document 'market-research.pdf' uploaded", date: "2024-01-18", note: "Comprehensive market analysis completed." },
    { label: "Status changed to IPR Filing", date: "2024-01-22", note: "Started intellectual property registration." },
    { label: "Document 'patent-draft.pdf' uploaded", date: "2024-01-25", note: "Draft patent prepared for review." },
    { label: "Document 'technical-specifications.pdf' uploaded", date: "2024-01-28", note: "Technical details finalized." },
    { label: "Patent application submitted", date: "2024-02-01", note: "Patent officially submitted." },
  ];

  const attachedDocs = [
    { name: "market-research.pdf", size: "2.4 MB", date: "2024-01-18", tag: "Idea & Research" },
    { name: "patent-draft.pdf", size: "1.8 MB", date: "2024-01-25", tag: "IPR Filing" },
    { name: "technical-specifications.pdf", size: "3.2 MB", date: "2024-01-28", tag: "IPR Filing" },
    { name: "business-plan.pdf", size: "4.1 MB", date: "2024-02-05", tag: "Startup / Commercialization" },
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  // Budget slider modal state
  const [showFilter, setShowFilter] = useState(false);
  const [sliderBudget, setSliderBudget] = useState(1000000);
  const [sliderActive, setSliderActive] = useState(false);

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
    {
      title: "AI-Powered Healthcare Monitor",
      innovator: "Jane Doe",
      status: "ideation",
      dateCreated: "2024-01-15",
      budget: "$120,000",
      description: "A system to monitor patient health using AI.",
      tags: ["AI", "Healthcare"],
      collaborators: ["Amit Sharma", "Priya Singh"],
      contact: {
        name: "Jane Doe",
        email: "janedoe@gmail.com",
        phone: "+91 9876543210"
      }
    },
    {
      title: "Smart City Traffic System",
      innovator: "Rahul Verma",
      status: "validation",
      dateCreated: "2025-05-05",
      budget: "$25,000",
      description: "An IoT-based traffic management platform for smart cities, optimizing traffic flow and reducing congestion using real-time data analytics.",
      tags: ["IoT", "Smart City", "Traffic"],
      collaborators: ["Sonal Gupta", "Rohit Sinha"],
      contact: {
        name: "Rahul Verma",
        email: "rahulverma@gmail.com",
        phone: "+91 9123456789"
      }
    },
    {
      title: "Sustainable Energy Storage",
      innovator: "Sneha Patel",
      status: "traction",
      dateCreated: "2024-03-22",
      budget: "$18,500",
      description: "A novel battery technology for efficient and eco-friendly energy storage, supporting renewable energy integration.",
      tags: ["Energy", "Sustainability", "Battery"],
      collaborators: ["Karan Mehta", "Deepa Joshi"],
      contact: {
        name: "Sneha Patel",
        email: "snehapatel@gmail.com",
        phone: "+91 9988776655"
      }
    },
    {
      title: "Voice-Controlled IoT Platform",
      innovator: "Arjun Nair",
      status: "ideation",
      dateCreated: "2024-09-09",
      budget: "$9,000",
      description: "A platform enabling voice commands to control IoT devices in homes and industries, enhancing accessibility and automation.",
      tags: ["IoT", "Voice", "Automation"],
      collaborators: ["Neha Reddy", "Suresh Kumar"],
      contact: {
        name: "Arjun Nair",
        email: "arjunnair@gmail.com",
        phone: "+91 9001122334"
      }
    },
    {
      title: "Blockchain Supply Chain",
      innovator: "Meera Iyer",
      status: "validation",
      dateCreated: "2024-07-14",
      budget: "$22,000",
      description: "A blockchain-based solution for transparent and tamper-proof supply chain management, improving traceability and trust.",
      tags: ["Blockchain", "Supply Chain", "Transparency"],
      collaborators: ["Anil Kapoor", "Ritika Shah"],
      contact: {
        name: "Meera Iyer",
        email: "meera.iyer@gmail.com",
        phone: "+91 9876012345"
      }
    },
    {
      title: "AR Educational Platform",
      innovator: "Vikram Desai",
      status: "traction",
      dateCreated: "2024-11-28",
      budget: "$15,000",
      description: "An augmented reality platform to make learning interactive and immersive for students across various subjects.",
      tags: ["AR", "Education", "Learning"],
      collaborators: ["Pooja Agarwal", "Manish Tiwari"],
      contact: {
        name: "Vikram Desai",
        email: "vikramdesai@gmail.com",
        phone: "+91 9090909090"
      }
    },
  ];
  // State for innovator contact modal
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);


  // Filtered projects
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.innovator.toLowerCase().includes(searchTerm.toLowerCase());
    const budget = parseBudget(project.budget || "");
    // Slider filter takes precedence if active
    if (sliderActive) {
      return matchesSearch && budget <= sliderBudget && budget >= 1000;
    }
    const min = minBudget ? parseFloat(minBudget) : null;
    const max = maxBudget ? parseFloat(maxBudget) : null;
    const matchesBudget =
      (min === null || budget >= min) &&
      (max === null || budget <= max);
    return matchesSearch && matchesBudget;
  });

  // Sorted projects (move after filteredProjects)
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOption === 'budget') {
      const valA = parseBudget(a.budget);
      const valB = parseBudget(b.budget);
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
    if (sortOption === 'date') {
      const dateA = new Date(a.dateCreated).getTime();
      const dateB = new Date(b.dateCreated).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    if (sortOption === 'progress') {
      const progA = getProgressValue(a.status);
      const progB = getProgressValue(b.status);
      return sortOrder === 'asc' ? progA - progB : progB - progA;
    }
    if (sortOption === 'title') {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  // Modal open/close handlers
  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ideation": return "bg-blue-500/30 text-blue-900";
      case "validation": return "bg-yellow-500/30 text-yellow-900";
      case "traction": return "bg-green-500/30 text-green-900";
      case "scaling": return "bg-purple-500/30 text-purple-900";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // Ensure all functions and blocks are closed before return

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
            onChange={e => {
              setSearchTerm(e.target.value);
              if (sliderActive) setSliderActive(false);
            }}
          />
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="0"
              placeholder="Min Budget ($)"
              className="border border-gray-300 rounded-lg px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={minBudget}
              onChange={e => {
                setMinBudget(e.target.value);
                if (sliderActive) setSliderActive(false);
              }}
              disabled={sliderActive}
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              min="0"
              placeholder="Max Budget ($)"
              className="border border-gray-300 rounded-lg px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={maxBudget}
              onChange={e => {
                setMaxBudget(e.target.value);
                if (sliderActive) setSliderActive(false);
              }}
              disabled={sliderActive}
            />
            {sliderActive && (
              <Button
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={() => { setSliderActive(false); setSliderBudget(5000000); }}
              >
                Clear Filter
              </Button>
            )}
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

        {/* Projects Table & Compare Button */}
        <Card className="border-border/50 bg-card">
          {/* Compare Button */}
          <div className="flex justify-end mb-2">
            <Button
              variant="default"
              disabled={compareSelection.length !== 2}
              onClick={openCompareModal}
              className="bg-blue-600 text-white"
            >
              Compare Selected Projects
            </Button>
          </div>
          <CardHeader>
            <div className="flex items-center justify-between w-full mb-6">
              <div className="flex items-center gap-4">
                <CardTitle className="text-foreground">All Projects</CardTitle>
                <div className="flex items-center gap-2">
                  <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
                  >
                    <option value="none">Sort By</option>
                    {sortOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <Button variant="outline" size="sm" onClick={handleSortOrder} title="Toggle sort order">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                      {sortOrder === 'asc' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      )}
                    </svg>
                  </Button>
                  {/* Filter button with funnel icon (moved here) */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 ml-2"
                    title="Filter by budget (slider)"
                    onClick={() => setShowFilter(true)}
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="mr-1">
                      <polygon points="3 4 21 4 14 14 14 19 10 19 10 14 3 4" fill="#3b82f6" stroke="#2563eb" />
                      <rect x="10" y="19" width="4" height="2" rx="1" fill="#2563eb" />
                    </svg>
                    Filter
                  </Button>
                  {/* Budget slider modal (remains global, not inside table header) */}
                  {showFilter && (
                    <ReactModal
                      isOpen={showFilter}
                      onRequestClose={() => setShowFilter(false)}
                      ariaHideApp={false}
                      className="max-w-md w-full mx-auto mt-16 bg-white rounded-xl shadow-2xl outline-none p-8 flex flex-col items-center justify-center"
                      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    >
                      <div className="w-full flex flex-col items-center justify-center">
                        <div className="text-lg font-semibold mb-4 text-gray-900">Filter by Budget</div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range ($)</label>
                        <input
                          type="range"
                          min={1000}
                          max={1000000}
                          step={1000}
                          value={sliderBudget}
                          onChange={e => setSliderBudget(Number(e.target.value))}
                          className="w-full mb-2"
                        />
                        <div className="flex justify-between w-full text-xs text-gray-500 mt-1">
                          <span>$1,000</span>
                          <span>$1,000,000</span>
                        </div>
                        <div className="mt-4 text-blue-700 font-bold">Selected: ${sliderBudget.toLocaleString()}</div>
                        <div className="flex gap-2 mt-6">
                          <Button onClick={() => { setSliderActive(true); setShowFilter(false); }} className="bg-blue-500 hover:bg-blue-600 text-white">Apply</Button>
                          <Button onClick={() => { setSliderBudget(1000000); setSliderActive(false); setShowFilter(false); }} variant="outline">Reset</Button>
                        </div>
                      </div>
                    </ReactModal>
                  )}
                </div>
              </div>
              <CardDescription className="text-muted-foreground">
                Complete overview of innovation pipeline across all users
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-foreground">Project Title</TableHead>
                    <TableHead className="text-foreground">Innovator Name</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                    <TableHead className="text-foreground text-center">Ask</TableHead>
                    <TableHead className="text-foreground text-center">Progress</TableHead>
                    <TableHead className="text-foreground">Date Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedProjects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-blue-500 py-8 font-semibold">No projects found</TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {sortedProjects.map((project, index) => {
                        const isSelected = compareSelection.some(p => p.title === project.title);
                        return (
                          <TableRow
                            key={index}
                            className={`border-border cursor-pointer hover:bg-blue-50 transition ${isSelected ? 'ring-2 ring-blue-400' : ''}`}
                            onClick={() => openModal(project)}
                          >
                            <TableCell className="font-medium text-foreground flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={e => {
                                  e.stopPropagation();
                                  handleCompareSelect(project);
                                }}
                                onClick={e => e.stopPropagation()}
                                className="accent-blue-600"
                                disabled={
                                  !isSelected && compareSelection.length === 2
                                }
                              />
                              {project.title}
                            </TableCell>
                            <TableCell className="text-foreground">
                              <button
                                className="text-blue-700 underline hover:text-blue-900 focus:outline-none"
                                onClick={e => {
                                  e.stopPropagation();
                                  setContactInfo(project.contact);
                                  setContactModalOpen(true);
                                }}
                              >
                                {project.innovator}
                              </button>
                            </TableCell>
      {/* Innovator Contact Modal */}
      <ReactModal
        isOpen={contactModalOpen}
        onRequestClose={() => setContactModalOpen(false)}
        ariaHideApp={false}
        className="max-w-md w-full mx-auto mt-24 bg-white rounded-2xl shadow-2xl outline-none p-8"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        {contactInfo && (
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-2xl font-bold mb-2 text-blue-800">Innovator Contact Details</h2>
            <div className="w-full flex flex-col gap-2">
              <div><span className="font-semibold">Name:</span> {contactInfo.name}</div>
              <div><span className="font-semibold">Gmail:</span> {contactInfo.email}</div>
              <div><span className="font-semibold">Contact Number:</span> {contactInfo.phone}</div>
            </div>
            <Button onClick={() => setContactModalOpen(false)} className="mt-4 bg-blue-600 text-white">Close</Button>
          </div>
        )}
      </ReactModal>
                            <TableCell>
                              <span
                                className={`inline-block px-4 py-1 rounded-full font-semibold text-sm shadow ${getStatusColor(project.status)}`}
                                style={{ minWidth: 90, textAlign: 'center' }}
                              >
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell className="text-green-700 font-semibold">{project.budget || "-"}</TableCell>
                            <TableCell className="text-center align-middle">
                              <div className="flex flex-col items-center justify-center w-full">
                                <div className="relative w-64 h-14 flex flex-col items-center justify-center">
                                  {/* Strikethrough progress bar */}
                                  <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 bg-blue-200 rounded-full z-0"></div>
                                  {(() => {
                                    const status = (project.status || '').toLowerCase();
                                    let progress = 0;
                                    if (status === 'ideation') progress = 1;
                                    else if (status === 'validation') progress = 2;
                                    else if (status === 'traction') progress = 3;
                                    else if (status === 'scaling') progress = 4;
                                    // Highlight line from start to first node for milestone 1
                                    let percent = 0;
                                    if (progress === 1) percent = 16.5; // visually reaches first node
                                    else if (progress === 2) percent = 33;
                                    else if (progress === 3) percent = 66;
                                    else if (progress === 4) percent = 100;
                                    return (
                                      <div
                                        className="absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full z-10 transition-all duration-500"
                                        style={{ width: `${percent}%`, background: '#2563eb' }}
                                      ></div>
                                    );
                                  })()}
                                  <div className="relative w-full flex justify-between items-center z-20">
                                    {[0, 1, 2, 3].map(idx => {
                                      const phases = ['ideation', 'validation', 'traction', 'scaling'];
                                      const labels = ['Ideation', 'Validation', 'Traction', 'Scaling'];
                                      const tooltips = [
                                        'Problem identified, solution imagined, no validation yet.',
                                        'MVP built, feedback collected, demand confirmed.',
                                        'Early users/customers, engagement, product-market fit.',
                                        'Scaling team/product/customers, growth processes, rapid revenue/user growth.'
                                      ];
                                      const status = (project.status || '').toLowerCase();
                                      const active = phases.indexOf(status) >= idx;
                                      return (
                                        <div key={phases[idx]} className="flex flex-col items-center w-1/4">
                                          <span
                                            className={`relative z-30 text-base font-bold rounded-full w-7 h-7 flex items-center justify-center ${active ? 'bg-blue-500 text-white shadow-lg' : 'bg-blue-200 text-blue-500'}`}
                                            title={tooltips[idx]}
                                          >{idx + 1}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  <div className="absolute left-0 top-12 w-full flex justify-between items-center z-30">
                                    {['Ideation', 'Validation', 'Traction', 'Scaling'].map((label, idx) => (
                                      <span key={label} className="text-sm font-semibold text-blue-700 w-1/4 text-center">{label}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{formatDate(project.dateCreated)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </>
                  )}
                  {/* Project Comparison Modal */}
                  <ReactModal
                    isOpen={showCompareModal}
                    onRequestClose={closeCompareModal}
                    ariaHideApp={false}
                    className="max-w-3xl w-full mx-auto mt-16 bg-white rounded-2xl shadow-2xl outline-none p-8"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                  >
                    {compareSelection.length === 2 && (
                      <div>
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Project Comparison</h2>
                        <div className="grid grid-cols-2 gap-8">
                          {compareSelection.map((proj, idx) => (
                            <div key={proj.title} className="border rounded-xl p-6 bg-gray-50">
                              <h3 className="text-xl font-bold mb-2 text-blue-700">{proj.title}</h3>
                              <div className="mb-2"><span className="font-semibold">Innovator:</span> {proj.innovator}</div>
                              <div className="mb-2"><span className="font-semibold">Status:</span> {proj.status}</div>
                              <div className="mb-2"><span className="font-semibold">Ask:</span> {proj.budget}</div>
                              <div className="mb-2"><span className="font-semibold">Date Created:</span> {formatDate(proj.dateCreated)}</div>
                              <div className="mb-2"><span className="font-semibold">Tags:</span> {proj.tags?.join(', ') || '-'}</div>
                              <div className="mb-2"><span className="font-semibold">Collaborators:</span> {proj.collaborators?.join(', ') || '-'}</div>
                              <div className="mb-2"><span className="font-semibold">Description:</span> <span className="text-gray-700">{proj.description || '-'}</span></div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center mt-8">
                          <Button onClick={closeCompareModal} variant="default" className="bg-blue-600 text-white">Close</Button>
                        </div>
                      </div>
                    )}
                  </ReactModal>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
      {/* Project Details Modal */}
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="max-w-2xl w-full mx-auto mt-16 bg-white rounded-2xl shadow-2xl outline-none p-8"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        {selectedProject && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl font-bold text-gray-900">{selectedProject.title}</CardTitle>
                <Badge className={getStatusColor(selectedProject.status)}>{selectedProject.status}</Badge>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedProject.tags?.map((tag, idx) => (
                  <span key={tag + idx} className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold whitespace-nowrap">{tag}</span>
                ))}
              </div>
            </div>
            <div className="text-lg text-gray-500 mt-2">{selectedProject.innovator}</div>
            <div className="mb-6">
              <div className="text-base font-bold mb-1">Description</div>
              <div className="text-gray-900 text-base mb-2">{selectedProject.description || 'No description provided.'}</div>
              <div className="flex gap-4 items-center mt-2">
                <span className="uppercase text-xs font-bold tracking-widest text-gray-500">BUDGET</span>
                <span className="text-3xl font-extrabold text-blue-700 bg-gray-50 rounded-lg px-6 py-2 shadow border border-blue-100">{selectedProject.budget}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Project History */}
              <div>
                <div className="text-base font-bold mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Project History
                </div>
                <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
                  <ul className="space-y-0 relative">
                    {timelineEvents.map((item, idx, arr) => (
                      <li key={item.label + item.date} className={`flex items-start gap-2 relative ${idx !== arr.length - 1 ? 'pb-6' : ''}`}>
                        <span className="mt-1 h-2 w-2 rounded-full bg-purple-500 z-10"></span>
                        <div>
                          <span className="font-semibold text-gray-900">{item.label}</span>
                          <div className="text-xs text-gray-500">{item.date}</div>
                          {item.note && (
                            <div className="text-xs text-blue-500 mt-1 italic">{item.note}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Attached Documents */}
              <div>
                <div className="text-base font-bold mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg>
                  Attached Documents
                </div>
                <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto hide-scrollbar">
                  <ul className="space-y-3">
                    {attachedDocs.map(doc => (
                      <li key={doc.name} className="flex items-center justify-between group">
                        <div>
                          <span className="font-semibold text-gray-900">{doc.name}</span>
                          <div className="text-xs text-gray-500">{doc.size} • {doc.date}</div>
                          <span className="ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-semibold">{doc.tag}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-blue-500 border-blue-200 group-hover:bg-blue-50"
                          title={`Download ${doc.name}`}
                          onClick={() => alert(`Download ${doc.name}`)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                          </svg>
                          Download
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-8">
              <Button variant="outline" onClick={() => alert('Attach Document')}>+ Attach Document</Button>
              <Button variant="default" onClick={() => alert('Project Insight')}>Project Insight</Button>
              <Button onClick={closeModal} variant="ghost">Close</Button>
            </div>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default AdminDashboard;