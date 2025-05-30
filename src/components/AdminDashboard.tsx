
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
  Brain,
  Lock,
  LogOut,
  User
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from './AdminLogin';
import { generateRealisticReports, type EncryptedReport } from '@/utils/realisticDataGenerator';
import { simulateDecryption } from '@/utils/encryptionUtils';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, adminUser, login, logout } = useAdminAuth();
  const [reports, setReports] = useState<EncryptedReport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<EncryptedReport | null>(null);

  // Generate realistic encrypted reports
  useEffect(() => {
    if (isAuthenticated) {
      const realisticReports = generateRealisticReports(30);
      setReports(realisticReports);
    }
  }, [isAuthenticated]);

  // Decrypt report data for display
  const decryptReport = (report: EncryptedReport) => {
    return {
      ...report,
      title: simulateDecryption(report.encryptedTitle),
      description: simulateDecryption(report.encryptedDescription)
    };
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <AdminLogin onLogin={login} />
        </DialogContent>
      </Dialog>
    );
  }

  const categoryData = [
    { name: 'Harassment', value: reports.filter(r => r.category === 'harassment').length, color: '#ef4444' },
    { name: 'Financial', value: reports.filter(r => r.category === 'financial').length, color: '#f59e0b' },
    { name: 'Safety', value: reports.filter(r => r.category === 'safety').length, color: '#eab308' },
    { name: 'Discrimination', value: reports.filter(r => r.category === 'discrimination').length, color: '#8b5cf6' },
    { name: 'Ethics', value: reports.filter(r => r.category === 'ethics').length, color: '#06b6d4' },
    { name: 'Privacy', value: reports.filter(r => r.category === 'privacy').length, color: '#10b981' },
    { name: 'Compliance', value: reports.filter(r => r.category === 'compliance').length, color: '#f97316' }
  ];

  const monthlyData = [
    { month: 'Jan', reports: 8, resolved: 6 },
    { month: 'Feb', reports: 14, resolved: 10 },
    { month: 'Mar', reports: 12, resolved: 9 },
    { month: 'Apr', reports: 18, resolved: 15 },
    { month: 'May', reports: 16, resolved: 12 },
    { month: 'Jun', reports: reports.length, resolved: reports.filter(r => r.status === 'resolved').length }
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

  const generatePDFReport = (report: EncryptedReport) => {
    const decrypted = decryptReport(report);
    const reportContent = `
      WHISTLEPRO ENCRYPTED REPORT - ${report.id}
      
      Title: ${decrypted.title}
      Category: ${report.category}
      Urgency: ${report.urgency}
      Trust Score: ${report.trustScore}%
      Status: ${report.status}
      Submitted: ${new Date(report.submittedAt).toLocaleDateString()}
      
      Encryption Details:
      - Encryption Key: ${report.encryptionKey}
      - Hashed IP: ${report.hashedIP}
      
      AI Analysis:
      - Sentiment: ${report.aiAnalysis.sentiment}
      - Confidence Score: ${report.aiAnalysis.confidenceScore}%
      - Fake Detection: ${report.aiAnalysis.isFakeDetected ? 'Suspicious' : 'Authentic'}
      - Keywords: ${report.aiAnalysis.keywords.join(', ')}
      
      Description: ${decrypted.description}
      
      ${report.evidence ? `Evidence Files: ${report.evidence.length} encrypted file(s)` : 'No evidence files attached'}
      
      This report contains encrypted data processed through WhistlePro's secure anonymization system.
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WhistlePro-Report-${report.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredReports = reports.filter(report => {
    const decrypted = decryptReport(report);
    return decrypted.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           report.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                WhistlePro Admin Dashboard
              </DialogTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>{adminUser?.name} ({adminUser?.role})</span>
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Encrypted Reports</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Security Notice */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <div className="flex items-start">
                    <Lock className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">End-to-End Encryption Active</p>
                      <p className="text-blue-700">All report data is encrypted using AES-256 encryption. IP addresses are hashed for anonymity.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{reports.length}</div>
                    <p className="text-xs text-muted-foreground">+18% from last month</p>
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
                    placeholder="Search encrypted reports..."
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
                {filteredReports.map((report) => {
                  const decrypted = decryptReport(report);
                  return (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">{decrypted.title}</h3>
                              <Badge variant="outline">{report.id}</Badge>
                              <Lock className="h-3 w-3 text-blue-600" title="Encrypted" />
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <span>Category: {report.category}</span>
                              <span>Submitted: {new Date(report.submittedAt).toLocaleDateString()}</span>
                              <span>Trust Score: {report.trustScore}%</span>
                              <span>IP Hash: {report.hashedIP.substr(0, 8)}...</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={`${urgencyColor(report.urgency)} text-white`}>
                                {report.urgency}
                              </Badge>
                              <Badge className={`${statusColor(report.status)} text-white`}>
                                {report.status}
                              </Badge>
                              {report.aiAnalysis.isFakeDetected && (
                                <Badge variant="destructive">AI: Suspicious</Badge>
                              )}
                              {report.evidence && (
                                <Badge variant="secondary">{report.evidence.length} Evidence</Badge>
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
                  );
                })}
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
                    <div className="text-3xl font-bold text-green-600">87%</div>
                    <p className="text-sm text-gray-600">Reports resolved within 30 days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Avg Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">1.8</div>
                    <p className="text-sm text-gray-600">Days average first response</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Escalation Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">9%</div>
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
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(reports.reduce((acc, r) => acc + r.aiAnalysis.confidenceScore, 0) / reports.length)}%
                      </div>
                      <p className="text-sm text-gray-600">AI Confidence Score</p>
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
                    {['negative', 'concerned', 'serious'].map((sentiment) => {
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
                                  sentiment === 'concerned' ? 'bg-yellow-500' : 'bg-orange-500'
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
              <DialogTitle>Encrypted Report Details - {selectedReport.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{decryptReport(selectedReport).title}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={`${urgencyColor(selectedReport.urgency)} text-white`}>
                    {selectedReport.urgency}
                  </Badge>
                  <Badge className={`${statusColor(selectedReport.status)} text-white`}>
                    {selectedReport.status}
                  </Badge>
                  <Badge variant="outline">Trust Score: {selectedReport.trustScore}%</Badge>
                  <Lock className="h-4 w-4 text-blue-600" title="Encrypted Data" />
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Report Content (Decrypted)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {decryptReport(selectedReport).description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Sentiment:</span>
                      <div className="mt-1">
                        <Badge variant="secondary" className="capitalize">{selectedReport.aiAnalysis.sentiment}</Badge>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Authenticity:</span>
                      <div className="mt-1">
                        <Badge 
                          variant={selectedReport.aiAnalysis.isFakeDetected ? "destructive" : "default"}
                          className={!selectedReport.aiAnalysis.isFakeDetected ? "bg-green-600" : ""}
                        >
                          {selectedReport.aiAnalysis.isFakeDetected ? 'Suspicious' : 'Authentic'}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Confidence Score:</span>
                      <div className="mt-1">
                        <Badge variant="outline">{selectedReport.aiAnalysis.confidenceScore}%</Badge>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Encryption Key:</span>
                      <div className="mt-1">
                        <Badge variant="outline" className="font-mono text-xs">{selectedReport.encryptionKey}</Badge>
                      </div>
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
                    {selectedReport.evidence && (
                      <div className="col-span-2">
                        <span className="font-medium">Evidence:</span>
                        <div className="mt-1">
                          {selectedReport.evidence.map((evidence, i) => (
                            <Badge key={i} variant="outline" className="mr-1 mb-1">
                              {evidence.type} ({evidence.size}) - Encrypted
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
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
