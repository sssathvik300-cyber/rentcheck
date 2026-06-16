import type { LeaseReport, LandlordIntelligence, DemandLetter, AnalysisStep } from './types';

export const ANALYSIS_STEPS: AnalysisStep[] = [
  { id: 'parse', label: 'Parsing lease document', status: 'pending', detail: 'Extracting text from PDF...' },
  { id: 'extract', label: 'Extracting clauses', status: 'pending', detail: 'Identified 47 distinct clauses...' },
  { id: 'rent-stab', label: 'Checking rent stabilization compliance', status: 'pending', detail: 'Building registered as rent-stabilized in 1974...' },
  { id: 'disclosure', label: 'Checking disclosure requirements', status: 'pending', detail: 'Missing Lead Paint Disclosure (NYC Local Law 1)...' },
  { id: 'housing-reg', label: 'Checking NYC housing regulations', status: 'pending', detail: 'Found 3 non-compliant clauses...' },
  { id: 'landlord', label: 'Checking landlord violation history', status: 'pending', detail: 'HPD records show 12 open violations...' },
  { id: 'report', label: 'Generating legal report', status: 'pending', detail: 'Compiling comprehensive violation analysis...' },
];

export const MOCK_REPORT: LeaseReport = {
  id: 'rpt-2024-001',
  riskScore: 78,
  totalFinancialImpact: 4280,
  landlordName: 'Prestige Realty Holdings LLC',
  propertyAddress: '1847 Amsterdam Ave, New York, NY 10031',
  unitNumber: '4B',
  leaseStartDate: '2024-01-15',
  leaseEndDate: '2025-01-14',
  monthlyRent: 2450,
  analysisDate: new Date().toISOString().split('T')[0],
  violations: [
    {
      id: 'v1',
      title: 'Illegal Rent Increase',
      severity: 'critical',
      estimatedImpact: 2160,
      leaseLanguage: '"Monthly rent shall be $2,450.00, representing a 6.2% increase from the prior lease term of $2,307.00."',
      nycCodeCitation: 'NYC Rent Stabilization Code §26-511(c)(14) — The Rent Guidelines Board approved a maximum increase of 3.25% for one-year leases effective October 2023.',
      recommendedAction: 'File a rent overcharge complaint with the NYS Division of Housing and Community Renewal (DHCR). You may be entitled to a refund of excess rent paid plus treble damages.',
      category: 'Rent Stabilization',
    },
    {
      id: 'v2',
      title: 'Missing Lead Paint Disclosure',
      severity: 'critical',
      estimatedImpact: 0,
      leaseLanguage: 'No lead paint disclosure addendum was found in the lease document.',
      nycCodeCitation: 'NYC Local Law 1 of 2004, NYC Admin Code §27-2056.4 — Landlords of buildings built before 1960 must provide annual notice regarding lead-based paint.',
      recommendedAction: 'Demand immediate lead paint disclosure and inspection. Report to NYC HPD if landlord fails to comply within 10 days. Building was constructed in 1952.',
      category: 'Health & Safety',
    },
    {
      id: 'v3',
      title: 'Missing Rent Stabilization Notice',
      severity: 'high',
      estimatedImpact: 0,
      leaseLanguage: 'Lease does not contain the required rent stabilization rider or disclosure of legal regulated rent.',
      nycCodeCitation: 'NYC Rent Stabilization Code §2522.5(c)(1) — Owners must furnish each rent stabilized tenant with a copy of the DHCR Rent Stabilization Lease Rider.',
      recommendedAction: 'Request the rent stabilization rider from your landlord in writing. If they refuse, contact DHCR at (718) 739-6400.',
      category: 'Rent Stabilization',
    },
    {
      id: 'v4',
      title: 'Improper Security Deposit Language',
      severity: 'medium',
      estimatedImpact: 1220,
      leaseLanguage: '"Tenant shall pay a security deposit of $4,900.00 (two months\' rent)."',
      nycCodeCitation: 'NY General Obligations Law §7-108 — Security deposits are limited to one month\'s rent for most residential tenants. Excess deposits must be returned.',
      recommendedAction: 'Demand return of excess security deposit ($2,450). If landlord refuses, file a complaint in Small Claims Court.',
      category: 'Financial',
    },
    {
      id: 'v5',
      title: 'Excessive Late Fee',
      severity: 'medium',
      estimatedImpact: 900,
      leaseLanguage: '"A late fee of $150.00 shall be assessed for any rent payment received after the 3rd day of the month."',
      nycCodeCitation: 'NYC Admin Code §22-902(a) — Late fees for residential tenants cannot exceed $50 or 5% of monthly rent, whichever is less.',
      recommendedAction: 'Notify landlord that the late fee exceeds legal limits. Request refund of any excess late fees previously charged.',
      category: 'Financial',
    },
  ],
};

export const MOCK_LANDLORD_INTEL: LandlordIntelligence = {
  landlordName: 'Prestige Realty Holdings LLC',
  totalProperties: 14,
  totalUnits: 342,
  averageRiskScore: 72,
  openComplaints: 23,
  buildingAge: 72,
  lastInspection: '2024-08-15',
  rentStabilized: true,
  propertyRiskScore: 81,
  violationHistory: [
    { month: 'Jan', count: 3 },
    { month: 'Feb', count: 5 },
    { month: 'Mar', count: 2 },
    { month: 'Apr', count: 7 },
    { month: 'May', count: 4 },
    { month: 'Jun', count: 8 },
    { month: 'Jul', count: 6 },
    { month: 'Aug', count: 9 },
    { month: 'Sep', count: 5 },
    { month: 'Oct', count: 11 },
    { month: 'Nov', count: 7 },
    { month: 'Dec', count: 4 },
  ],
  complaintCategories: [
    { category: 'Heat/Hot Water', count: 18 },
    { category: 'Paint/Plaster', count: 14 },
    { category: 'Plumbing', count: 11 },
    { category: 'Elevator', count: 8 },
    { category: 'Pests', count: 6 },
    { category: 'Fire Safety', count: 4 },
  ],
  hpdViolations: [
    { id: 'hpd-001', date: '2024-10-15', type: 'Class C - Immediately Hazardous', status: 'open', description: 'Failure to maintain smoke/CO detectors in apartment 4B', severity: 'critical' },
    { id: 'hpd-002', date: '2024-09-22', type: 'Class B - Hazardous', status: 'open', description: 'Defective plaster and peeling paint in hallway, 4th floor', severity: 'high' },
    { id: 'hpd-003', date: '2024-08-10', type: 'Class B - Hazardous', status: 'pending', description: 'Inadequate hot water supply, intermittent', severity: 'high' },
    { id: 'hpd-004', date: '2024-07-03', type: 'Class A - Non-Hazardous', status: 'open', description: 'Missing window screen in bedroom, unit 4B', severity: 'medium' },
    { id: 'hpd-005', date: '2024-05-18', type: 'Class C - Immediately Hazardous', status: 'closed', description: 'Lead paint hazard in apartment 2A, child under 6', severity: 'critical' },
    { id: 'hpd-006', date: '2024-03-11', type: 'Class B - Hazardous', status: 'closed', description: 'Roach infestation in kitchen areas, multiple units', severity: 'high' },
  ],
};

export const generateDemandLetter = (report: LeaseReport): DemandLetter => ({
  tenantName: '[TENANT NAME]',
  tenantAddress: `${report.propertyAddress}, Unit ${report.unitNumber}`,
  landlordName: report.landlordName,
  landlordAddress: '450 Park Avenue, Suite 1200, New York, NY 10022',
  date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  subject: 'NOTICE OF LEASE VIOLATIONS AND DEMAND FOR CORRECTIVE ACTION',
  body: `Dear ${report.landlordName},

I am writing to formally notify you of multiple violations of New York City housing regulations and the New York State Rent Stabilization Code that have been identified in my current lease agreement for the premises located at ${report.propertyAddress}, Unit ${report.unitNumber}.

After a thorough review of my lease agreement dated ${report.leaseStartDate}, the following violations have been identified that require your immediate attention and corrective action.

Please be advised that failure to address these violations within thirty (30) days of receipt of this notice may result in the filing of formal complaints with the appropriate regulatory agencies, including but not limited to the New York State Division of Housing and Community Renewal (DHCR), the New York City Department of Housing Preservation and Development (HPD), and/or the initiation of legal proceedings in Housing Court.

I reserve all rights and remedies available to me under applicable law, including but not limited to the right to seek treble damages for willful rent overcharges pursuant to NYC Rent Stabilization Code §2526.1(a).

I look forward to your prompt response and resolution of these matters.`,
  violations: report.violations.map((v) => ({
    title: v.title,
    code: v.nycCodeCitation.split('—')[0].trim(),
    description: v.recommendedAction,
  })),
  deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
});
