
import { generateReportId, simulateEncryption, hashIP } from './encryptionUtils';

export interface EncryptedReport {
  id: string;
  encryptedTitle: string;
  encryptedDescription: string;
  category: string;
  urgency: string;
  status: string;
  trustScore: number;
  submittedAt: string;
  hashedIP: string;
  encryptionKey: string;
  aiAnalysis: {
    sentiment: string;
    keywords: string[];
    isFakeDetected: boolean;
    confidenceScore: number;
  };
  evidence?: {
    type: string;
    encrypted: boolean;
    size: string;
  }[];
}

const realisticTitles = [
  "Inappropriate behavior from manager during team meetings",
  "Financial discrepancies in Q3 budget allocations",
  "Safety protocols not followed in warehouse operations",
  "Discriminatory hiring practices in engineering department",
  "Vendor receiving preferential treatment without proper bidding",
  "Confidential client data shared without authorization",
  "Workplace harassment in accounting department",
  "Expense report fraud by senior executive",
  "Unsafe working conditions in manufacturing floor",
  "Nepotism in recent promotion decisions",
  "Data privacy violations in customer service",
  "Conflict of interest in procurement process",
  "Retaliation against previous whistleblower",
  "Inappropriate use of company resources",
  "Environmental compliance violations at facility"
];

const realisticDescriptions = [
  "During our weekly team meetings, the department manager consistently makes inappropriate comments about employees' personal lives and appearance. Multiple team members have expressed discomfort but fear retaliation if they speak up. This behavior has been ongoing for several months and is affecting team morale and productivity.",
  "I've noticed significant discrepancies in the Q3 budget allocations that don't align with our documented spending. There are several expense items that lack proper documentation and approval signatures. Some transactions appear to be personal expenses charged to company accounts.",
  "The warehouse team regularly skips mandatory safety checks and doesn't use required protective equipment. Management is aware but turns a blind eye to meet shipping deadlines. There have been three minor injuries in the past month that could have been prevented.",
  "The engineering department's hiring process appears to favor certain demographics while qualified candidates from diverse backgrounds are consistently rejected. Interview feedback often includes subjective comments that seem unrelated to technical qualifications.",
  "A specific vendor has been receiving contracts without proper competitive bidding process. The procurement manager appears to have a personal relationship with the vendor representative, and invoices are approved without standard verification procedures."
];

const ipAddresses = [
  "192.168.1.101", "10.0.0.45", "172.16.20.33", "192.168.100.15",
  "10.1.1.88", "172.31.5.67", "192.168.50.203", "10.10.10.42"
];

export const generateRealisticReports = (count: number = 25): EncryptedReport[] => {
  return Array.from({ length: count }, (_, i) => {
    const title = realisticTitles[Math.floor(Math.random() * realisticTitles.length)];
    const description = realisticDescriptions[Math.floor(Math.random() * realisticDescriptions.length)];
    const submissionDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    const ip = ipAddresses[Math.floor(Math.random() * ipAddresses.length)];
    
    const categories = ['harassment', 'financial', 'safety', 'discrimination', 'ethics', 'privacy', 'compliance'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    const urgencyLevels = ['low', 'medium', 'high', 'critical'];
    const urgency = urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)];
    
    const statuses = ['pending', 'investigating', 'resolved', 'closed'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const trustScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const isFakeDetected = Math.random() < 0.08; // 8% chance
    
    const keywords = [
      'misconduct', 'violation', 'inappropriate', 'harassment', 'discrimination',
      'safety', 'financial', 'retaliation', 'compliance', 'ethics', 'fraud'
    ].slice(0, Math.floor(Math.random() * 4) + 2);

    return {
      id: generateReportId(),
      encryptedTitle: simulateEncryption(title),
      encryptedDescription: simulateEncryption(description),
      category,
      urgency,
      status,
      trustScore,
      submittedAt: submissionDate.toISOString(),
      hashedIP: hashIP(ip),
      encryptionKey: `AES-256-${Math.random().toString(36).substr(2, 16).toUpperCase()}`,
      aiAnalysis: {
        sentiment: ['negative', 'concerned', 'serious'][Math.floor(Math.random() * 3)],
        keywords,
        isFakeDetected,
        confidenceScore: Math.floor(Math.random() * 20) + 80 // 80-100
      },
      evidence: Math.random() > 0.7 ? [
        {
          type: ['document', 'image', 'email', 'recording'][Math.floor(Math.random() * 4)],
          encrypted: true,
          size: `${Math.floor(Math.random() * 5000) + 100}KB`
        }
      ] : undefined
    };
  });
};
