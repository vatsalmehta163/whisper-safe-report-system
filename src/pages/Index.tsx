import React, { useState } from 'react';
import { Shield, Lock, Globe, AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReportSubmissionModal from '@/components/ReportSubmissionModal';
import AdminDashboard from '@/components/AdminDashboard';
import DashboardLayout from '@/components/DashboardLayout';
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

  // If authenticated, show the dashboard layout
  const isAuthenticated = false; // This would come from useAdminAuth hook
  if (isAuthenticated) {
    return <DashboardLayout />;
  }

  const features = [
    {
      icon: <Lock className="h-8 w-8 text-blue-600" />,
      title: t.features.encryption,
      description: t.features.encryptionDesc,
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: t.features.ai,
      description: t.features.aiDesc,
      gradient: "from-purple-400 to-purple-600"
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: t.features.analytics,
      description: t.features.analyticsDesc,
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: t.features.trust,
      description: t.features.trustDesc,
      gradient: "from-red-400 to-red-600"
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-600" />,
      title: t.features.multilingual,
      description: t.features.multilingualDesc,
      gradient: "from-indigo-400 to-indigo-600"
    },
    {
      icon: <Globe className="h-8 w-8 text-orange-600" />,
      title: t.features.pdf,
      description: t.features.pdfDesc,
      gradient: "from-orange-400 to-orange-600"
    }
  ];

  // Otherwise show the landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-4 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b shadow-lg sticky top-0 z-40 animate-in slide-in-from-top duration-1000">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{t.title}</h1>
                <div className="flex items-center space-x-1">
                  <Sparkles className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs text-gray-500 font-medium">Secure & Anonymous</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
              >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
              </select>
              <Button
                onClick={() => setShowAdminDashboard(true)}
                variant="outline"
                className="hidden sm:inline-flex bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {t.adminAccess}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full mb-8 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110">
              <AlertTriangle className="h-16 w-16 text-emerald-600" />
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 animate-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: '200ms' }}>
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {t.subtitle}
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: '400ms' }}>
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: '600ms' }}>
              <Button
                onClick={() => setShowSubmissionModal(true)}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
              >
                <Lock className="h-5 w-5 mr-2" />
                {t.submitReport}
                <Sparkles className="h-4 w-4 ml-2" />
              </Button>
              <Button
                onClick={() => setShowAdminDashboard(true)}
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-medium border-2 bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                {t.adminAccess}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              ✨ Powerful Features
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced security and AI-powered insights to ensure your reports are protected and processed intelligently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:scale-105 transform animate-in fade-in-0 slide-in-from-bottom-4" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 bg-gradient-to-br ${feature.gradient} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      {React.cloneElement(feature.icon, { className: "h-8 w-8 text-white" })}
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {feature.title}
                  </div>
                </div>
                <div>
                  <div className="text-center text-gray-600 leading-relaxed">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
            🛡️ Trusted & Secure
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center group animate-in fade-in-0 slide-in-from-bottom-4 duration-1000" style={{ animationDelay: '200ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">🔒 256-bit Encryption</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Military-grade security for all reports</p>
            </div>
            <div className="flex flex-col items-center group animate-in fade-in-0 slide-in-from-bottom-4 duration-1000" style={{ animationDelay: '400ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">🤖 AI-Powered</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Advanced algorithms for accuracy</p>
            </div>
            <div className="flex flex-col items-center group animate-in fade-in-0 slide-in-from-bottom-4 duration-1000" style={{ animationDelay: '600ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">🌍 Global Compliance</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Meets international standards</p>
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
