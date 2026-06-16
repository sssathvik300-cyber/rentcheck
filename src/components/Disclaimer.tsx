import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

export default function Disclaimer() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-0 left-0 w-full z-50 bg-ghost-surface-2 border-b border-ghost-border p-3"
      >
        <div className="max-w-6xl mx-auto flex items-center gap-3 px-4">
          <AlertCircle className="w-5 h-5 text-ghost-warning flex-shrink-0" />
          <p className="text-sm text-ghost-text-secondary flex-1">
            <span className="font-semibold text-ghost-text">Legal Disclaimer:</span> RentGhost provides automated document analysis and legal information, not legal advice. If you need legal assistance, please consult a qualified attorney or contact NYC tenant services.
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
            aria-label="Dismiss disclaimer"
          >
            <X className="w-4 h-4 text-ghost-text-muted" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
