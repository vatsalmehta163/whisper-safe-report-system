
import React, { useState } from 'react';
import { Shield, Lock, Globe, BarChart3, FileText, Brain, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ReportSubmissionModal from '@/components/ReportSubmissionModal';
import AdminDashboard from '@/components/AdminDashboard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [language, setLanguage] = useState('en');
  const { toast } = useToast();

  const languages = {
    en: {
      title: 'WhistlePro',
      subtitle: 'Anonymous AI-Powered Concern Reporting Platform',
      description: 'Secure, anonymous reporting with AI-powered categorization and analysis',
      submitReport: 'Submit Anonymous Report',
      adminAccess: 'Admin Dashboard',
      features: {
        encryption: 'End-to-End Encryption',
        encryptionDesc: 'Your reports are encrypted and completely anonymous',
        ai: 'AI Classification',
        aiDesc: 'Intelligent categorization and fake report detection',
        analytics: 'Advanced Analytics',
        analyticsDesc: 'Comprehensive dashboards and insights for administrators',
        trust: 'Trust Scoring',
        trustDesc: 'Advanced algorithms to assess report credibility',
        multilingual: 'Multilingual Support',
        multilingualDesc: 'Report in your preferred language',
        pdf: 'PDF Reports',
        pdfDesc: 'Auto-generated professional reports'
      }
    },
    es: {
      title: 'WhistlePro',
      subtitle: 'Plataforma de Reportes Anónimos con IA',
      description: 'Reportes seguros y anónimos con categorización y análisis con IA',
      submitReport: 'Enviar Reporte Anónimo',
      adminAccess: 'Panel Administrativo',
      features: {
        encryption: 'Cifrado Extremo a Extremo',
        encryptionDesc: 'Sus reportes están cifrados y son completamente anónimos',
        ai: 'Clasificación con IA',
        aiDesc: 'Categorización inteligente y detección de reportes falsos',
        analytics: 'Análisis Avanzado',
        analyticsDesc: 'Paneles e insights comprensivos para administradores',
        trust: 'Puntuación de Confianza',
        trustDesc: 'Algoritmos avanzados para evaluar credibilidad de reportes',
        multilingual: 'Soporte Multiidioma',
        multilingualDesc: 'Reporta en tu idioma preferido',
        pdf: 'Reportes PDF',
        pdfDesc: 'Reportes profesionales generados automáticamente'
      }
    },
    fr: {
      title: 'WhistlePro',
      subtitle: 'Plateforme de Signalement Anonyme avec IA',
      description: 'Signalement sécurisé et anonyme avec catégorisation et analyse IA',
      submitReport: 'Soumettre un Rapport Anonyme',
      adminAccess: 'Tableau de Bord Admin',
      features: {
        encryption: 'Chiffrement de bout en bout',
        encryptionDesc: 'Vos rapports sont chiffrés et complètement anonymes',
        ai: 'Classification IA',
        aiDesc: 'Catégorisation intelligente et détection de faux rapports',
        analytics: 'Analyses Avancées',
        analyticsDesc: 'Tableaux de bord et insights complets pour les administrateurs',
        trust: 'Score de Confiance',
        trustDesc: 'Algorithmes avancés pour évaluer la crédibilité des rapports',
        multilingual: 'Support Multilingue',
        multilingualDesc: 'Signaler dans votre langue préférée',
        pdf: 'Rapports PDF',
        pdfDesc: 'Rapports professionnels générés automatiquement'
      }
    }
  };

  const t = languages[language as keyof typeof languages];

  const features = [
    {
      icon: <Lock className="h-8 w-8 text-blue-600" />,
      title: t.features.encryption,
      description: t.features.encryptionDesc
    },
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: t.features.ai,
      description: t.features.aiDesc
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: t.features.analytics,
      description: t.features.analyticsDesc
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: t.features.trust,
      description: t.features.trustDesc
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: t.features.multilingual,
      description: t.features.multilingualDesc
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: t.features.pdf,
      description: t.features.pdfDesc
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
              <Button
                onClick={() => setShowAdminDashboard(true)}
                variant="outline"
                className="hidden sm:inline-flex"
              >
                {t.adminAccess}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-blue-600/10 rounded-full mb-6">
              <AlertTriangle className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {t.subtitle}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowSubmissionModal(true)}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Lock className="h-5 w-5 mr-2" />
                {t.submitReport}
              </Button>
              <Button
                onClick={() => setShowAdminDashboard(true)}
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg font-medium border-2 hover:bg-gray-50"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                {t.adminAccess}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Trusted & Secure</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">256-bit Encryption</h4>
              <p className="text-gray-600 text-sm">Military-grade security for all reports</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI-Powered</h4>
              <p className="text-gray-600 text-sm">Advanced algorithms for accuracy</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Global Compliance</h4>
              <p className="text-gray-600 text-sm">Meets international standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ReportSubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        language={language}
      />

      <AdminDashboard
        isOpen={showAdminDashboard}
        onClose={() => setShowAdminDashboard(false)}
      />
    </div>
  );
};

export default Index;
