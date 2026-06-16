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
    // In a real app, this would use a library like jspdf to generate a PDF
    // For this demo, we'll create a blob and trigger a download
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
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-ghost-text-secondary hover:text-ghost-text transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Report
            </button>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ghost-warning/20 to-ghost-warning/5 flex items-center justify-center">
                <FileText className="w-7 h-7 text-ghost-warning" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Demand Letter</h1>
                <p className="text-ghost-text-secondary">Ready to send to your landlord</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="btn-secondary py-2.5 px-4 flex items-center gap-2"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-ghost-success" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
            <button
              onClick={handleDownload}
              className="btn-primary py-2.5 px-4 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="w-11 h-11 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors tooltip-trigger" title="Email to Landlord">
              <Mail className="w-5 h-5 text-ghost-orange" />
            </button>
          </div>
        </motion.div>

        {/* Letter Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 md:p-12 relative overflow-hidden group"
        >
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-overlay" />

          {/* Letter Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6 text-ghost-text/90 font-serif leading-relaxed text-lg">
            <div className="mb-12">
              <p>{letter.tenantName}</p>
              <p>{letter.tenantAddress}</p>
              <p className="mt-4">{letter.date}</p>
            </div>

            <div className="mb-8">
              <p>{letter.landlordName}</p>
              <p>{letter.landlordAddress}</p>
            </div>

            <div className="font-bold mb-8">
              RE: {letter.subject}
            </div>

            <div className="whitespace-pre-wrap">{letter.body}</div>

            <div className="my-8 pl-6 border-l-4 border-ghost-orange/30 space-y-6">
              {letter.violations.map((v, i) => (
                <div key={i}>
                  <p className="font-bold text-ghost-text">{v.title}</p>
                  <p className="text-sm text-ghost-text-secondary mb-1">Violation of: {v.code}</p>
                  <p className="text-sm italic">{v.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <p>Sincerely,</p>
              <div className="mt-8 pt-4 border-t border-ghost-border inline-block w-48">
                <p>{letter.tenantName}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
