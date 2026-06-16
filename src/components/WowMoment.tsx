import { motion } from 'framer-motion';
import { DollarSign, ArrowRight, Home } from 'lucide-react';
import type { LeaseReport } from '../types';

interface WowMomentProps {
  report: LeaseReport;
  onContinue: () => void;
  onHome: () => void;
}

export default function WowMoment({ report, onContinue, onHome }: WowMomentProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 280, damping: 22 }}
          className="w-16 h-16 rounded-2xl bg-rg-accent flex items-center justify-center mx-auto mb-8"
        >
          <DollarSign className="w-8 h-8 text-white" />
        </motion.div>

        {/* Headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-sm font-medium text-rg-text-secondary mb-3 uppercase tracking-wider"
        >
          Analysis complete
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-3"
        >
          You may be owed
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
          className="text-5xl md:text-7xl font-bold text-rg-accent mb-4"
        >
          ${report.totalFinancialImpact.toLocaleString()}
          <span className="text-2xl md:text-3xl text-rg-text-secondary font-medium">/year</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="text-lg text-rg-text-secondary mb-12 max-w-lg mx-auto"
        >
          We found <strong className="text-rg-text">{report.violations.length} violations</strong> in your
          lease. See the full breakdown and generate your legal demand letter.
        </motion.p>

        {/* Summary row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="card p-5 flex items-center justify-around mb-10 text-center"
        >
          <div>
            <p className="text-2xl font-bold text-rg-danger">
              {report.violations.filter(v => v.severity === 'critical').length}
            </p>
            <p className="text-xs text-rg-text-secondary mt-1">Critical</p>
          </div>
          <div className="w-px h-8 bg-rg-border" />
          <div>
            <p className="text-2xl font-bold text-rg-warning">
              {report.violations.filter(v => v.severity === 'high').length}
            </p>
            <p className="text-xs text-rg-text-secondary mt-1">High Risk</p>
          </div>
          <div className="w-px h-8 bg-rg-border" />
          <div>
            <p className="text-2xl font-bold">
              {report.violations.length}
            </p>
            <p className="text-xs text-rg-text-secondary mt-1">Total Violations</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinue}
            className="btn-primary text-base py-3.5 px-8 w-full sm:w-auto justify-center"
          >
            View Full Report
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <button
            onClick={onHome}
            className="btn-secondary text-base py-3.5 px-8 w-full sm:w-auto flex items-center gap-2 justify-center"
          >
            <Home className="w-4 h-4" />
            Back Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
