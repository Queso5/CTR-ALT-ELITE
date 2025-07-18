import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, ArrowRight, Mail, Lock, User, Eye } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'innovator' | 'investor'>('innovator');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      if (activeTab === 'innovator') {
        if (email.includes("admin")) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-400 rounded-xl shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">NexusFlow</h1>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Innovation Made Easy
            </h2>
            <p className="text-xl text-gray-500">
              track ideas, collaborate with teams, and bring your innovations to life
            </p>
          </div>
        </header>

        {/* Forms Section */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-8">
            <button
              type="button"
              className={`flex-1 py-2 px-4 font-bold border border-gray-200 transition-all duration-150 ${activeTab === 'innovator' ? 'bg-blue-400 text-white shadow' : 'bg-white text-gray-900'} rounded-l-lg ${activeTab === 'investor' ? 'border-r-0' : ''}`}
              onClick={() => setActiveTab('innovator')}
            >
              Innovator
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 font-bold border border-gray-200 transition-all duration-150 ${activeTab === 'investor' ? 'bg-blue-400 text-white shadow' : 'bg-white text-gray-900'} rounded-r-lg ${activeTab === 'innovator' ? 'border-l-0' : ''}`}
              onClick={() => setActiveTab('investor')}
            >
              Investor
            </button>
          </div>
          <Card className="border border-gray-200 bg-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">{activeTab === 'innovator' ? 'Innovator Login' : 'Investor Login'}</CardTitle>
              <CardDescription className="text-gray-500">
                {activeTab === 'innovator' ? 'Sign in to continue your innovation journey' : 'Sign in to view project analytics and insights'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-gray-900">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-gray-900">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-2.5 transition"
                >
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16">
          <p className="text-gray-500 mb-4">
            Ready to transform your innovations?
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button onClick={() => navigate("/admin")} variant="outline">
              Admin Panel
            </Button>
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              Dashboard Preview
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;