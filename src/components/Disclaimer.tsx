import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

export default function Disclaimer() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        className="fixed top-0 left-0 w-full z-50 bg-rg-surface border-b border-rg-border px-4 py-2.5"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-rg-warning flex-shrink-0" />
          <p className="text-xs text-rg-text-secondary flex-1">
            <span className="font-medium text-rg-text">Disclaimer:</span> RentGhost provides automated analysis, not legal advice. Consult a qualified attorney for legal assistance.
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/5 transition-colors flex-shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5 text-rg-text-muted" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
