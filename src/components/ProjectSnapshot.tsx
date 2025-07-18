import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Zap, Download, Mail, Calendar, FileText, ExternalLink } from "lucide-react";

interface ProjectSnapshotProps {
  projectTitle?: string;
}

const ProjectSnapshot = ({ projectTitle = "AI-Powered Healthcare Monitor" }: ProjectSnapshotProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock project data
  const projectHistory = [
    { date: "2024-01-15", event: "Project created in Idea & Research phase" },
    { date: "2024-01-18", event: "Document 'market-research.pdf' uploaded" },
    { date: "2024-01-22", event: "Status changed to IPR Filing" },
    { date: "2024-01-25", event: "Document 'patent-draft.pdf' uploaded" },
    { date: "2024-01-28", event: "Document 'technical-specifications.pdf' uploaded" },
    { date: "2024-02-01", event: "Patent application submitted" },
  ];

  const attachedDocuments = [
    { name: "market-research.pdf", size: "2.4 MB", uploadDate: "2024-01-18" },
    { name: "patent-draft.pdf", size: "1.8 MB", uploadDate: "2024-01-25" },
    { name: "technical-specifications.pdf", size: "3.2 MB", uploadDate: "2024-01-28" },
    { name: "business-plan.pdf", size: "4.1 MB", uploadDate: "2024-02-05" },
  ];

  const handleExpressInterest = () => {
    console.log("Express interest clicked");
    // TODO: Implement contact functionality
  };

  const handleDownloadPDF = () => {
    console.log("Download PDF clicked");
    // TODO: Implement PDF generation and download
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Snapshot
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader className="text-center border-b border-border pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl">
              <Zap className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <DialogTitle className="text-3xl font-bold text-foreground mb-2">
            {projectTitle}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Innovation Project Snapshot - Generated on {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
          {/* Project History */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Project History
            </h3>
            
            <Card className="border-border bg-card/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {projectHistory.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.event}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attached Documents */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              Attached Documents
            </h3>
            
            <Card className="border-border bg-card/50">
              <CardContent className="p-6">
                <div className="space-y-3">
                  {attachedDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg bg-background/50">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.size} • {doc.uploadDate}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
          <Button 
            onClick={handleExpressInterest}
            className="flex-1 bg-gradient-primary hover:shadow-glow text-primary-foreground border-0"
          >
            <Mail className="h-4 w-4 mr-2" />
            Express Interest & Contact
          </Button>
          
          <Button 
            onClick={handleDownloadPDF}
            variant="outline"
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Download as PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectSnapshot;