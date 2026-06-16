import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, ShieldAlert, Info, ChevronDown,
  DollarSign, Scale, ArrowRight, Ghost, Building2,
  TrendingUp, Printer, BarChart3
} from 'lucide-react';
import type { LeaseReport, Violation } from '../types';

interface ViolationReportProps {
  report: LeaseReport;
  onViewLandlord: () => void;
  onGenerateLetter: () => void;
  onViewImpact: () => void;
}

function SeverityBadge({ severity }: { severity: Violation['severity'] }) {
  const config = {
    critical: { label: 'Critical', cls: 'badge-critical' },
    high: { label: 'High', cls: 'badge-high' },
    medium: { label: 'Medium', cls: 'badge-medium' },
    low: { label: 'Low', cls: 'badge-low' },
  };
  const { label, cls } = config[severity];
  return (
    <span className={`${cls} px-2.5 py-1 rounded-full text-xs font-medium`}>{label}</span>
  );
}

function ViolationRow({ violation, index }: { violation: Violation; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const icons = {
    critical: <ShieldAlert className="w-4 h-4 text-rg-danger" />,
    high: <AlertTriangle className="w-4 h-4 text-rg-warning" />,
    medium: <Info className="w-4 h-4 text-rg-info" />,
    low: <Info className="w-4 h-4 text-rg-text-muted" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.06 }}
      className="border-b border-rg-border last:border-0"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex-shrink-0">{icons[violation.severity]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-sm font-medium">{violation.title}</span>
            <SeverityBadge severity={violation.severity} />
          </div>
          <p className="text-xs text-rg-text-muted mt-0.5">{violation.category}</p>
        </div>
        {violation.estimatedImpact > 0 && (
          <span className="text-sm font-medium text-rg-accent flex-shrink-0 hidden sm:block">
            ${violation.estimatedImpact.toLocaleString()}/yr
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 text-rg-text-muted flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 grid grid-cols-1 md:grid-cols-3 gap-4 bg-rg-surface/50">
              <div>
                <p className="text-xs font-medium text-rg-text-muted uppercase tracking-wider mb-2">
                  Lease Language
                </p>
                <p className="text-xs text-rg-text-secondary italic leading-relaxed">
                  "{violation.leaseLanguage}"
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-rg-text-muted uppercase tracking-wider mb-2">
                  NYC Code Citation
                </p>
                <p className="text-xs text-rg-accent">{violation.nycCodeCitation}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-rg-text-muted uppercase tracking-wider mb-2">
                  Recommended Action
                </p>
                <p className="text-xs text-rg-text-secondary leading-relaxed">
                  {violation.recommendedAction}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ViolationReport({ report, onViewLandlord, onGenerateLetter, onViewImpact }: ViolationReportProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const criticalCount = report.violations.filter(v => v.severity === 'critical').length;
  const highCount = report.violations.filter(v => v.severity === 'high').length;

  const filtered = report.violations.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSev = selectedSeverity === 'all' || v.severity === selectedSeverity;
    return matchSearch && matchSev;
  });

  return (
    <div className="min-h-screen px-6 py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rg-accent flex items-center justify-center">
              <Ghost className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Violation Report</h1>
              <p className="text-xs text-rg-text-secondary">{report.propertyAddress} · Unit {report.unitNumber}</p>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="btn-secondary py-2 px-4 text-xs flex items-center gap-1.5 hidden md:flex"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-rg-danger" />
              <span className="text-xs text-rg-text-muted">Risk Score</span>
            </div>
            <p className="text-2xl font-bold text-rg-danger">{report.riskScore}</p>
            <p className="text-xs text-rg-text-muted mt-1">out of 100</p>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-rg-warning" />
              <span className="text-xs text-rg-text-muted">Violations</span>
            </div>
            <p className="text-2xl font-bold">{report.violations.length}</p>
            <p className="text-xs text-rg-text-muted mt-1">{criticalCount} critical, {highCount} high</p>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-rg-accent" />
              <span className="text-xs text-rg-text-muted">Impact</span>
            </div>
            <p className="text-2xl font-bold text-rg-accent">${report.totalFinancialImpact.toLocaleString()}</p>
            <p className="text-xs text-rg-text-muted mt-1">estimated / year</p>
          </div>
        </motion.div>

        {/* Property Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14 }}
          className="card px-5 py-4 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
        >
          {[
            ['Landlord', report.landlordName],
            ['Monthly Rent', `$${report.monthlyRent.toLocaleString()}`],
            ['Lease Period', `${report.leaseStartDate} — ${report.leaseEndDate}`],
            ['Analysis Date', report.analysisDate],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs text-rg-text-muted mb-1">{label}</p>
              <p className="text-sm font-medium text-rg-text">{value}</p>
            </div>
          ))}
        </motion.div>

        {/* Violations section */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Violations Found</h2>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-1 sm:w-48 bg-rg-surface border border-rg-border rounded-xl px-3 py-1.5 text-sm text-rg-text placeholder-rg-text-muted focus:outline-none focus:border-rg-accent transition-colors"
            />
            <div className="flex flex-wrap gap-1 bg-rg-surface border border-rg-border rounded-xl p-1">
              {['all', 'critical', 'high', 'medium'].map(sev => (
                <button
                  key={sev}
                  onClick={() => setSelectedSeverity(sev)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                    selectedSeverity === sev
                      ? 'bg-rg-accent text-white'
                      : 'text-rg-text-secondary hover:text-rg-text'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card overflow-hidden mb-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((v, i) => <ViolationRow key={v.id} violation={v} index={i} />)
            ) : (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="px-5 py-10 text-center text-sm text-rg-text-muted"
              >
                No violations match the current filter.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <button onClick={onViewLandlord} className="card card-interactive p-4 flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-rg-info/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 text-rg-info" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Landlord Intel</p>
              <p className="text-xs text-rg-text-secondary">HPD violations & history</p>
            </div>
            <ArrowRight className="w-4 h-4 text-rg-text-muted" />
          </button>

          <button onClick={onGenerateLetter} className="card card-interactive p-4 flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-rg-warning/10 flex items-center justify-center flex-shrink-0">
              <Scale className="w-4 h-4 text-rg-warning" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Demand Letter</p>
              <p className="text-xs text-rg-text-secondary">Generate legal notice</p>
            </div>
            <ArrowRight className="w-4 h-4 text-rg-text-muted" />
          </button>

          <button onClick={onViewImpact} className="btn-primary p-4 flex items-center gap-3 rounded-2xl text-left">
            <div className="w-9 h-9 rounded-xl bg-black/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">View Impact</p>
              <p className="text-xs opacity-75">Financial summary</p>
            </div>
            <ArrowRight className="w-4 h-4 opacity-60" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
