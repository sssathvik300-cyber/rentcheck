import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Copy, Download, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { DemandLetter } from '../types';

interface DemandLetterGeneratorProps {
  letter: DemandLetter;
  onBack: () => void;
}

export default function DemandLetterGenerator({ letter, onBack }: DemandLetterGeneratorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([letter.body], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Demand_Letter_${letter.landlordName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen px-6 py-16 md:py-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-rg-text-secondary hover:text-rg-text transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Report
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rg-warning/10 border border-rg-warning/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-rg-warning" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Demand Letter</h1>
                <p className="text-sm text-rg-text-secondary">Ready to send to your landlord</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="btn-secondary py-2 px-4 text-sm flex items-center gap-1.5"
              >
                {copied
                  ? <><CheckCircle2 className="w-4 h-4 text-rg-success" /> Copied</>
                  : <><Copy className="w-4 h-4" /> Copy</>
                }
              </button>
              <button
                onClick={handleDownload}
                className="btn-primary py-2 px-4 text-sm"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                title="Email to Landlord"
                className="w-9 h-9 rounded-xl border border-rg-border flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <Mail className="w-4 h-4 text-rg-text-secondary" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Letter Preview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card overflow-hidden"
        >
          {/* Document toolbar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-rg-border bg-rg-surface-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-rg-text-muted" />
              <span className="text-xs text-rg-text-secondary font-medium">
                Demand_Letter_{letter.landlordName.replace(/\s+/g, '_')}.pdf
              </span>
            </div>
            <span className="badge text-xs py-0.5 px-2">Ready</span>
          </div>

          {/* Letter body */}
          <div className="px-8 py-8 md:px-12 md:py-10 space-y-5 font-serif leading-relaxed text-rg-text-secondary text-sm max-h-[600px] overflow-y-auto">
            <div className="space-y-1 mb-8">
              <p className="text-rg-text font-sans font-medium text-xs uppercase tracking-wider mb-3">From</p>
              <p>{letter.tenantName}</p>
              <p>{letter.tenantAddress}</p>
              <p className="pt-2 text-rg-text-muted text-xs">{letter.date}</p>
            </div>

            <div className="space-y-1 mb-8">
              <p className="text-rg-text font-sans font-medium text-xs uppercase tracking-wider mb-3">To</p>
              <p>{letter.landlordName}</p>
              <p>{letter.landlordAddress}</p>
            </div>

            <div className="border-l-2 border-rg-accent pl-5 mb-8">
              <p className="font-sans font-semibold text-rg-text text-sm">RE: {letter.subject}</p>
            </div>

            <div className="whitespace-pre-line">{letter.body}</div>

            <div className="space-y-5 my-8">
              {letter.violations.map((v, i) => (
                <div key={i} className="card p-4">
                  <p className="font-sans font-semibold text-rg-text text-sm mb-1">{v.title}</p>
                  <p className="text-xs text-rg-accent mb-1.5">Violation of: {v.code}</p>
                  <p className="text-xs italic">{v.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <p>Sincerely,</p>
              <div className="mt-8 pt-4 border-t border-rg-border inline-block">
                <p className="text-rg-text font-medium">{letter.tenantName}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Export note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-5 text-xs text-rg-text-muted text-center"
        >
          This letter is generated automatically from your lease analysis. Consult a licensed attorney before sending.
        </motion.p>
      </div>
    </div>
  );
}
