import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { 
  Bell, 
  Mail, 
  Database, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";

const AdminPortal = () => {
  const stats = [
    {
      label: "Total Institutions",
      value: "2,547",
      change: "+12%",
      icon: Users,
      color: "text-primary"
    },
    {
      label: "Data Freshness",
      value: "87%",
      change: "-3%",
      icon: Database,
      color: "text-success"
    },
    {
      label: "Pending Alerts",
      value: "43",
      change: "+5",
      icon: AlertTriangle,
      color: "text-warning"
    },
    {
      label: "User Searches",
      value: "15.2K",
      change: "+23%",
      icon: TrendingUp,
      color: "text-secondary"
    }
  ];

  const recentAlerts = [
    {
      institution: "University of Example",
      type: "Data Outdated",
      priority: "high",
      date: "6 months ago"
    },
    {
      institution: "State College",
      type: "Missing Data",
      priority: "medium",
      date: "3 months ago"
    },
    {
      institution: "Tech Institute",
      type: "Verification Pending",
      priority: "low",
      date: "1 week ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex">
        <Sidebar role="admin" />
        
        <main className="flex-1 p-8">
          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <Card key={i} className="p-6 shadow-card hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-primary/10 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <Badge variant={stat.change.startsWith('+') ? "default" : "destructive"}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Recent Alerts */}
            <Card className="p-6 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Alerts</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {recentAlerts.map((alert, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-smooth cursor-pointer">
                    <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                      alert.priority === 'high' ? 'text-destructive' : 
                      alert.priority === 'medium' ? 'text-warning' : 
                      'text-muted-foreground'
                    }`} />
                    <div className="flex-1">
                      <div className="font-semibold">{alert.institution}</div>
                      <div className="text-sm text-muted-foreground">{alert.type}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {alert.date}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Email Tracking */}
            <Card className="p-6 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Email Communication</h2>
                <Button variant="outline" size="sm">Send Bulk</Button>
              </div>
              <div className="space-y-4">
                {[
                  { status: "delivered", count: 234, color: "text-success" },
                  { status: "opened", count: 187, color: "text-primary" },
                  { status: "bounced", count: 12, color: "text-destructive" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className={`h-5 w-5 ${item.color}`} />
                      <span className="capitalize font-medium">{item.status}</span>
                    </div>
                    <Badge variant="secondary">{item.count}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6 shadow-card">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 hover-lift">
                <Database className="h-8 w-8 text-primary" />
                <span className="font-semibold">Data Override</span>
                <span className="text-xs text-muted-foreground">Manually update institution data</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 hover-lift">
                <Mail className="h-8 w-8 text-secondary" />
                <span className="font-semibold">Bulk Email</span>
                <span className="text-xs text-muted-foreground">Send reminders to institutions</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 hover-lift">
                <TrendingUp className="h-8 w-8 text-accent" />
                <span className="font-semibold">Generate Report</span>
                <span className="text-xs text-muted-foreground">Export analytics and insights</span>
              </Button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminPortal;
