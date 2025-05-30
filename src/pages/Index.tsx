
import React, { useState } from 'react';
import { Shield, Send, Eye, Lock, Brain, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ReportSubmissionModal from '@/components/ReportSubmissionModal';
import AdminDashboard from '@/components/AdminDashboard';
import DashboardLayout from '@/components/DashboardLayout';

const Index = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  const features = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Your reports are encrypted with military-grade security to ensure complete confidentiality."
    },
    {
      icon: Eye,
      title: "Anonymous Reporting",
      description: "Submit reports without revealing your identity. Your privacy is our top priority."
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced AI helps categorize and analyze reports for faster resolution."
    },
    {
      icon: BarChart3,
      title: "Real-time Tracking",
      description: "Track the progress of your submitted reports with our transparent system."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gray-900 rounded-2xl shadow-xl">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Secure Anonymous Reporting
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              WhistlePro provides a safe, encrypted platform for reporting workplace issues, 
              misconduct, and safety concerns with complete anonymity and professional handling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setIsReportModalOpen(true)}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg"
              >
                <Send className="mr-2 h-5 w-5" />
                Submit Report
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setIsAdminDashboardOpen(true)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Admin Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose WhistlePro?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge security with user-friendly design to ensure your voice is heard safely.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <Icon className="h-8 w-8 text-gray-700" />
                      </div>
                    </div>
                    <CardTitle className="text-gray-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Make a Report?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Your safety and anonymity are guaranteed. Take the first step towards positive change.
          </p>
          <Button 
            size="lg" 
            onClick={() => setIsReportModalOpen(true)}
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg"
          >
            <Send className="mr-2 h-5 w-5" />
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/10 rounded-xl">
                <Shield className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4">WhistlePro</h3>
            <p className="text-gray-400 mb-6">
              Secure, Anonymous, Professional Reporting Platform
            </p>
            <div className="text-sm text-gray-500">
              © 2024 WhistlePro. All rights reserved. | Privacy Policy | Terms of Service
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ReportSubmissionModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />
      
      <AdminDashboard 
        isOpen={isAdminDashboardOpen} 
        onClose={() => setIsAdminDashboardOpen(false)} 
      />
    </div>
  );
};

export default Index;
