import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, ArrowRight, Mail, Lock } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("innovator");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const db = getFirestore();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      // Store role in Firestore
      try {
        await setDoc(doc(db, "user_roles", uid), {
          email,
          role
        });
      } catch (firestoreErr: any) {
        console.error("Firestore write error:", firestoreErr);
        setError("Firestore write failed: " + (firestoreErr.message || firestoreErr));
        return;
      }
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-10 container mx-auto px-4 py-8">
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
              Create Your Account
            </h2>
            <p className="text-xl text-gray-500">
              Register to start your innovation journey
            </p>
          </div>
        </header>
        <div className="max-w-md mx-auto">
          <Card className="border border-gray-200 bg-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Register</CardTitle>
              <CardDescription className="text-gray-500">
                Enter your details to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-gray-900">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-email"
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
                  <Label htmlFor="register-role" className="text-gray-900">Role</Label>
                  <select
                    id="register-role"
                    className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-gray-900"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    required
                  >
                    <option value="innovator">Innovator</option>
                    <option value="investor">Investor</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-gray-900">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password" className="text-gray-900">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {error && (
                  <div className="text-red-500 text-sm text-center">{error}</div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-2.5 transition"
                >
                  Register
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <div className="text-center mt-4">
                <a href="/" className="text-blue-500 hover:underline">Already have an account? Login here</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
