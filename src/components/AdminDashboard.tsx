
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  FileText, 
  Download,
  Search,
  Filter,
  Eye,
  Brain
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [reports, setReports] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Generate mock data
  useEffect(() => {
    const mockReports = Array.from({ length: 25 }, (_, i) => ({
      id: `WP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      title: [
        'Workplace Harassment Concern',
        'Financial Irregularities Detected',
        'Safety Protocol Violation',
        'Discrimination in Hiring',
        'Ethics Policy Breach',
        'Data Privacy Concern',
        'Vendor Misconduct',
        'Management Abuse'
      ][Math.floor(Math.random() * 8)],
      category: ['harassment', 'financial', 'safety', 'discrimination', 'ethics'][Math.floor(Math.random() * 5)],
      urgency: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
      status: ['pending', 'investigating', 'resolved', 'closed'][Math.floor(Math.random() * 4)],
      trustScore: Math.floor(Math.random() * 30) + 70,
      submittedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      aiAnalysis: {
        sentiment: ['negative', 'neutral', 'concerned'][Math.floor(Math.random() * 3)],
        keywords: ['misconduct', 'violation', 'concern', 'issue', 'harassment', 'discrimination'],
        isFakeDetected: Math.random() < 0.15
      }
    }));
    setReports(mockReports);
  }, []);

  const categoryData = [
    { name: 'Harassment', value: reports.filter(r => r.category === 'harassment').length, color: '#ef4444' },
    { name: 'Financial', value: reports.filter(r => r.category === 'financial').length, color: '#f59e0b' },
    { name: 'Safety', value: reports.filter(r => r.category === 'safety').length, color: '#eab308' },
    { name: 'Discrimination', value: reports.filter(r => r.category === 'discrimination').length, color: '#8b5cf6' },
    { name: 'Ethics', value: reports.filter(r => r.category === 'ethics').length, color: '#06b6d4' }
  ];

  const monthlyData = [
    { month: 'Jan', reports: 12, resolved: 8 },
    { month: 'Feb', reports: 19, resolved: 13 },
    { month: 'Mar', reports: 15, resolved: 11 },
    { month: 'Apr', reports: 22, resolved: 18 },
    { month: 'May', reports: 18, resolved: 14 },
    { month: 'Jun', reports: 25, resolved: 20 }
  ];

  const trustScoreData = [
    { range: '90-100', count: reports.filter(r => r.trustScore >= 90).length },
    { range: '80-89', count: reports.filter(r => r.trustScore >= 80 && r.trustScore < 90).length },
    { range: '70-79', count: reports.filter(r => r.trustScore >= 70 && r.trustScore < 80).length },
    { range: '60-69', count: reports.filter(r => r.trustScore < 70).length }
  ];

  const urgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-500';
      case 'investigating': return 'bg-orange-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const generatePDFReport = (report: any) => {
    // Simulate PDF generation
    const blob = new Blob([`
      WHISTLEPRO REPORT - ${report.id}
      
      Title: ${report.title}
      Category: ${report.category}
      Urgency: ${report.urgency}
      Trust Score: ${report.trustScore}%
      Status: ${report.status}
      Submitted: ${new Date(report.submittedAt).toLocaleDateString()}
      
      AI Analysis:
      - Sentiment: ${report.aiAnalysis.sentiment}
      - Fake Detection: ${report.aiAnalysis.isFakeDetected ? 'Suspicious' : 'Authentic'}
      - Keywords: ${report.aiAnalysis.keywords.join(', ')}
      
      This is a simulated PDF report.
    `], { type: 'text/plain' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WhistlePro-Report-${report.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
              WhistlePro Admin Dashboard
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{reports.length}</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{reports.filter(r => r.status === 'pending').length}</div>
                    <p className="text-xs text-muted-foreground">Requires attention</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Trust Score</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round(reports.reduce((acc, r) => acc + r.trustScore, 0) / reports.length)}%
                    </div>
                    <p className="text-xs text-muted-foreground">High confidence</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{reports.filter(r => r.urgency === 'critical').length}</div>
                    <p className="text-xs text-muted-foreground">Immediate action needed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Report Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="reports" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-3">
                {filteredReports.map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{report.title}</h3>
                            <Badge variant="outline">{report.id}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span>Category: {report.category}</span>
                            <span>Submitted: {new Date(report.submittedAt).toLocaleDateString()}</span>
                            <span>Trust Score: {report.trustScore}%</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${urgencyColor(report.urgency)} text-white`}>
                              {report.urgency}
                            </Badge>
                            <Badge className={`${statusColor(report.status)} text-white`}>
                              {report.status}
                            </Badge>
                            {report.aiAnalysis.isFakeDetected && (
                              <Badge variant="destructive">Suspicious</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => generatePDFReport(report)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trust Score Distribution</CardTitle>
                  <CardDescription>Distribution of report trust scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={trustScoreData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resolution Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">85%</div>
                    <p className="text-sm text-gray-600">Reports resolved within 30 days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Avg Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">2.3</div>
                    <p className="text-sm text-gray-600">Days average first response</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Escalation Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">12%</div>
                    <p className="text-sm text-gray-600">Reports requiring escalation</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai-insights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-blue-600" />
                    AI Analysis Overview
                  </CardTitle>
                  <CardDescription>
                    Insights from AI-powered report analysis and fake detection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {reports.filter(r => r.aiAnalysis.isFakeDetected).length}
                      </div>
                      <p className="text-sm text-gray-600">Suspicious Reports Detected</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round((reports.filter(r => !r.aiAnalysis.isFakeDetected).length / reports.length) * 100)}%
                      </div>
                      <p className="text-sm text-gray-600">Authentic Reports</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">95%</div>
                      <p className="text-sm text-gray-600">AI Accuracy Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['negative', 'neutral', 'concerned'].map((sentiment) => {
                      const count = reports.filter(r => r.aiAnalysis.sentiment === sentiment).length;
                      const percentage = Math.round((count / reports.length) * 100);
                      return (
                        <div key={sentiment} className="flex items-center justify-between">
                          <span className="capitalize font-medium">{sentiment}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  sentiment === 'negative' ? 'bg-red-500' :
                                  sentiment === 'neutral' ? 'bg-gray-500' : 'bg-yellow-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Report Detail Modal */}
      {selectedReport && (
        <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Report Details - {selectedReport.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedReport.title}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={`${urgencyColor(selectedReport.urgency)} text-white`}>
                    {selectedReport.urgency}
                  </Badge>
                  <Badge className={`${statusColor(selectedReport.status)} text-white`}>
                    {selectedReport.status}
                  </Badge>
                  <Badge variant="outline">Trust Score: {selectedReport.trustScore}%</Badge>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Sentiment:</span>
                      <span className="ml-2 capitalize">{selectedReport.aiAnalysis.sentiment}</span>
                    </div>
                    <div>
                      <span className="font-medium">Authenticity:</span>
                      <span className="ml-2">
                        {selectedReport.aiAnalysis.isFakeDetected ? 'Suspicious' : 'Authentic'}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Keywords:</span>
                      <div className="mt-1">
                        {selectedReport.aiAnalysis.keywords.map((keyword: string, i: number) => (
                          <Badge key={i} variant="secondary" className="mr-1 mb-1">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => generatePDFReport(selectedReport)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button onClick={() => setSelectedReport(null)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AdminDashboard;
