import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const phases = [
  { key: "Idea & Research", color: "#2563eb" },
  { key: "IPR Filing", color: "#ea580c" },
  { key: "Startup / Commercialization", color: "#16a34a" },
  { key: "Profitable Business", color: "#eab308" },
];
const labels = ["Ideate", "Build", "Launch", "Grow"];
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
function getStatusColor(status: string) {
  switch (status) {
    case "Idea & Research": return "bg-blue-500/10 text-blue-500";
    case "IPR Filing": return "bg-orange-500/10 text-orange-500";
    case "Startup / Commercialization": return "bg-green-500/10 text-green-500";
    case "Profitable Business": return "bg-yellow-500/10 text-yellow-500";
    default: return "bg-muted text-muted-foreground";
  }
}

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Card className="p-8 max-w-lg w-full text-center">
          <CardTitle className="mb-4">Project Not Found</CardTitle>
          <CardContent>
            <p className="mb-6 text-muted-foreground">No project data was found. Please return to the dashboard.</p>
            <Button onClick={() => navigate("/admin")}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  const completedIdx = phases.findIndex(p => p.key === project.status);
  return (
    <div className="min-h-screen bg-background py-8 px-2">
      <div className="max-w-3xl mx-auto">
        <Card className="border border-gray-200 bg-white rounded-2xl shadow-xl p-8">
          <CardHeader className="flex flex-col gap-2 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl font-bold text-gray-900">{project.title}</CardTitle>
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags?.map((tag: string, idx: number) => (
                  <span key={tag + idx} className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold whitespace-nowrap">{tag}</span>
                ))}
              </div>
            </div>
            <div className="text-lg text-gray-500 mt-2">{project.innovator}</div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="text-base font-bold mb-1">Description</div>
              <div className="text-gray-900 text-base mb-2">{project.description}</div>
              <div className="flex gap-4 items-center mt-2">
                <span className="uppercase text-xs font-bold tracking-widest text-gray-500">BUDGET</span>
                <span className="text-3xl font-extrabold text-blue-700 bg-gray-50 rounded-lg px-6 py-2 shadow border border-blue-100">{project.budget}</span>
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
              <Button onClick={() => navigate('/admin')} variant="ghost">Back to Dashboard</Button>
            </div>
          </CardContent>
        </Card>
        <div className="w-full text-center py-6 mt-12 text-gray-400 text-sm">
          NexusFlow © 2025. Innovation made easy.
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;

