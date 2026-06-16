import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Ghost } from 'lucide-react';
import type { AnalysisStep } from '../types';
import { ANALYSIS_STEPS } from '../mockData';

interface AnalysisTimelineProps {
  onComplete: () => void;
}

export default function AnalysisTimeline({ onComplete }: AnalysisTimelineProps) {
  const [steps, setSteps] = useState<AnalysisStep[]>(ANALYSIS_STEPS.map(s => ({ ...s, status: 'pending' })));

  useEffect(() => {
    const runAnalysis = async () => {
      for (let i = 0; i < steps.length; i++) {
        setSteps(prev => prev.map((s, idx) => ({
          ...s,
          status: idx === i ? 'active' : idx < i ? 'complete' : 'pending',
        })));
        const delay = 800 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        setSteps(prev => prev.map((s, idx) => ({
          ...s,
          status: idx <= i ? 'complete' : idx === i + 1 ? 'active' : 'pending',
        })));
      }
      setTimeout(() => onComplete(), 800);
    };
    const timer = setTimeout(runAnalysis, 400);
    return () => clearTimeout(timer);
  }, []);

  const completedCount = steps.filter(s => s.status === 'complete').length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-rg-accent flex items-center justify-center mx-auto mb-5">
            <Ghost className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Analyzing Your Lease</h1>
          <p className="text-sm text-rg-text-secondary">AI agents are reviewing every clause</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-rg-text-secondary">Progress</span>
            <span className="text-rg-accent font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              className="progress-fill"
            />
          </div>
        </div>

        {/* Steps */}
        <div className="card divide-y divide-rg-border">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 px-5 py-3.5"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {step.status === 'complete' ? (
                    <motion.div
                      key="complete"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-rg-success" />
                    </motion.div>
                  ) : step.status === 'active' ? (
                    <motion.div key="active" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Loader2 className="w-5 h-5 text-rg-accent animate-spin" />
                    </motion.div>
                  ) : (
                    <div key="pending" className="w-5 h-5 rounded-full border border-rg-border" />
                  )}
                </AnimatePresence>
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium transition-colors duration-200 ${
                  step.status === 'active' ? 'text-rg-accent' :
                  step.status === 'complete' ? 'text-rg-text' :
                  'text-rg-text-muted'
                }`}>
                  {step.label}
                </p>
                <AnimatePresence>
                  {(step.status === 'active' || step.status === 'complete') && step.detail && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-rg-text-secondary mt-0.5"
                    >
                      {step.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Time indicator */}
              {step.status === 'complete' && (
                <span className="text-xs text-rg-text-muted flex-shrink-0">Done</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Completion */}
        <AnimatePresence>
          {progress >= 100 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <span className="badge badge-accent">
                Analysis complete — loading report...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
