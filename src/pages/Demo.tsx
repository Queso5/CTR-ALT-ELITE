import ProjectSnapshot from "@/components/ProjectSnapshot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Demo = () => {
  const navigate = useNavigate();

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
            
            <Button onClick={() => navigate("/")} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Demo Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Project Snapshot Demo
          </h2>
          <p className="text-muted-foreground mb-8">
            This demonstrates how external stakeholders view project snapshots through shareable links.
          </p>

          <Card className="border-border/50 bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">AI-Powered Healthcare Monitor</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sample project snapshot for demonstration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectSnapshot projectTitle="AI-Powered Healthcare Monitor" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Demo;