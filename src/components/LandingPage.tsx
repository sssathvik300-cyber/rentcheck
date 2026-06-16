import { motion } from 'framer-motion';
import {
  Ghost, Upload, ArrowRight, FileSearch, ShieldCheck,
  AlertTriangle, FileText,
  Download, Copy, Mail, CheckCircle2, BarChart3, Scale,
  Cpu, Eye, Pen, BookOpen
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* ─── NAV ─── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-rg-border"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rg-accent flex items-center justify-center">
            <Ghost className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight">RentGhost</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-rg-text-secondary">
          <a href="#how-it-works" className="hover:text-rg-text transition-colors">How it works</a>
          <a href="#agents" className="hover:text-rg-text transition-colors">AI Pipeline</a>
          <a href="#findings" className="hover:text-rg-text transition-colors">Findings</a>
          <button onClick={onGetStarted} className="btn-primary text-sm py-2.5 px-5">
            Upload Lease
          </button>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section className="px-6 md:px-16 pt-24 md:pt-32 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <motion.div {...fadeIn} transition={{ duration: 0.5 }}>
            <div className="badge badge-accent mb-6">
              <div className="pulse-dot" />
              NYC Tenant Protection Platform
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6">
              Your landlord has
              <br />a lawyer.
              <br />
              <span className="accent-text">Now you do too.</span>
            </h1>

            <p className="text-lg text-rg-text-secondary leading-relaxed mb-10 max-w-lg">
              Upload your lease and discover hidden violations, illegal rent
              increases, and tenant rights issues in under 60 seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={onGetStarted}
                className="btn-primary text-base py-3.5 px-7"
              >
                Upload Lease
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <button className="btn-secondary text-base py-3.5 px-7">
                View Sample Report
              </button>
            </div>

            <p className="text-sm text-rg-text-muted leading-relaxed">
              Powered by NYC housing regulations, violation databases, and AI analysis.
            </p>
          </motion.div>

          {/* Right — Interactive Report Preview */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="report-preview">
              {/* Report header */}
              <div className="report-header">
                <div className="flex items-center gap-2">
                  <Ghost className="w-4 h-4 text-rg-accent" />
                  <span className="text-sm font-medium">Lease Analysis Report</span>
                </div>
                <span className="badge badge-danger text-xs py-1 px-2.5">3 violations</span>
              </div>

              {/* Risk Score Row */}
              <div className="report-row">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rg-accent-muted flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-rg-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Risk Score</p>
                    <p className="text-xs text-rg-text-muted">Overall assessment</p>
                  </div>
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-bold text-rg-danger"
                >
                  87
                </motion.span>
              </div>

              {/* Violations */}
              <div className="report-row">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-rg-danger" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Illegal Rent Increase</p>
                    <p className="text-xs text-rg-text-muted">Rent Stabilization Code §26-511</p>
                  </div>
                </div>
                <span className="badge badge-danger text-xs py-1 px-2.5">High</span>
              </div>

              <div className="report-row">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-rg-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Missing Lead Paint Disclosure</p>
                    <p className="text-xs text-rg-text-muted">NYC Admin Code §27-2056.4</p>
                  </div>
                </div>
                <span className="badge badge-warning text-xs py-1 px-2.5">Medium</span>
              </div>

              <div className="report-row">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <Scale className="w-4 h-4 text-rg-danger" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Excessive Late Fee Clause</p>
                    <p className="text-xs text-rg-text-muted">Real Property Law §238-a</p>
                  </div>
                </div>
                <span className="badge badge-danger text-xs py-1 px-2.5">High</span>
              </div>

              {/* Savings */}
              <div className="px-5 py-4 bg-rg-accent-muted">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-rg-accent">Potential Savings</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-xl font-bold text-rg-accent"
                  >
                    $4,280/year
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="section section-divider px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} transition={{ duration: 0.4 }} className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How it works
            </h2>
            <p className="text-rg-text-secondary text-lg">Four steps. Under 60 seconds.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 items-start">
            {[
              { icon: Upload, title: 'Upload Lease', desc: 'Drop your PDF' },
              { icon: Cpu, title: 'AI Analysis', desc: 'Clause-by-clause scan' },
              { icon: Eye, title: 'Violation Detection', desc: 'NYC law cross-reference' },
              { icon: FileText, title: 'Demand Letter', desc: 'Court-ready document' },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                {...stagger}
                transition={{ delay: i * 0.1, duration: 0.35 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-14 h-14 rounded-2xl bg-rg-surface border border-rg-border flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6 text-rg-accent" />
                </div>
                <h3 className="text-base font-semibold mb-1.5">{step.title}</h3>
                <p className="text-sm text-rg-text-secondary">{step.desc}</p>

                {/* Connector arrow (desktop only, not on last) */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+40px)] w-[calc(100%-80px)]">
                    <div className="step-connector" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI AGENT PIPELINE ─── */}
      <section id="agents" className="section section-divider px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeIn} transition={{ duration: 0.4 }} className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              AI Agent Pipeline
            </h2>
            <p className="text-rg-text-secondary text-lg">
              Five specialized agents work sequentially to analyze your lease.
            </p>
          </motion.div>

          <div className="flex flex-col items-center">
            {[
              { icon: FileSearch, name: 'Lease Extraction Agent', desc: 'Parses and structures your PDF' },
              { icon: BookOpen, name: 'Clause Classification Agent', desc: 'Categorizes each clause by type' },
              { icon: ShieldCheck, name: 'NYC Compliance Agent', desc: 'Cross-references housing regulations' },
              { icon: AlertTriangle, name: 'Violation Detection Agent', desc: 'Identifies illegal provisions' },
              { icon: Pen, name: 'Demand Letter Agent', desc: 'Generates court-ready documents' },
            ].map((agent, i) => (
              <motion.div
                key={agent.name}
                {...stagger}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="w-full max-w-md"
              >
                <div className="agent-card flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-rg-accent-muted flex items-center justify-center flex-shrink-0">
                    <agent.icon className="w-5 h-5 text-rg-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{agent.name}</p>
                    <p className="text-xs text-rg-text-secondary">{agent.desc}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-rg-success ml-auto flex-shrink-0" />
                </div>
                {i < 4 && <div className="pipeline-line" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SAMPLE FINDINGS ─── */}
      <section id="findings" className="section section-divider px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} transition={{ duration: 0.4 }} className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Sample Findings
            </h2>
            <p className="text-rg-text-secondary text-lg">
              Real violations our AI agents detect.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'Illegal Rent Increase',
                severity: 'High',
                severityClass: 'badge-danger',
                evidence: '"Rent shall increase 8% annually at landlord\'s discretion."',
                code: 'NYC Rent Stabilization Code §26-511',
                action: 'File complaint with DHCR for rent overcharge determination.',
              },
              {
                title: 'Missing Lead Paint Disclosure',
                severity: 'Medium',
                severityClass: 'badge-warning',
                evidence: 'No EPA Form or lead paint disclosure found in lease document.',
                code: 'NYC Admin Code §27-2056.4',
                action: 'Request immediate disclosure and lead inspection from landlord.',
              },
              {
                title: 'Excessive Late Fee Clause',
                severity: 'High',
                severityClass: 'badge-danger',
                evidence: '"A late fee of $150 will be charged for any payment received after the 1st."',
                code: 'Real Property Law §238-a',
                action: 'Late fees exceeding $50 or 5% of rent are unenforceable.',
              },
            ].map((finding, i) => (
              <motion.div
                key={finding.title}
                {...stagger}
                transition={{ delay: i * 0.1, duration: 0.35 }}
                className="card p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">{finding.title}</h3>
                  <span className={`${finding.severityClass} px-2.5 py-1 rounded-full text-xs font-medium`}>
                    {finding.severity}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-rg-text-muted uppercase tracking-wider mb-1.5 font-medium">Evidence</p>
                  <p className="text-sm text-rg-text-secondary italic">"{finding.evidence}"</p>
                </div>

                <div>
                  <p className="text-xs text-rg-text-muted uppercase tracking-wider mb-1.5 font-medium">NYC Code</p>
                  <p className="text-sm text-rg-accent">{finding.code}</p>
                </div>

                <div>
                  <p className="text-xs text-rg-text-muted uppercase tracking-wider mb-1.5 font-medium">Action</p>
                  <p className="text-sm text-rg-text-secondary">{finding.action}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DEMAND LETTER ─── */}
      <section className="section section-divider px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} transition={{ duration: 0.4 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Demand Letter Generator
            </h2>
            <p className="text-rg-text-secondary text-lg">
              Court-ready legal documents, generated automatically from your analysis.
            </p>
          </motion.div>

          <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.1 }}>
            <div className="letter-preview mb-6">
              <p className="mb-6">
                <strong className="text-rg-text">RE: Notice of Lease Violations and Demand for Remediation</strong>
              </p>
              <p className="mb-4">Dear Metropolitan Properties LLC,</p>
              <p className="mb-4">
                I am writing to formally notify you of multiple violations identified in my lease agreement
                for the premises located at 142 East 4th Street, Unit 3B, New York, NY 10009.
              </p>
              <p className="mb-4">
                Pursuant to my rights under the New York City Rent Stabilization Code, the NYC Administrative Code,
                and the Real Property Law of the State of New York, I have identified the following violations:
              </p>
              <p className="mb-2"><strong className="text-rg-text">1. Illegal Rent Increase</strong></p>
              <p className="mb-4 pl-4">
                The lease stipulates an 8% annual increase at landlord's discretion, which violates
                Rent Stabilization Code §26-511. The legal maximum increase for one-year leases is
                determined by the RGB and currently set at 3.25%.
              </p>
              <p className="mb-2"><strong className="text-rg-text">2. Missing Lead Paint Disclosure</strong></p>
              <p className="pl-4">
                No EPA disclosure form regarding lead-based paint hazards was provided as required
                by NYC Administrative Code §27-2056.4 for buildings constructed prior to 1978...
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary py-2.5 px-5 text-sm">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button className="btn-secondary py-2.5 px-5 text-sm flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy Text
              </button>
              <button className="btn-secondary py-2.5 px-5 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email to Landlord
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="section px-6 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeIn} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              Stop guessing.
              <br />
              <span className="accent-text">Know your rights.</span>
            </h2>
            <p className="text-lg text-rg-text-secondary mb-10">
              Upload your lease now.
            </p>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGetStarted}
              className="btn-primary text-base py-4 px-10"
            >
              Upload Your Lease
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-rg-border px-6 md:px-16 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-rg-text-muted">
          <div className="flex items-center gap-2">
            <Ghost className="w-4 h-4 text-rg-accent" />
            <span>RentGhost © 2024. Built for NYC renters.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-rg-text transition-colors">Privacy</a>
            <a href="#" className="hover:text-rg-text transition-colors">Terms</a>
            <a href="#" className="hover:text-rg-text transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
