import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const AdminReports = () => {
  // Mock data for charts
  const institutionsByState = [
    { state: "CA", count: 145 },
    { state: "TX", count: 128 },
    { state: "NY", count: 112 },
    { state: "FL", count: 98 },
    { state: "OH", count: 87 },
    { state: "PA", count: 76 },
  ];

  const institutionTypes = [
    { name: "Public", value: 450 },
    { name: "Private", value: 280 },
  ];

  const acceptanceRates = [
    { exam: "American Government", rate: 85 },
    { exam: "Biology", rate: 78 },
    { exam: "Calculus", rate: 72 },
    { exam: "English Composition", rate: 88 },
    { exam: "History", rate: 81 },
  ];

  const dataFreshness = [
    { range: "0-30 days", count: 420 },
    { range: "31-90 days", count: 180 },
    { range: "90-180 days", count: 95 },
    { range: "180+ days", count: 35 },
  ];

  const growthData = [
    { month: "Jan", institutions: 650 },
    { month: "Feb", institutions: 668 },
    { month: "Mar", institutions: 685 },
    { month: "Apr", institutions: 702 },
    { month: "May", institutions: 715 },
    { month: "Jun", institutions: 730 },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--destructive))'];

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
                <h1 className="text-3xl font-bold">System Reports & Analytics</h1>
                <p className="text-muted-foreground mt-1">
                  Comprehensive insights across all institutions
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last 30 Days
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Report
                </Button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-6 hover-lift">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Institutions</p>
                  <p className="text-3xl font-bold">730</p>
                  <div className="flex items-center text-sm text-green-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+15 this month</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover-lift">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Data Completeness</p>
                  <p className="text-3xl font-bold">87%</p>
                  <div className="flex items-center text-sm text-green-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+3% this month</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover-lift">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Recent Updates</p>
                  <p className="text-3xl font-bold">420</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Last 30 days</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover-lift">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <p className="text-3xl font-bold">12</p>
                  <div className="flex items-center text-sm text-orange-500">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span>-5 from last week</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Institutions by State (Top 6)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={institutionsByState}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="state" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Institution Types</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={institutionTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {institutionTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">CLEP Acceptance Rates by Exam</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={acceptanceRates} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--foreground))" />
                    <YAxis dataKey="exam" type="category" width={150} stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="rate" fill="hsl(var(--secondary))" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Data Freshness Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dataFreshness}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="range" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="count" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Growth Chart */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Institution Growth Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="institutions" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Data Quality Metrics */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Data Quality Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Data Freshness</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '87%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Institutions with Complete Data</span>
                    <span className="font-semibold">75%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Active Institution Participation</span>
                    <span className="font-semibold">68%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: '68%' }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminReports;
