import { motion } from 'framer-motion';
import {
  Building2, AlertTriangle, Calendar, Shield, ArrowLeft, ExternalLink, TrendingUp
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { LandlordIntelligence } from '../types';

interface LandlordPanelProps {
  intel: LandlordIntelligence;
  onBack: () => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="card px-3 py-2 text-sm">
        <p className="font-medium text-rg-text">{label}</p>
        <p className="text-rg-accent">{payload[0].value} violations</p>
      </div>
    );
  }
  return null;
};

export default function LandlordPanel({ intel, onBack }: LandlordPanelProps) {
  return (
    <div className="min-h-screen px-6 py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-rg-text-secondary hover:text-rg-text transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Report
          </button>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rg-info/10 border border-rg-info/20 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-rg-info" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{intel.landlordName}</h1>
              <p className="text-sm text-rg-text-secondary">Landlord Intelligence Report</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Building2, label: 'Properties', value: intel.totalProperties, color: 'text-rg-text' },
            { icon: Shield, label: 'Total Units', value: intel.totalUnits, color: 'text-rg-text' },
            { icon: AlertTriangle, label: 'Open Complaints', value: intel.openComplaints, color: 'text-rg-warning' },
            { icon: TrendingUp, label: 'Risk Score', value: `${intel.propertyRiskScore}/100`, color: 'text-rg-danger' },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08 + i * 0.04 }}
              className="card p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-xs text-rg-text-muted">{label}</span>
              </div>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="card p-6 mb-6"
        >
          <h2 className="text-sm font-semibold mb-6 text-rg-text">Violation History (12 months)</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intel.violationHistory} barCategoryGap="20%">
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {intel.violationHistory.map((entry, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={entry.count > 8 ? '#EF4444' : entry.count > 5 ? '#F97316' : 'rgba(249,115,22,0.35)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Complaint Categories */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6 mb-6"
        >
          <h2 className="text-sm font-semibold mb-5 text-rg-text">Complaint Categories</h2>
          <div className="space-y-4">
            {intel.complaintCategories.map((cat, i) => {
              const max = Math.max(...intel.complaintCategories.map(c => c.count));
              const pct = (cat.count / max) * 100;
              return (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.04 }}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-rg-text-secondary">{cat.category}</span>
                    <span className="font-medium text-rg-text">{cat.count}</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7, delay: 0.3 + i * 0.04 }}
                      className="progress-fill"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* HPD Violations Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="card overflow-hidden mb-6"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-rg-border">
            <h2 className="text-sm font-semibold">HPD Violations</h2>
            <a href="#" className="flex items-center gap-1 text-xs text-rg-accent hover:text-rg-accent-hover transition-colors">
              View on HPD Online <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-rg-border">
                  {['Date', 'Type', 'Description', 'Status'].map(h => (
                    <th key={h} className="text-left py-2.5 px-5 text-xs text-rg-text-muted font-medium uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {intel.hpdViolations.map((v, i) => (
                  <motion.tr
                    key={v.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.32 + i * 0.04 }}
                    className="border-b border-rg-border last:border-0 hover:bg-white/[0.015] transition-colors"
                  >
                    <td className="py-3 px-5 text-xs text-rg-text-secondary whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-rg-text-muted" />
                        {v.date}
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        v.severity === 'critical' ? 'badge-critical' :
                        v.severity === 'high' ? 'badge-high' : 'badge-medium'
                      }`}>
                        {v.type}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-xs text-rg-text-secondary max-w-xs">{v.description}</td>
                    <td className="py-3 px-5">
                      <span className={`flex items-center gap-1.5 text-xs font-medium ${
                        v.status === 'open' ? 'text-rg-danger' :
                        v.status === 'pending' ? 'text-rg-warning' : 'text-rg-success'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          v.status === 'open' ? 'bg-rg-danger' :
                          v.status === 'pending' ? 'bg-rg-warning' : 'bg-rg-success'
                        }`} />
                        {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Building Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32 }}
          className="card px-5 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
        >
          {[
            ['Building Age', `${intel.buildingAge} years`],
            ['Last HPD Inspection', intel.lastInspection],
            ['Rent Stabilized', intel.rentStabilized ? 'Yes' : 'No'],
            ['Avg. Risk Score', `${intel.averageRiskScore}/100`],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs text-rg-text-muted mb-1">{label}</p>
              <p className="font-semibold text-rg-text">{value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
