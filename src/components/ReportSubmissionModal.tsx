
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Send, AlertCircle, CheckCircle, Lock, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ReportSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

const ReportSubmissionModal: React.FC<ReportSubmissionModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [report, setReport] = useState({
    title: '',
    description: '',
    category: '',
    urgency: '',
    evidence: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const { toast } = useToast();

  const languages = {
    en: {
      title: 'Submit Anonymous Report',
      reportTitle: 'Report Title',
      description: 'Detailed Description',
      category: 'Category',
      urgency: 'Urgency Level',
      evidence: 'Evidence/Supporting Information',
      location: 'Location (Optional)',
      submit: 'Submit Securely',
      submitting: 'Encrypting & Submitting...',
      success: 'Report Submitted Successfully',
      trackingId: 'Tracking ID',
      categories: {
        harassment: 'Harassment',
        discrimination: 'Discrimination',
        financial: 'Financial Misconduct',
        safety: 'Safety Violation',
        ethics: 'Ethics Violation',
        other: 'Other'
      },
      urgencyLevels: {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        critical: 'Critical'
      }
    },
    es: {
      title: 'Enviar Reporte Anónimo',
      reportTitle: 'Título del Reporte',
      description: 'Descripción Detallada',
      category: 'Categoría',
      urgency: 'Nivel de Urgencia',
      evidence: 'Evidencia/Información de Apoyo',
      location: 'Ubicación (Opcional)',
      submit: 'Enviar de Forma Segura',
      submitting: 'Cifrando y Enviando...',
      success: 'Reporte Enviado Exitosamente',
      trackingId: 'ID de Seguimiento',
      categories: {
        harassment: 'Acoso',
        discrimination: 'Discriminación',
        financial: 'Mala Conducta Financiera',
        safety: 'Violación de Seguridad',
        ethics: 'Violación Ética',
        other: 'Otro'
      },
      urgencyLevels: {
        low: 'Bajo',
        medium: 'Medio',
        high: 'Alto',
        critical: 'Crítico'
      }
    },
    fr: {
      title: 'Soumettre un Rapport Anonyme',
      reportTitle: 'Titre du Rapport',
      description: 'Description Détaillée',
      category: 'Catégorie',
      urgency: 'Niveau d\'Urgence',
      evidence: 'Preuves/Informations Complémentaires',
      location: 'Localisation (Optionnel)',
      submit: 'Soumettre en Sécurité',
      submitting: 'Chiffrement et Envoi...',
      success: 'Rapport Soumis avec Succès',
      trackingId: 'ID de Suivi',
      categories: {
        harassment: 'Harcèlement',
        discrimination: 'Discrimination',
        financial: 'Inconduite Financière',
        safety: 'Violation de Sécurité',
        ethics: 'Violation Éthique',
        other: 'Autre'
      },
      urgencyLevels: {
        low: 'Faible',
        medium: 'Moyen',
        high: 'Élevé',
        critical: 'Critique'
      }
    }
  };

  const t = languages[language as keyof typeof languages];

  const generateReportId = () => {
    return 'WP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const simulateAIAnalysis = (reportData: any) => {
    const categories = Object.keys(t.categories);
    const detectedCategory = categories[Math.floor(Math.random() * categories.length)];
    const trustScore = Math.floor(Math.random() * 30) + 70; // 70-100
    const isFakeDetected = Math.random() < 0.1; // 10% chance of fake detection
    
    return {
      detectedCategory,
      trustScore,
      isFakeDetected,
      riskLevel: reportData.urgency || 'medium',
      sentiment: ['negative', 'neutral', 'concerned'][Math.floor(Math.random() * 3)],
      keywords: ['misconduct', 'violation', 'concern', 'issue'].slice(0, Math.floor(Math.random() * 3) + 1)
    };
  };

  const handleSubmit = async () => {
    if (!report.title || !report.description || !report.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate AI analysis
    const analysis = simulateAIAnalysis(report);
    setAiAnalysis(analysis);

    // Simulate encryption and submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newReportId = generateReportId();
    setReportId(newReportId);
    setSubmitted(true);
    setIsSubmitting(false);

    toast({
      title: t.success,
      description: `${t.trackingId}: ${newReportId}`,
    });
  };

  const reset = () => {
    setReport({
      title: '',
      description: '',
      category: '',
      urgency: '',
      evidence: '',
      location: ''
    });
    setSubmitted(false);
    setReportId('');
    setAiAnalysis(null);
    onClose();
  };

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={reset}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <CheckCircle className="h-6 w-6 mr-2" />
              {t.success}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mb-4">
                    <Badge variant="outline" className="text-lg px-4 py-2 bg-white">
                      {t.trackingId}: {reportId}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Save this tracking ID to follow up on your report anonymously.
                  </p>
                </div>
              </CardContent>
            </Card>

            {aiAnalysis && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Brain className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold">AI Analysis Results</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Detected Category:</span>
                      <div className="mt-1">
                        <Badge variant="secondary">{aiAnalysis.detectedCategory}</Badge>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Trust Score:</span>
                      <div className="mt-1">
                        <Badge 
                          variant={aiAnalysis.trustScore > 85 ? "default" : "secondary"}
                          className={aiAnalysis.trustScore > 85 ? "bg-green-600" : ""}
                        >
                          {aiAnalysis.trustScore}%
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Risk Level:</span>
                      <div className="mt-1">
                        <Badge variant={aiAnalysis.riskLevel === 'critical' ? "destructive" : "outline"}>
                          {aiAnalysis.riskLevel}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Authenticity:</span>
                      <div className="mt-1">
                        <Badge variant={aiAnalysis.isFakeDetected ? "destructive" : "default"}>
                          {aiAnalysis.isFakeDetected ? "Suspicious" : "Authentic"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex space-x-3">
              <Button onClick={reset} className="flex-1">
                Submit Another Report
              </Button>
              <Button onClick={reset} variant="outline" className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="h-6 w-6 mr-2 text-blue-600" />
            {t.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Security Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="flex items-start">
                <Lock className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Your privacy is protected</p>
                  <p className="text-blue-700">All reports are encrypted and submitted anonymously. No personal information is collected.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">{t.reportTitle} *</Label>
              <Input
                id="title"
                value={report.title}
                onChange={(e) => setReport({ ...report, title: e.target.value })}
                placeholder="Brief summary of the concern"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">{t.category} *</Label>
                <Select value={report.category} onValueChange={(value) => setReport({ ...report, category: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="harassment">{t.categories.harassment}</SelectItem>
                    <SelectItem value="discrimination">{t.categories.discrimination}</SelectItem>
                    <SelectItem value="financial">{t.categories.financial}</SelectItem>
                    <SelectItem value="safety">{t.categories.safety}</SelectItem>
                    <SelectItem value="ethics">{t.categories.ethics}</SelectItem>
                    <SelectItem value="other">{t.categories.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="urgency">{t.urgency}</Label>
                <Select value={report.urgency} onValueChange={(value) => setReport({ ...report, urgency: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t.urgencyLevels.low}</SelectItem>
                    <SelectItem value="medium">{t.urgencyLevels.medium}</SelectItem>
                    <SelectItem value="high">{t.urgencyLevels.high}</SelectItem>
                    <SelectItem value="critical">{t.urgencyLevels.critical}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">{t.description} *</Label>
              <Textarea
                id="description"
                value={report.description}
                onChange={(e) => setReport({ ...report, description: e.target.value })}
                placeholder="Provide detailed information about the concern..."
                className="mt-1 min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="evidence">{t.evidence}</Label>
              <Textarea
                id="evidence"
                value={report.evidence}
                onChange={(e) => setReport({ ...report, evidence: e.target.value })}
                placeholder="Any supporting information, documents, or evidence..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="location">{t.location}</Label>
              <Input
                id="location"
                value={report.location}
                onChange={(e) => setReport({ ...report, location: e.target.value })}
                placeholder="Department, building, or general location"
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t.submitting}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {t.submit}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportSubmissionModal;
