import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Mail, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useToast } from "@/hooks/use-toast";

const InstitutionReports = () => {
  const { toast } = useToast();

  const acceptanceData = [
    { name: "Accepted", value: 28, color: "#10B981" },
    { name: "Not Accepted", value: 6, color: "#EF4444" },
  ];

  const scoreData = [
    { score: "50", count: 18 },
    { score: "55", count: 7 },
    { score: "60", count: 3 },
  ];

  const creditData = [
    { credits: "3", count: 22 },
    { credits: "4", count: 4 },
    { credits: "6", count: 2 },
  ];

  const handleExportPDF = () => {
    toast({
      title: "Generating PDF...",
      description: "Your report will download shortly.",
    });
  };

  const handleExportCSV = () => {
    toast({
      title: "Exporting data...",
      description: "Your CSV file will download shortly.",
    });
  };

  const handleEmailReport = () => {
    toast({
      title: "Sending report...",
      description: "The report will be emailed to your registered address.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex">
        <Sidebar role="institution" />
        
        <main className="flex-1 p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
                <p className="text-muted-foreground">
                  View insights and export reports about your CLEP acceptance data
                </p>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all-time">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30-days">Last 30 days</SelectItem>
                    <SelectItem value="6-months">Last 6 months</SelectItem>
                    <SelectItem value="1-year">Last year</SelectItem>
                    <SelectItem value="all-time">All time</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={handleEmailReport} className="gap-2">
                  <Mail className="h-4 w-4" />
                  Email Report
                </Button>
                <Button variant="outline" onClick={handleExportCSV} className="gap-2">
                  <FileText className="h-4 w-4" />
                  CSV
                </Button>
                <Button onClick={handleExportPDF} className="gap-2">
                  <Download className="h-4 w-4" />
                  PDF Report
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Acceptance Summary */}
            <Card className="p-6 shadow-card hover-lift">
              <h3 className="text-xl font-bold mb-4">Acceptance Summary</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={acceptanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {acceptanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Exams</span>
                  <span className="font-semibold">34</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Acceptance Rate</span>
                  <span className="font-semibold text-primary">82%</span>
                </div>
              </div>
            </Card>

            {/* Score Requirements */}
            <Card className="p-6 shadow-card hover-lift">
              <h3 className="text-xl font-bold mb-4">Score Requirements</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                  <XAxis dataKey="score" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #2D3748" }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average Min Score</span>
                  <span className="font-semibold">50</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Most Common</span>
                  <span className="font-semibold">50 (18 exams)</span>
                </div>
              </div>
            </Card>

            {/* Credit Distribution */}
            <Card className="p-6 shadow-card hover-lift">
              <h3 className="text-xl font-bold mb-4">Credit Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={creditData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                  <XAxis dataKey="credits" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #2D3748" }}
                  />
                  <Bar dataKey="count" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average Credits</span>
                  <span className="font-semibold">3.2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Possible Credits</span>
                  <span className="font-semibold">84</span>
                </div>
              </div>
            </Card>

            {/* Comparison to Peers */}
            <Card className="p-6 shadow-card hover-lift">
              <h3 className="text-xl font-bold mb-4">Comparison to Peers</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Exams Accepted</span>
                    <span className="font-semibold">28/34</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "82%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Above average for your region</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Average Min Score</span>
                    <span className="font-semibold">50</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: "75%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">More accessible than peers</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Credits Awarded</span>
                    <span className="font-semibold">3.2 avg</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: "88%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Higher than regional average</p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium">
                    🎉 You accept 28/34 exams - above average for public universities in your region!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstitutionReports;
