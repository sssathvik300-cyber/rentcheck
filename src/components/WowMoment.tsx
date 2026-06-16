import { motion } from 'framer-motion';
import { DollarSign, ShieldAlert, ArrowRight, Home } from 'lucide-react';
import type { LeaseReport } from '../types';

interface WowMomentProps {
  report: LeaseReport;
  onContinue: () => void;
  onHome: () => void;
}

export default function WowMoment({ report, onContinue, onHome }: WowMomentProps) {
  const isImpactful = report.totalFinancialImpact > 0;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ghost-orange/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-2xl relative z-10 text-center"
      >
        {isImpactful ? (
          <>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-ghost-orange to-ghost-amber flex items-center justify-center mx-auto mb-8 glow-orange-strong"
            >
              <DollarSign className="w-12 h-12 text-black" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              You may be overpaying by
              <br />
              <span className="gradient-text text-6xl md:text-7xl lg:text-8xl mt-4 inline-block">
                ${report.totalFinancialImpact.toLocaleString()}
                <span className="text-3xl md:text-4xl text-ghost-text-secondary">/year</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-ghost-text-secondary mb-12"
            >
              Our AI found {report.violations.length} violations in your lease, including potential rent overcharges.
            </motion.p>
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-ghost-warning to-ghost-amber flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,176,32,0.3)]"
            >
              <ShieldAlert className="w-12 h-12 text-black" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              We identified
              <br />
              <span className="text-ghost-warning text-6xl md:text-7xl lg:text-8xl mt-4 inline-block">
                {report.violations.length} actionable
              </span>
              <br />
              violations
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-ghost-text-secondary mb-12 max-w-lg mx-auto"
            >
              Your landlord is violating NYC housing law. See exactly which clauses are illegal.
            </motion.p>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onContinue}
            className="btn-primary py-4 px-8 text-lg flex items-center gap-3 w-full sm:w-auto justify-center glow-orange"
          >
            Generate Enforcement Package
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onHome}
            className="btn-secondary py-4 px-8 text-lg flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            <Home className="w-5 h-5" />
            Back Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
