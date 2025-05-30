
import React, { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Sidebar from './Sidebar';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { isAuthenticated, adminUser, logout } = useAdminAuth();

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onLogout={isAuthenticated ? logout : undefined}
        isAdmin={isAuthenticated}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 capitalize">{activeSection}</h1>
              <p className="text-gray-600">
                {isAuthenticated ? `Hello ${adminUser?.name},` : 'Hello,'} Here's what's going on today.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64 bg-gray-50 border-gray-200 focus:ring-gray-900 focus:border-gray-900"
                />
              </div>
              
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-700" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gray-900 text-white">
                  3
                </Badge>
              </Button>
              
              {/* User Avatar */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {isAuthenticated ? adminUser?.name : 'Guest'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-50">
          {activeSection === 'dashboard' && <DashboardContent />}
          {activeSection === 'reports' && <ReportsContent />}
          {activeSection === 'analytics' && <AnalyticsContent />}
          {activeSection === 'ai-insights' && <AIInsightsContent />}
          {children}
        </main>
      </div>
    </div>
  );
};

// Dashboard Content Components
const DashboardContent = () => (
  <div className="space-y-6">
    {/* Highlighted Issues Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <span className="w-6 h-6 bg-gray-900 text-white rounded text-sm font-bold mr-3 flex items-center justify-center">!</span>
            Highlighted Issues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <span className="text-sm text-gray-900">Critical security incidents</span>
              </div>
              <Badge variant="destructive">Critical</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">9</span>
                <span className="text-sm text-gray-900">Harassment reports pending</span>
              </div>
              <Badge className="bg-orange-500 text-white">High</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <span className="text-sm text-gray-900">Financial misconduct alert</span>
              </div>
              <Badge className="bg-yellow-500 text-white">Medium</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <User className="h-5 w-5 mr-2" />
            Assigned to me
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-sm text-gray-900">Review safety protocols</p>
                <p className="text-xs text-gray-500">Investigation ongoing</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="border-gray-900 text-gray-900">Due Mar 06</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-sm text-gray-900">Missing company equipment</p>
                <p className="text-xs text-gray-500">Collecting evidence</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="border-gray-900 text-gray-900">Due Apr 03</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-sm text-gray-900">Misuse of company property</p>
                <p className="text-xs text-gray-500">Pending review</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="border-gray-900 text-gray-900">Due Mar 20</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const ReportsContent = () => (
  <div>
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">Recent Reports</CardTitle>
        <CardDescription>All encrypted reports are displayed here</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Reports content will be shown here...</p>
      </CardContent>
    </Card>
  </div>
);

const AnalyticsContent = () => (
  <div>
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">Analytics Dashboard</CardTitle>
        <CardDescription>Comprehensive analytics and insights</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Analytics content will be shown here...</p>
      </CardContent>
    </Card>
  </div>
);

const AIInsightsContent = () => (
  <div>
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">AI Insights</CardTitle>
        <CardDescription>AI-powered analysis and recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">AI insights content will be shown here...</p>
      </CardContent>
    </Card>
  </div>
);

export default DashboardLayout;
