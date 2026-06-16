import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Circle, Ghost, Sparkles } from 'lucide-react';
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
        // Set current step active
        setSteps(prev => prev.map((s, idx) => ({
          ...s,
          status: idx === i ? 'active' : idx < i ? 'complete' : 'pending',
        })));

        // Wait for simulated processing
        const delay = 800 + Math.random() * 1200;
        await new Promise(resolve => setTimeout(resolve, delay));

        // Mark complete
        setSteps(prev => prev.map((s, idx) => ({
          ...s,
          status: idx <= i ? 'complete' : idx === i + 1 ? 'active' : 'pending',
        })));
      }

      // All done
      setTimeout(() => onComplete(), 1000);
    };

    const timer = setTimeout(runAnalysis, 500);
    return () => clearTimeout(timer);
  }, []);

  const overallProgress = ((steps.filter(s => s.status === 'complete').length) / steps.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-3xl bg-gradient-to-br from-ghost-orange to-ghost-amber flex items-center justify-center mx-auto mb-6"
          >
            <Ghost className="w-8 h-8 text-black" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Analyzing Your Lease</h1>
          <p className="text-ghost-text-secondary">
            Our AI agents are reviewing every clause
          </p>
        </div>

        {/* Overall Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-ghost-text-secondary">Overall progress</span>
            <span className="text-ghost-orange font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <div className="h-1.5 bg-ghost-surface-4 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-ghost-orange to-ghost-amber rounded-full"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-card p-6 md:p-8">
          <div className="space-y-1">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="flex items-start gap-4 py-3 relative">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-[15px] top-[40px] w-0.5 h-[calc(100%-16px)]">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: step.status === 'complete' ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-ghost-orange/30 rounded-full"
                      />
                    </div>
                  )}

                  {/* Status icon */}
                  <div className="flex-shrink-0 relative z-10 mt-0.5">
                    <AnimatePresence mode="wait">
                      {step.status === 'complete' ? (
                        <motion.div
                          key="complete"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <CheckCircle2 className="w-8 h-8 text-ghost-orange" />
                        </motion.div>
                      ) : step.status === 'active' ? (
                        <motion.div
                          key="active"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <div className="relative">
                            <Loader2 className="w-8 h-8 text-ghost-orange animate-spin" />
                            <div className="absolute inset-0 rounded-full pulse-orange" />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div key="pending">
                          <Circle className="w-8 h-8 text-ghost-text-muted" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium transition-colors duration-300 ${
                      step.status === 'active' ? 'text-ghost-orange' :
                      step.status === 'complete' ? 'text-ghost-text' :
                      'text-ghost-text-muted'
                    }`}>
                      {step.label}
                    </p>

                    <AnimatePresence>
                      {(step.status === 'active' || step.status === 'complete') && step.detail && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm text-ghost-text-secondary mt-1"
                        >
                          {step.detail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Completion message */}
        <AnimatePresence>
          {overallProgress >= 100 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <div className="glass-orange rounded-2xl p-6 inline-flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-ghost-orange" />
                <span className="font-medium text-ghost-orange">Analysis complete! Loading your report...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
