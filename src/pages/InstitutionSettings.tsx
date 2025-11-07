import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const InstitutionSettings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [notifyReview, setNotifyReview] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [learnerInquiries, setLearnerInquiries] = useState(false);
  const [showOnPortal, setShowOnPortal] = useState(true);
  const [allowContact, setAllowContact] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated!",
      description: "Your institution profile has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Preferences saved!",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSaveDisplay = () => {
    toast({
      title: "Settings saved!",
      description: "Your display settings have been updated.",
    });
  };

  const handleMarkAllCurrent = () => {
    toast({
      title: "Data marked as current",
      description: "All your CLEP data has been marked with today's date.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex">
        <Sidebar role="institution" />
        
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">
                Manage your institution profile, notifications, and preferences
              </p>
            </div>

            <div className="space-y-6">
              {/* Institution Profile */}
              <Card className="p-6 shadow-card">
                <h2 className="text-xl font-bold mb-6">Institution Profile</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Institution Name</Label>
                      <Input id="name" defaultValue={user?.institution?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dicode">DI Code</Label>
                      <Input id="dicode" defaultValue={user?.institution?.diCode} disabled className="bg-muted" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue={user?.institution?.city} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" defaultValue={user?.institution?.state} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input id="website" placeholder="https://www.example.edu" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Contact Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="(555) 123-4567" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Institution Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground">
                        Logo
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Profile
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Notification Preferences */}
              <Card className="p-6 shadow-card">
                <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Data Review Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Email me when data needs review (6+ months old)
                      </p>
                    </div>
                    <Switch checked={notifyReview} onCheckedChange={setNotifyReview} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Summary Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly updates on learner activity and data status
                      </p>
                    </div>
                    <Switch checked={weeklySummary} onCheckedChange={setWeeklySummary} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Learner Inquiry Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Alert me when learners contact the institution
                      </p>
                    </div>
                    <Switch checked={learnerInquiries} onCheckedChange={setLearnerInquiries} />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="notify-email">Notification Email</Label>
                    <Input id="notify-email" type="email" defaultValue={user?.email} />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveNotifications} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Display Settings */}
              <Card className="p-6 shadow-card">
                <h2 className="text-xl font-bold mb-6">Display Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show on Learner Portal</Label>
                      <p className="text-sm text-muted-foreground">
                        Make your institution visible in search results
                      </p>
                    </div>
                    <Switch checked={showOnPortal} onCheckedChange={setShowOnPortal} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Direct Contact</Label>
                      <p className="text-sm text-muted-foreground">
                        Let learners contact you directly through the portal
                      </p>
                    </div>
                    <Switch checked={allowContact} onCheckedChange={setAllowContact} />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveDisplay} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Settings
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Data Management */}
              <Card className="p-6 shadow-card">
                <h2 className="text-xl font-bold mb-6">Data Management</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Last Updated</p>
                      <p className="text-sm text-muted-foreground">March 15, 2024</p>
                    </div>
                    <Button variant="outline" onClick={handleMarkAllCurrent}>
                      Mark All as Current
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Reset to Default Scores
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Archive Old Records
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Account & Security */}
              <Card className="p-6 shadow-card">
                <h2 className="text-xl font-bold mb-6">Account & Security</h2>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Change Password
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Update Email
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                  </div>

                  <Button variant="outline" className="w-full">
                    View Login History
                  </Button>
                </div>
              </Card>

              {/* Help & Support */}
              <Card className="p-6 shadow-card">
                <h2 className="text-xl font-bold mb-6">Help & Support</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">Contact Support</Button>
                  <Button variant="outline">View Documentation</Button>
                  <Button variant="outline">Submit Feedback</Button>
                  <Button variant="outline">Request Feature</Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstitutionSettings;
