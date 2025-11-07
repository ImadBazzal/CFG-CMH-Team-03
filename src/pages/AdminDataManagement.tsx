import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Download, Upload, AlertTriangle, CheckCircle, Edit } from "lucide-react";
import institutions from "@/data/institutions.json";

interface ExamData {
  exam: string;
  minScore: number;
  credits: number;
  courseCode: string;
  lastUpdated: string;
  hasOverride?: boolean;
  overrideReason?: string;
}

const AdminDataManagement = () => {
  const [selectedInstitution, setSelectedInstitution] = useState<string>("all");
  const [overrideMode, setOverrideMode] = useState(false);
  const [showOverrideDialog, setShowOverrideDialog] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamData | null>(null);
  const [overrideReason, setOverrideReason] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const mockExamData: ExamData[] = [
    { exam: "American Government", minScore: 50, credits: 3, courseCode: "POL 101", lastUpdated: "2024-01-15" },
    { exam: "Biology", minScore: 50, credits: 3, courseCode: "BIO 101", lastUpdated: "2024-01-20" },
    { exam: "Calculus", minScore: 50, credits: 4, courseCode: "MATH 151", lastUpdated: "2024-02-01" },
    { exam: "Chemistry", minScore: 50, credits: 3, courseCode: "CHEM 101", lastUpdated: "2023-11-10", hasOverride: true, overrideReason: "Updated to match peer institutions" },
  ];

  const pendingChanges = [
    { institution: "Ohio State University", exam: "Biology", currentScore: 50, proposedScore: 55, submittedBy: "admin@osu.edu", date: "2024-02-15" },
    { institution: "Penn State", exam: "Chemistry", currentScore: 50, proposedScore: 52, submittedBy: "admin@psu.edu", date: "2024-02-14" },
  ];

  const handleEditExam = (exam: ExamData) => {
    if (overrideMode) {
      setEditingExam(exam);
      setShowOverrideDialog(true);
    }
  };

  const handleSaveOverride = () => {
    console.log("Saving override for", editingExam?.exam, "with reason:", overrideReason);
    setShowOverrideDialog(false);
    setOverrideReason("");
    setEditingExam(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Data Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage and override CLEP acceptance data across all institutions
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="override-mode">Override Mode</Label>
                  <Switch
                    id="override-mode"
                    checked={overrideMode}
                    onCheckedChange={setOverrideMode}
                  />
                </div>
                {overrideMode && (
                  <Badge variant="destructive" className="animate-pulse">
                    Admin Override Active
                  </Badge>
                )}
              </div>
            </div>

            {/* Institution Selector */}
            <Card className="p-6">
              <div className="space-y-4">
                <Label>Select Institution</Label>
                <div className="flex gap-4">
                  <select
                    value={selectedInstitution}
                    onChange={(e) => setSelectedInstitution(e.target.value)}
                    className="flex-1 h-12 px-4 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                  >
                    <option value="all">All Institutions (Aggregated View)</option>
                    {institutions.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.name} - {inst.city}, {inst.state}
                      </option>
                    ))}
                  </select>
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </Card>

            {/* Bulk Actions */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Bulk Operations</h3>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Apply to Multiple Institutions
                  </Button>
                  <Button variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Find Inconsistencies
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>
            </Card>

            {/* Data Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Exams</TabsTrigger>
                <TabsTrigger value="recent">Recently Updated</TabsTrigger>
                <TabsTrigger value="review">Needs Review</TabsTrigger>
                <TabsTrigger value="pending">Pending Changes</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <Card className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3">Exam Name</th>
                          <th className="text-left p-3">Min Score</th>
                          <th className="text-left p-3">Credits</th>
                          <th className="text-left p-3">Course Code</th>
                          <th className="text-left p-3">Last Updated</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockExamData.map((exam, idx) => (
                          <tr key={idx} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                            <td className="p-3 font-medium">{exam.exam}</td>
                            <td className="p-3">{exam.minScore}</td>
                            <td className="p-3">{exam.credits}</td>
                            <td className="p-3">{exam.courseCode}</td>
                            <td className="p-3 text-sm text-muted-foreground">{exam.lastUpdated}</td>
                            <td className="p-3">
                              {exam.hasOverride ? (
                                <Badge variant="secondary">
                                  <Edit className="h-3 w-3 mr-1" />
                                  Override
                                </Badge>
                              ) : (
                                <Badge variant="outline">Normal</Badge>
                              )}
                            </td>
                            <td className="p-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditExam(exam)}
                                disabled={!overrideMode}
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                <Card className="p-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Pending Institution Changes</h3>
                    {pendingChanges.map((change, idx) => (
                      <div key={idx} className="border border-border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{change.institution}</h4>
                            <p className="text-sm text-muted-foreground">Exam: {change.exam}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Submitted by {change.submittedBy} on {change.date}
                            </p>
                          </div>
                          <Badge>Pending Review</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Current Score</p>
                            <p className="font-semibold text-lg">{change.currentScore}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Proposed Score</p>
                            <p className="font-semibold text-lg text-primary">{change.proposedScore}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Override Dialog */}
      <Dialog open={showOverrideDialog} onOpenChange={setShowOverrideDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Override: {editingExam?.exam}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Minimum Score</Label>
              <Input type="number" defaultValue={editingExam?.minScore} />
            </div>
            <div className="space-y-2">
              <Label>Credits</Label>
              <Input type="number" defaultValue={editingExam?.credits} />
            </div>
            <div className="space-y-2">
              <Label>Course Code</Label>
              <Input defaultValue={editingExam?.courseCode} />
            </div>
            <div className="space-y-2">
              <Label>Reason for Override (Required)</Label>
              <Textarea
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                placeholder="Explain why this override is necessary..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOverrideDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveOverride} disabled={!overrideReason.trim()}>
              Save Override
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDataManagement;
