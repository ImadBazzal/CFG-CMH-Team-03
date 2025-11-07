import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { UploadDocumentModal } from "@/components/UploadDocumentModal";
import { InstitutionChatbot } from "@/components/InstitutionChatbot";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Upload, 
  Edit, 
  MessageSquare, 
  Eye, 
  Calendar,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const InstitutionPortal = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const examDetails = {
    exam: "Biology",
    fullName: "Biology (Natural Sciences)",
    description: "Covers material usually taught in a one-semester general biology course",
    currentMinScore: "50",
    currentCredits: "3",
    currentEquiv: "BIO 101",
    lastUpdated: "March 15, 2024",
    notes: "Lab component may be required separately"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex">
        <Sidebar role="institution" />
        
        <main className="flex-1 p-8">
          {/* Status Overview */}
          <Card className="p-6 mb-8 shadow-card hover-lift">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Last Updated</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-semibold">March 15, 2024</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Data Completion</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">87%</span>
                    <span className="text-muted-foreground">34 exams tracked</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Status</div>
                <Badge variant="default" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Up to Date
                </Badge>
              </div>
            </div>
          </Card>

          {/* Update Methods */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Update Your Data</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* AI Chatbot */}
              <Card
                className="p-6 shadow-card hover-lift cursor-pointer group"
                onClick={() => setShowChatbot(true)}
              >
                <div className="mb-4 p-4 rounded-lg bg-primary/10 w-fit">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">AI Chatbot Assistant</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our AI to update your data naturally using conversation
                </p>
                <Button className="w-full group-hover:shadow-glow transition-smooth">
                  Start Chatting
                </Button>
              </Card>

              {/* PDF Upload */}
              <Card
                className="p-6 shadow-card hover-lift cursor-pointer group"
                onClick={() => setShowUploadModal(true)}
              >
                <div className="mb-4 p-4 rounded-lg bg-secondary/10 w-fit">
                  <Upload className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Upload PDF</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your policy document and let AI extract the information
                </p>
                <Button variant="secondary" className="w-full group-hover:shadow-glow transition-smooth">
                  Upload Document
                </Button>
              </Card>

              {/* Manual Edit */}
              <Card
                className="p-6 shadow-card hover-lift cursor-pointer group"
                onClick={() => navigate("/institution/data-management")}
              >
                <div className="mb-4 p-4 rounded-lg bg-accent/10 w-fit">
                  <Edit className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">Manual Editing</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Edit data directly in a spreadsheet-style interface
                </p>
                <Button variant="outline" className="w-full group-hover:shadow-glow transition-smooth">
                  Edit Manually
                </Button>
              </Card>
            </div>
          </div>

          {/* Data Preview */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Current CLEP Data</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview as Learner
                </Button>
                <Button size="sm">Edit All</Button>
              </div>
            </div>

            {/* Sample Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 font-semibold">CLEP Exam</th>
                    <th className="pb-3 font-semibold">Min Score</th>
                    <th className="pb-3 font-semibold">Credits</th>
                    <th className="pb-3 font-semibold">Equivalency</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { exam: "Biology", score: "50", credits: "3", equiv: "BIO 101", complete: true },
                    { exam: "Chemistry", score: "50", credits: "3", equiv: "CHEM 101", complete: true },
                    { exam: "College Algebra", score: "50", credits: "3", equiv: "MATH 110", complete: true },
                    { exam: "English Composition", score: "-", credits: "-", equiv: "-", complete: false },
                    { exam: "History of US I", score: "50", credits: "3", equiv: "HIST 201", complete: true },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-muted/50 transition-smooth">
                      <td className="py-4 font-medium">{row.exam}</td>
                      <td className="py-4">{row.score}</td>
                      <td className="py-4">{row.credits}</td>
                      <td className="py-4">{row.equiv}</td>
                      <td className="py-4">
                        {row.complete ? (
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
                      <td className="py-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedExam(row.exam)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{examDetails.fullName}</DialogTitle>
                              <DialogDescription>
                                {examDetails.description}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Minimum Score</p>
                                  <p className="text-2xl font-bold">{examDetails.currentMinScore}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Credits Awarded</p>
                                  <p className="text-2xl font-bold">{examDetails.currentCredits}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Course Equivalency</p>
                                <p className="text-lg font-semibold">{examDetails.currentEquiv}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Last Updated</p>
                                <p className="text-sm">{examDetails.lastUpdated}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Notes</p>
                                <p className="text-sm">{examDetails.notes}</p>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={() => navigate("/institution/data-management")}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Details
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>

      {/* Upload Document Modal */}
      <UploadDocumentModal open={showUploadModal} onOpenChange={setShowUploadModal} />

      {/* Chatbot Sidebar */}
      <InstitutionChatbot open={showChatbot} onOpenChange={setShowChatbot} />
    </div>
  );
};

export default InstitutionPortal;
