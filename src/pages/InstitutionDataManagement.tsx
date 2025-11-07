import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, AlertCircle, Download, Upload, Save, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExamData {
  id: string;
  name: string;
  minScore: string;
  credits: string;
  courseCode: string;
  lastUpdated: string;
  category: string;
}

const InstitutionDataManagement = () => {
  const { toast } = useToast();
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [examData, setExamData] = useState<ExamData[]>([
    { id: "1", name: "American Government", minScore: "50", credits: "3", courseCode: "POLS 101", lastUpdated: "2024-01-15", category: "Social Sciences" },
    { id: "2", name: "Biology", minScore: "50", credits: "3", courseCode: "BIO 101", lastUpdated: "2024-02-20", category: "Natural Sciences" },
    { id: "3", name: "Chemistry", minScore: "50", credits: "3", courseCode: "CHEM 101", lastUpdated: "2024-02-20", category: "Natural Sciences" },
    { id: "4", name: "College Algebra", minScore: "50", credits: "3", courseCode: "MATH 110", lastUpdated: "2024-03-10", category: "Mathematics" },
    { id: "5", name: "English Composition", minScore: "", credits: "", courseCode: "", lastUpdated: "Never", category: "Composition" },
    { id: "6", name: "History of US I", minScore: "50", credits: "3", courseCode: "HIST 201", lastUpdated: "2024-01-15", category: "History" },
  ]);

  const [editingCell, setEditingCell] = useState<{ examId: string; field: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const handleCellEdit = (examId: string, field: keyof ExamData, value: string) => {
    setExamData((prev) =>
      prev.map((exam) =>
        exam.id === examId ? { ...exam, [field]: value } : exam
      )
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    toast({
      title: "Changes saved!",
      description: "Your CLEP data has been updated successfully.",
    });
    setHasChanges(false);
    setSelectedExams([]);
  };

  const handleReset = () => {
    toast({
      title: "Changes discarded",
      description: "All unsaved changes have been reset.",
    });
    setHasChanges(false);
  };

  const handleExport = () => {
    toast({
      title: "Exporting data...",
      description: "Your CSV file will download shortly.",
    });
  };

  const toggleSelectAll = () => {
    if (selectedExams.length === examData.length) {
      setSelectedExams([]);
    } else {
      setSelectedExams(examData.map((e) => e.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedExams((prev) =>
      prev.includes(id) ? prev.filter((examId) => examId !== id) : [...prev, id]
    );
  };

  const completedCount = examData.filter((e) => e.minScore).length;
  const totalCount = examData.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex">
        <Sidebar role="institution" />
        
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Manage CLEP Acceptance Data</h1>
            <p className="text-muted-foreground">
              Update your institution's CLEP exam acceptance policies and credit information
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 shadow-card hover-lift">
              <div className="text-sm text-muted-foreground mb-1">Total Exams Tracked</div>
              <div className="text-3xl font-bold">{totalCount}</div>
            </Card>
            <Card className="p-6 shadow-card hover-lift">
              <div className="text-sm text-muted-foreground mb-1">Accepting Credit</div>
              <div className="text-3xl font-bold text-primary">{completedCount}</div>
            </Card>
            <Card className="p-6 shadow-card hover-lift">
              <div className="text-sm text-muted-foreground mb-1">Average Min Score</div>
              <div className="text-3xl font-bold">50</div>
            </Card>
            <Card className="p-6 shadow-card hover-lift">
              <div className="text-sm text-muted-foreground mb-1">Last Update</div>
              <div className="text-lg font-semibold mt-2">March 10, 2024</div>
            </Card>
          </div>

          {/* Bulk Actions Bar */}
          {hasChanges && (
            <Card className="p-4 mb-6 border-primary/50 shadow-glow animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <span className="font-medium">You have unsaved changes</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleReset} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Discard
                  </Button>
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6 shadow-card">
            <Tabs defaultValue="all">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Exams</TabsTrigger>
                  <TabsTrigger value="recent">Recently Updated</TabsTrigger>
                  <TabsTrigger value="needs-review">Needs Review</TabsTrigger>
                </TabsList>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Import
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="pb-3 font-semibold w-12">
                          <input
                            type="checkbox"
                            checked={selectedExams.length === examData.length}
                            onChange={toggleSelectAll}
                            className="rounded"
                          />
                        </th>
                        <th className="pb-3 font-semibold">Exam Name</th>
                        <th className="pb-3 font-semibold">Category</th>
                        <th className="pb-3 font-semibold">Min Score</th>
                        <th className="pb-3 font-semibold">Credits</th>
                        <th className="pb-3 font-semibold">Course Code</th>
                        <th className="pb-3 font-semibold">Last Updated</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {examData.map((exam) => (
                        <tr key={exam.id} className="hover:bg-muted/50 transition-smooth">
                          <td className="py-4">
                            <input
                              type="checkbox"
                              checked={selectedExams.includes(exam.id)}
                              onChange={() => toggleSelect(exam.id)}
                              className="rounded"
                            />
                          </td>
                          <td className="py-4 font-medium">{exam.name}</td>
                          <td className="py-4">
                            <Badge variant="outline">{exam.category}</Badge>
                          </td>
                          <td className="py-4">
                            <Input
                              value={exam.minScore}
                              onChange={(e) => handleCellEdit(exam.id, "minScore", e.target.value)}
                              className="w-20 h-8"
                              placeholder="--"
                            />
                          </td>
                          <td className="py-4">
                            <Input
                              value={exam.credits}
                              onChange={(e) => handleCellEdit(exam.id, "credits", e.target.value)}
                              className="w-20 h-8"
                              placeholder="--"
                            />
                          </td>
                          <td className="py-4">
                            <Input
                              value={exam.courseCode}
                              onChange={(e) => handleCellEdit(exam.id, "courseCode", e.target.value)}
                              className="w-32 h-8"
                              placeholder="--"
                            />
                          </td>
                          <td className="py-4 text-sm text-muted-foreground">{exam.lastUpdated}</td>
                          <td className="py-4">
                            {exam.minScore ? (
                              <Badge variant="default" className="gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                Complete
                              </Badge>
                            ) : (
                              <Badge variant="destructive" className="gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Missing
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="recent">
                <p className="text-muted-foreground text-center py-8">
                  Showing exams updated in the last 30 days
                </p>
              </TabsContent>

              <TabsContent value="needs-review">
                <p className="text-muted-foreground text-center py-8">
                  Showing exams with missing or incomplete data
                </p>
              </TabsContent>
            </Tabs>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default InstitutionDataManagement;
