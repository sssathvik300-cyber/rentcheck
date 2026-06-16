import { motion } from 'framer-motion';
import {
  Building2, AlertTriangle, Calendar, Shield, ArrowLeft,
  ExternalLink, TrendingUp
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { LandlordIntelligence } from '../types';

interface LandlordPanelProps {
  intel: LandlordIntelligence;
  onBack: () => void;
}

function StatCard({ icon: Icon, label, value, color = 'text-ghost-text' }: {
  icon: any; label: string; value: string | number; color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-sm text-ghost-text-muted">{label}</span>
      </div>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl px-4 py-3 text-sm">
        <p className="font-medium">{label}</p>
        <p className="text-ghost-orange">{payload[0].value} violations</p>
      </div>
    );
  }
  return null;
};

export default function LandlordPanel({ intel, onBack }: LandlordPanelProps) {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-ghost-text-secondary hover:text-ghost-text transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Report
          </button>

          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ghost-info/20 to-ghost-info/5 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-ghost-info" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{intel.landlordName}</h1>
              <p className="text-ghost-text-secondary">Landlord Intelligence Report</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Building2} label="Properties" value={intel.totalProperties} />
          <StatCard icon={Shield} label="Total Units" value={intel.totalUnits} />
          <StatCard icon={AlertTriangle} label="Open Complaints" value={intel.openComplaints} color="text-ghost-warning" />
          <StatCard icon={TrendingUp} label="Property Risk" value={`${intel.propertyRiskScore}/100`} color="text-ghost-danger" />
        </div>

        {/* Violation History Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-8"
        >
          <h2 className="text-lg font-semibold mb-6">Violation History (12 months)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intel.violationHistory} barCategoryGap="20%">
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {intel.violationHistory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.count > 8 ? '#FF4444' : entry.count > 5 ? '#FF6B00' : '#FF6B0060'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Complaint Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mb-8"
        >
          <h2 className="text-lg font-semibold mb-6">Complaint Categories</h2>
          <div className="space-y-4">
            {intel.complaintCategories.map((cat, i) => {
              const maxCount = Math.max(...intel.complaintCategories.map(c => c.count));
              const percentage = (cat.count / maxCount) * 100;
              return (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-ghost-text-secondary">{cat.category}</span>
                    <span className="font-medium">{cat.count}</span>
                  </div>
                  <div className="h-2 bg-ghost-surface-4 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.05 }}
                      className="h-full bg-gradient-to-r from-ghost-orange to-ghost-amber rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* HPD Violations Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">HPD Violations</h2>
            <a
              href="#"
              className="flex items-center gap-1.5 text-sm text-ghost-orange hover:text-ghost-orange-light transition-colors"
            >
              View on HPD Online
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-ghost-text-muted text-xs uppercase tracking-wider">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ghost-border">
                {intel.hpdViolations.map((v, i) => (
                  <motion.tr
                    key={v.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-ghost-text-muted" />
                        {v.date}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        v.severity === 'critical' ? 'badge-critical' :
                        v.severity === 'high' ? 'badge-high' :
                        'badge-medium'
                      }`}>
                        {v.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-ghost-text-secondary max-w-xs">
                      {v.description}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                        v.status === 'open' ? 'text-ghost-danger' :
                        v.status === 'pending' ? 'text-ghost-warning' :
                        'text-ghost-success'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          v.status === 'open' ? 'bg-ghost-danger' :
                          v.status === 'pending' ? 'bg-ghost-warning' :
                          'bg-ghost-success'
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm"
        >
          <div>
            <p className="text-ghost-text-muted mb-1">Building Age</p>
            <p className="font-semibold text-lg">{intel.buildingAge} years</p>
          </div>
          <div>
            <p className="text-ghost-text-muted mb-1">Last HPD Inspection</p>
            <p className="font-semibold text-lg">{intel.lastInspection}</p>
          </div>
          <div>
            <p className="text-ghost-text-muted mb-1">Rent Stabilized</p>
            <p className={`font-semibold text-lg ${intel.rentStabilized ? 'text-ghost-success' : 'text-ghost-text-muted'}`}>
              {intel.rentStabilized ? 'Yes' : 'No'}
            </p>
          </div>
          <div>
            <p className="text-ghost-text-muted mb-1">Avg. Risk Score</p>
            <p className="font-semibold text-lg text-ghost-warning">{intel.averageRiskScore}/100</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
