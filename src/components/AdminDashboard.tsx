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
        <DialogContent className="max-w-2xl animate-in fade-in-0 zoom-in-95 duration-300">
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
      case 'critical': return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'high': return 'bg-gradient-to-r from-orange-500 to-orange-600';
      case 'medium': return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      case 'low': return 'bg-gradient-to-r from-green-500 to-green-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'investigating': return 'bg-gradient-to-r from-orange-500 to-orange-600';
      case 'resolved': return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'closed': return 'bg-gradient-to-r from-gray-500 to-gray-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
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
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-500 bg-gradient-to-br from-slate-50 to-blue-50">
          <DialogHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-6 -m-6 mb-6">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center text-xl">
                <div className="p-2 bg-white/10 rounded-lg mr-3">
                  <BarChart3 className="h-6 w-6" />
                </div>
                WhistlePro Admin Dashboard
              </DialogTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm bg-white/10 rounded-full px-3 py-1">
                  <User className="h-4 w-4" />
                  <span>{adminUser?.name} ({adminUser?.role})</span>
                </div>
                <Button variant="outline" size="sm" onClick={logout} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg border-0">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300">Overview</TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300">Encrypted Reports</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300">Analytics</TabsTrigger>
              <TabsTrigger value="ai-insights" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              {/* Security Notice */}
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-500 rounded-lg mr-3">
                      <Lock className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-blue-900 mb-2 text-lg">🔒 End-to-End Encryption Active</p>
                      <p className="text-blue-700">All report data is encrypted using AES-256 encryption. IP addresses are hashed for anonymity.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Total Reports</CardTitle>
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{reports.length}</div>
                    <p className="text-xs text-green-600 font-medium">+18% from last month ↗</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-white to-orange-50 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Pending Review</CardTitle>
                    <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">{reports.filter(r => r.status === 'pending').length}</div>
                    <p className="text-xs text-orange-600 font-medium">Requires attention ⚠</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-green-50 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Avg Trust Score</CardTitle>
                    <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {Math.round(reports.reduce((acc, r) => acc + r.trustScore, 0) / reports.length)}%
                    </div>
                    <p className="text-xs text-green-600 font-medium">High confidence ✓</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-red-50 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Critical Issues</CardTitle>
                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                      <TrendingUp className="h-4 w-4 text-red-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-600">{reports.filter(r => r.urgency === 'critical').length}</div>
                    <p className="text-xs text-red-600 font-medium">Immediate action needed 🚨</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center">
                      📊 Reports by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
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

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center">
                      📈 Monthly Report Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="reports" stroke="#3b82f6" strokeWidth={3} />
                        <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search encrypted reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 border-0 bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
                <Button variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:scale-105 transition-transform">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-3">
                {filteredReports.map((report, index) => {
                  const decrypted = decryptReport(report);
                  return (
                    <Card key={report.id} className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-white to-gray-50 animate-in fade-in-0 slide-in-from-left-4" style={{ animationDelay: `${index * 100}ms` }}>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-800">{decrypted.title}</h3>
                              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">{report.id}</Badge>
                              <Lock className="h-3 w-3 text-blue-600" />
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <span className="bg-gray-100 px-2 py-1 rounded">📂 {report.category}</span>
                              <span className="bg-gray-100 px-2 py-1 rounded">📅 {new Date(report.submittedAt).toLocaleDateString()}</span>
                              <span className="bg-gray-100 px-2 py-1 rounded">🎯 {report.trustScore}%</span>
                              <span className="bg-gray-100 px-2 py-1 rounded font-mono">🔒 {report.hashedIP.substr(0, 8)}...</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={`${urgencyColor(report.urgency)} text-white shadow-lg`}>
                                {report.urgency}
                              </Badge>
                              <Badge className={`${statusColor(report.status)} text-white shadow-lg`}>
                                {report.status}
                              </Badge>
                              {report.aiAnalysis.isFakeDetected && (
                                <Badge variant="destructive" className="animate-pulse">🤖 AI: Suspicious</Badge>
                              )}
                              {report.evidence && (
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700">📎 {report.evidence.length} Evidence</Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedReport(report)}
                              className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => generatePDFReport(report)}
                              className="hover:bg-green-50 hover:text-green-600 transition-colors"
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

            <TabsContent value="analytics" className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <Card className="bg-white shadow-xl">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
                  <CardTitle>📊 Trust Score Distribution</CardTitle>
                  <CardDescription className="text-white/80">Distribution of report trust scores</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-green-400 to-blue-500 text-white shadow-xl hover:scale-105 transition-transform">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">✅ Resolution Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">87%</div>
                    <p className="text-sm opacity-90">Reports resolved within 30 days</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-xl hover:scale-105 transition-transform">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">⏱️ Avg Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">1.8</div>
                    <p className="text-sm opacity-90">Days average first response</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-xl hover:scale-105 transition-transform">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">🚨 Escalation Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">9%</div>
                    <p className="text-sm opacity-90">Reports requiring escalation</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai-insights" className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <Card className="bg-white shadow-xl">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <div className="p-2 bg-white/10 rounded-lg mr-3">
                      <Brain className="h-5 w-5" />
                    </div>
                    🤖 AI Analysis Overview
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Insights from AI-powered report analysis and fake detection
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-red-50 rounded-lg">
                      <div className="text-3xl font-bold text-red-600 mb-2">
                        {reports.filter(r => r.aiAnalysis.isFakeDetected).length}
                      </div>
                      <p className="text-sm text-red-700 font-medium">🚨 Suspicious Reports Detected</p>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {Math.round((reports.filter(r => !r.aiAnalysis.isFakeDetected).length / reports.length) * 100)}%
                      </div>
                      <p className="text-sm text-green-700 font-medium">✅ Authentic Reports</p>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {Math.round(reports.reduce((acc, r) => acc + r.aiAnalysis.confidenceScore, 0) / reports.length)}%
                      </div>
                      <p className="text-sm text-blue-700 font-medium">🎯 AI Confidence Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-xl">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg">
                  <CardTitle>😊 Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {['negative', 'concerned', 'serious'].map((sentiment) => {
                      const count = reports.filter(r => r.aiAnalysis.sentiment === sentiment).length;
                      const percentage = Math.round((count / reports.length) * 100);
                      const emoji = sentiment === 'negative' ? '😠' : sentiment === 'concerned' ? '😟' : '😐';
                      return (
                        <div key={sentiment} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <span className="capitalize font-medium flex items-center">
                            {emoji} {sentiment}
                          </span>
                          <div className="flex items-center space-x-3">
                            <div className="w-32 bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div
                                className={`h-3 rounded-full transition-all duration-1000 ${
                                  sentiment === 'negative' ? 'bg-gradient-to-r from-red-400 to-red-600' :
                                  sentiment === 'concerned' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-orange-400 to-orange-600'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-gray-700 w-12">{percentage}%</span>
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
          <DialogContent className="max-w-3xl animate-in fade-in-0 zoom-in-95 duration-300">
            <DialogHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-6 -m-6 mb-6">
              <DialogTitle className="flex items-center">
                🔍 Encrypted Report Details - {selectedReport.id}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{decryptReport(selectedReport).title}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={`${urgencyColor(selectedReport.urgency)} text-white shadow-lg`}>
                    {selectedReport.urgency}
                  </Badge>
                  <Badge className={`${statusColor(selectedReport.status)} text-white shadow-lg`}>
                    {selectedReport.status}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600">Trust Score: {selectedReport.trustScore}%</Badge>
                  <Lock className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              
              <Card className="bg-gradient-to-r from-gray-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    📄 Report Content (Decrypted)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {decryptReport(selectedReport).description}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    🤖 AI Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-white rounded-lg">
                      <span className="font-medium">Sentiment:</span>
                      <div className="mt-1">
                        <Badge variant="secondary" className="capitalize">{selectedReport.aiAnalysis.sentiment}</Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <span className="font-medium">Authenticity:</span>
                      <div className="mt-1">
                        <Badge 
                          variant={selectedReport.aiAnalysis.isFakeDetected ? "destructive" : "default"}
                          className={!selectedReport.aiAnalysis.isFakeDetected ? "bg-green-600" : ""}
                        >
                          {selectedReport.aiAnalysis.isFakeDetected ? '🚨 Suspicious' : '✅ Authentic'}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <span className="font-medium">Confidence Score:</span>
                      <div className="mt-1">
                        <Badge variant="outline">{selectedReport.aiAnalysis.confidenceScore}%</Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <span className="font-medium">Encryption Key:</span>
                      <div className="mt-1">
                        <Badge variant="outline" className="font-mono text-xs">{selectedReport.encryptionKey}</Badge>
                      </div>
                    </div>
                    <div className="col-span-2 p-3 bg-white rounded-lg">
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
                      <div className="col-span-2 p-3 bg-white rounded-lg">
                        <span className="font-medium">Evidence:</span>
                        <div className="mt-1">
                          {selectedReport.evidence.map((evidence, i) => (
                            <Badge key={i} variant="outline" className="mr-1 mb-1">
                              📎 {evidence.type} ({evidence.size}) - Encrypted
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
                  className="hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button onClick={() => setSelectedReport(null)} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
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
