import { useState } from "react";
import { Eye, EyeOff, Search, CheckCircle2, Clock, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import institutionsData from "@/data/institutions.json";

const InstitutionLogin = () => {
  const [selectedInstitution, setSelectedInstitution] = useState<number | undefined>();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const institutionOptions = institutionsData.map((inst) => ({
    value: inst.id,
    label: inst.name,
    sublabel: `${inst.city}, ${inst.state} • DI: ${inst.diCode}`,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedInstitution) {
      toast({
        title: "Error",
        description: "Please select your institution",
        variant: "destructive",
      });
      return;
    }

    if (!password) {
      toast({
        title: "Error",
        description: "Please enter your password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const institution = institutionsData.find((i) => i.id === selectedInstitution);
      const success = login(`admin@${institution?.name.toLowerCase().replace(/[^a-z]/g, '')}.edu`, password, "institution", selectedInstitution);
      
      setIsLoading(false);

      if (!success) {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Try: demo123",
          variant: "destructive",
        });
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Info Section */}
      <div className="hidden lg:flex lg:w-[40%] gradient-hero border-r border-border flex-col justify-between p-12">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Modern States</h1>
          <p className="text-muted-foreground">CLEP Credit Acceptance Management</p>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-foreground">
            Manage Your CLEP<br />Acceptance Data
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Update in Minutes</h3>
                <p className="text-sm text-muted-foreground">
                  Keep your CLEP acceptance policies current with our simple update tools
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 rounded-lg bg-secondary/10">
                <Brain className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">AI-Powered Extraction</h3>
                <p className="text-sm text-muted-foreground">
                  Upload PDFs and let AI extract your acceptance criteria automatically
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 rounded-lg bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Real-Time Visibility</h3>
                <p className="text-sm text-muted-foreground">
                  Your updates appear instantly to thousands of prospective students
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          © 2024 Modern States. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-foreground mb-2">Institution Login</h1>
            <p className="text-muted-foreground">
              Access your institution's CLEP data dashboard
            </p>
          </div>

          <div className="glassmorphism rounded-xl p-8 shadow-glow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Select Your Institution
                </label>
                <Dropdown
                  options={institutionOptions}
                  value={selectedInstitution}
                  onChange={(val) => setSelectedInstitution(val as number)}
                  placeholder="Search by name or DI Code..."
                  searchable
                />
                <p className="text-xs text-muted-foreground">
                  Can't find your institution? Contact support
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                  <input type="checkbox" className="rounded border-border" />
                  Remember this device
                </label>
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 gradient-primary shadow-glow hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-popover px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12"
                onClick={() => toast({
                  title: "Coming Soon",
                  description: "New institution setup is not yet available",
                })}
              >
                Set Up New Institution Account
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Need help?{" "}
            <button className="text-primary hover:underline">Contact Support</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstitutionLogin;
