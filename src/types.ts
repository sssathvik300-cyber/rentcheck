export interface Violation {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  estimatedImpact: number;
  leaseLanguage: string;
  nycCodeCitation: string;
  recommendedAction: string;
  category: string;
}

export interface AnalysisStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  detail?: string;
}

export interface LeaseReport {
  id: string;
  riskScore: number;
  totalFinancialImpact: number;
  violations: Violation[];
  landlordName: string;
  propertyAddress: string;
  unitNumber: string;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyRent: number;
  analysisDate: string;
}

export interface HPDViolation {
  id: string;
  date: string;
  type: string;
  status: 'open' | 'closed' | 'pending';
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

export interface LandlordIntelligence {
  landlordName: string;
  totalProperties: number;
  totalUnits: number;
  averageRiskScore: number;
  hpdViolations: HPDViolation[];
  openComplaints: number;
  buildingAge: number;
  lastInspection: string;
  rentStabilized: boolean;
  propertyRiskScore: number;
  violationHistory: { month: string; count: number }[];
  complaintCategories: { category: string; count: number }[];
}

export interface DemandLetter {
  tenantName: string;
  tenantAddress: string;
  landlordName: string;
  landlordAddress: string;
  date: string;
  subject: string;
  body: string;
  violations: { title: string; code: string; description: string }[];
  deadline: string;
}

export type AppScreen = 'landing' | 'upload' | 'analysis' | 'report' | 'landlord' | 'letter' | 'wow';
