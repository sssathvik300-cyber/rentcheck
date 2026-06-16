import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, ShieldAlert, Info, ChevronDown, ChevronUp,
  DollarSign, Scale, ArrowRight, Ghost, Building2,
  TrendingUp, Printer
} from 'lucide-react';
import type { LeaseReport, Violation } from '../types';

interface ViolationReportProps {
  report: LeaseReport;
  onViewLandlord: () => void;
  onGenerateLetter: () => void;
  onViewImpact: () => void;
}

function RiskGauge({ score }: { score: number }) {
  const radius = 80;
  const color = score >= 70 ? '#FF4444' : score >= 40 ? '#FFB020' : '#00D68F';

  return (
    <div className="relative w-48 h-28 mx-auto">
      <svg viewBox="0 0 200 110" className="w-full h-full">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Score arc */}
        <motion.path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: score / 100 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
          style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-4xl font-bold"
          style={{ color }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-ghost-text-muted uppercase tracking-wider">Risk Score</span>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: Violation['severity'] }) {
  const config = {
    critical: { label: 'Critical', className: 'badge-critical' },
    high: { label: 'High', className: 'badge-high' },
    medium: { label: 'Medium', className: 'badge-medium' },
    low: { label: 'Low', className: 'badge-low' },
  };
  const { label, className } = config[severity];

  return (
    <span className={`${className} px-3 py-1 rounded-full text-xs font-semibold`}>
      {label}
    </span>
  );
}

function ViolationCard({ violation, index }: { violation: Violation; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      className="glass-card overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 flex items-start gap-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex-shrink-0 mt-1">
          {violation.severity === 'critical' ? (
            <ShieldAlert className="w-5 h-5 text-ghost-danger" />
          ) : violation.severity === 'high' ? (
            <AlertTriangle className="w-5 h-5 text-ghost-warning" />
          ) : (
            <Info className="w-5 h-5 text-ghost-info" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h3 className="font-semibold">{violation.title}</h3>
            <SeverityBadge severity={violation.severity} />
          </div>
          <p className="text-sm text-ghost-text-secondary">{violation.category}</p>
          {violation.estimatedImpact > 0 && (
            <div className="flex items-center gap-1.5 mt-2 text-ghost-orange text-sm font-medium">
              <DollarSign className="w-4 h-4" />
              ${violation.estimatedImpact.toLocaleString()}/year estimated impact
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          {expanded ? <ChevronUp className="w-5 h-5 text-ghost-text-muted" /> : <ChevronDown className="w-5 h-5 text-ghost-text-muted" />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-ghost-border space-y-4">
              <div>
                <p className="text-xs font-medium text-ghost-text-muted uppercase tracking-wider mb-2">
                  Lease Language
                </p>
                <div className="glass rounded-xl p-4 text-sm text-ghost-text-secondary italic">
                  {violation.leaseLanguage}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-ghost-text-muted uppercase tracking-wider mb-2">
                  NYC Code Citation
                </p>
                <div className="glass-orange rounded-xl p-4 text-sm text-ghost-orange">
                  {violation.nycCodeCitation}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-ghost-text-muted uppercase tracking-wider mb-2">
                  Recommended Action
                </p>
                <p className="text-sm text-ghost-text-secondary leading-relaxed">
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
  const criticalCount = report.violations.filter(v => v.severity === 'critical').length;
  const highCount = report.violations.filter(v => v.severity === 'high').length;

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          <div className="absolute right-0 top-0 hidden md:block">
            <button 
              onClick={() => window.print()}
              className="btn-secondary px-4 py-2 flex items-center gap-2 text-sm"
            >
              <Printer className="w-4 h-4" />
              Print Report
            </button>
          </div>
          <div className="inline-flex items-center gap-2 glass-orange rounded-full px-5 py-2 mb-6 text-sm text-ghost-orange font-medium">
            <Ghost className="w-4 h-4" />
            Lease Analysis Complete
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Violation Report</h1>
          <p className="text-ghost-text-secondary">
            {report.propertyAddress} · Unit {report.unitNumber}
          </p>
        </motion.div>

        {/* Risk Score + Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <div className="glass-card p-6 md:col-span-1">
            <RiskGauge score={report.riskScore} />
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-ghost-danger/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-ghost-danger" />
              </div>
              <div>
                <p className="text-2xl font-bold">{report.violations.length}</p>
                <p className="text-sm text-ghost-text-secondary">Violations Found</p>
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-ghost-danger">{criticalCount} critical</span>
              <span className="text-ghost-warning">{highCount} high</span>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-ghost-orange/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-ghost-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text">
                  ${report.totalFinancialImpact.toLocaleString()}
                </p>
                <p className="text-sm text-ghost-text-secondary">Est. Annual Impact</p>
              </div>
            </div>
            <div className="text-sm text-ghost-text-muted">
              Potential recovery amount
            </div>
          </div>
        </motion.div>

        {/* Property Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mb-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
        >
          <div>
            <p className="text-ghost-text-muted mb-1">Landlord</p>
            <p className="font-medium">{report.landlordName}</p>
          </div>
          <div>
            <p className="text-ghost-text-muted mb-1">Monthly Rent</p>
            <p className="font-medium">${report.monthlyRent.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-ghost-text-muted mb-1">Lease Period</p>
            <p className="font-medium">{report.leaseStartDate} — {report.leaseEndDate}</p>
          </div>
          <div>
            <p className="text-ghost-text-muted mb-1">Analysis Date</p>
            <p className="font-medium">{report.analysisDate}</p>
          </div>
        </motion.div>

        {/* Violations List */}
        <h2 className="text-xl font-semibold mb-6">Potential Violations</h2>
        <div className="space-y-4 mb-10">
          {report.violations.map((v, i) => (
            <ViolationCard key={v.id} violation={v} index={i} />
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <button onClick={onViewLandlord} className="glass-card p-5 flex items-center gap-4 group text-left">
            <div className="w-10 h-10 rounded-xl bg-ghost-info/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-ghost-info" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Landlord Intel</p>
              <p className="text-xs text-ghost-text-secondary">HPD violations & history</p>
            </div>
            <ArrowRight className="w-4 h-4 text-ghost-text-muted group-hover:text-ghost-text transition-colors" />
          </button>

          <button onClick={onGenerateLetter} className="glass-card p-5 flex items-center gap-4 group text-left">
            <div className="w-10 h-10 rounded-xl bg-ghost-warning/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-ghost-warning" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Demand Letter</p>
              <p className="text-xs text-ghost-text-secondary">Generate legal notice</p>
            </div>
            <ArrowRight className="w-4 h-4 text-ghost-text-muted group-hover:text-ghost-text transition-colors" />
          </button>

          <button onClick={onViewImpact} className="btn-primary flex items-center gap-4 text-left p-5 rounded-[20px]">
            <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium">View Impact</p>
              <p className="text-xs opacity-80">Financial summary</p>
            </div>
            <ArrowRight className="w-4 h-4 opacity-70" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
