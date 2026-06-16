import { motion } from 'framer-motion';
import { Ghost, Shield, ArrowRight, CheckCircle2, Building2, Scale, FileSearch } from 'lucide-react';
import GhostScene from './GhostScene';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const stats = [
    { value: '2.4M+', label: 'NYC rent-stabilized apartments' },
    { value: '67%', label: 'Leases with violations' },
    { value: '$3,200', label: 'Average overpayment/year' },
  ];

  const features = [
    { icon: FileSearch, title: 'AI Lease Analysis', desc: 'Our agents parse every clause and cross-reference NYC housing law in seconds.' },
    { icon: Shield, title: 'Legal Compliance Check', desc: 'Checks rent stabilization, disclosure requirements, and 200+ housing regulations.' },
    { icon: Scale, title: 'Instant Legal Action', desc: 'Generate court-ready demand letters citing specific code violations.' },
    { icon: Building2, title: 'Landlord Intelligence', desc: 'Access HPD violations, complaints, and building risk scores.' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      <GhostScene className="opacity-40" />

      {/* Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-ghost-orange to-ghost-amber flex items-center justify-center">
            <Ghost className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight">RentGhost</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-ghost-text-secondary">
          <a href="#features" className="hover:text-ghost-text transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-ghost-text transition-colors">How it works</a>
          <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
            onClick={onGetStarted} 
            className="btn-primary text-sm py-2.5 px-6"
          >
            Upload Lease
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 md:pt-32 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 glass-orange rounded-full px-5 py-2 mb-8 text-sm text-ghost-orange font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-ghost-orange animate-pulse" />
            NYC Renter Protection Tool
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6">
            Your lease might be{' '}
            <span className="gradient-text">illegal.</span>
            <br />
            <span className="text-ghost-text-secondary text-4xl md:text-5xl lg:text-6xl font-semibold">
              Find out in 60 seconds.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-ghost-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your lease. Our AI agents scan every clause against NYC housing law,
            reveal hidden violations, and generate legal action documents — instantly.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGetStarted}
              className="btn-primary text-lg py-4 px-10 flex items-center gap-3 glow-orange-strong"
            >
              Upload Your Lease
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary py-4 px-8 text-lg"
            >
              View Sample Report
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.15 }}
              className="glass-card p-8 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-ghost-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <div id="features" className="mt-32">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            Everything you need to{' '}
            <span className="gradient-text">fight back</span>
          </motion.h2>
          <p className="text-ghost-text-secondary text-center mb-16 text-lg">
            Powered by AI agents trained on NYC housing law
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="glass-card p-10 md:p-12 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ghost-orange/20 to-transparent flex items-center justify-center mb-5 group-hover:from-ghost-orange/30 transition-all">
                  <feature.icon className="w-6 h-6 text-ghost-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-ghost-text-secondary leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div id="how-it-works" className="mt-32">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Three steps. <span className="gradient-text">Zero hassle.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Upload', desc: 'Drop your lease PDF. We handle the rest.' },
              { step: '02', title: 'Analyze', desc: 'AI agents scan every clause against NYC law.' },
              { step: '03', title: 'Act', desc: 'Get your violation report and legal documents.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-6xl font-black gradient-text mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-ghost-text-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 glass-card p-10 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-ghost-success" />
            <span className="text-sm font-medium text-ghost-success">Trusted by NYC Tenants</span>
          </div>
          <p className="text-2xl md:text-3xl font-semibold mb-2">
            "RentGhost found $4,280 in illegal overcharges in my lease."
          </p>
          <p className="text-ghost-text-secondary">
            — Sarah M., Washington Heights
          </p>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to protect your rights?
          </h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGetStarted}
            className="btn-primary text-lg py-4 px-10 glow-orange-strong"
          >
            Upload Your Lease Now
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-ghost-border px-6 py-8 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ghost-text-muted">
          <div className="flex items-center gap-2">
            <Ghost className="w-4 h-4 text-ghost-orange" />
            <span>RentGhost © 2024. Built for NYC renters.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ghost-text transition-colors">Privacy</a>
            <a href="#" className="hover:text-ghost-text transition-colors">Terms</a>
            <a href="#" className="hover:text-ghost-text transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
