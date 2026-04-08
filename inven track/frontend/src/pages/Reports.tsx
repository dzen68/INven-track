import { BarChart2, Download, Filter } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const reports = [
  { name: 'Inventory Summary', desc: 'Current stock on hand, on order, committed by warehouse', category: 'Inventory' },
  { name: 'Stock Movement Report', desc: 'All inventory ins and outs for any date range', category: 'Inventory' },
  { name: 'Inventory Valuation', desc: 'Total stock value by FIFO/LIFO/WAC method', category: 'Inventory' },
  { name: 'Dead Stock Report', desc: 'Items with zero movement for a configurable period', category: 'Inventory' },
  { name: 'Sales by Item', desc: 'Units sold, revenue, COGS, and gross margin per SKU', category: 'Sales' },
  { name: 'Sales by Customer', desc: 'Total orders and revenue grouped by customer', category: 'Sales' },
  { name: 'Purchase Order History', desc: 'POs by vendor, date range, and status', category: 'Purchasing' },
  { name: 'Reorder Report', desc: 'Items below threshold with recommended PO quantities', category: 'Purchasing' },
  { name: 'Vendor Performance', desc: 'Average lead time and on-time delivery rate per vendor', category: 'Purchasing' },
  { name: 'Batch/Serial Traceability', desc: 'Trace any unit from receipt to sale', category: 'Traceability' },
  { name: 'Warehouse Performance', desc: 'Transfer efficiency and receiving speed metrics', category: 'Warehouse' },
]

const categoryColor: Record<string, string> = {
  Inventory: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  Sales: 'text-green-400 bg-green-500/10 border-green-500/20',
  Purchasing: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Traceability: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  Warehouse: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
}

const monthData = [
  { month: 'Nov', revenue: 38000, orders: 180 },
  { month: 'Dec', revenue: 52000, orders: 240 },
  { month: 'Jan', revenue: 41000, orders: 195 },
  { month: 'Feb', revenue: 47000, orders: 210 },
  { month: 'Mar', revenue: 55000, orders: 261 },
  { month: 'Apr', revenue: 48920, orders: 199 },
]

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Monthly overview chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Monthly Revenue</h3>
              <p className="text-xs text-slate-500">Last 6 months</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 bg-white/5 rounded-lg hover:bg-white/8 transition-colors">
              <Download size={12} /> Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1e2537', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="revenue" fill="url(#barGrad)" radius={[4, 4, 0, 0]}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Order Volume</h3>
              <p className="text-xs text-slate-500">Last 6 months</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 bg-white/5 rounded-lg hover:bg-white/8 transition-colors">
              <Download size={12} /> Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={monthData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1e2537', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reports library */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <BarChart2 size={16} className="text-indigo-400" /> Report Library
          </h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 text-xs text-slate-400 px-3 py-1.5 bg-white/5 border border-white/8 rounded-lg hover:bg-white/8 transition-colors">
              <Filter size={12} /> Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {reports.map(report => (
            <div
              key={report.name}
              className="glass-card rounded-xl p-4 hover:border-indigo-500/20 cursor-pointer transition-all group"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{report.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${categoryColor[report.category]}`}>
                  {report.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{report.desc}</p>
              <div className="flex gap-2 mt-3">
                <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Run Report →</button>
                <button className="text-xs text-slate-600 hover:text-slate-400 transition-colors ml-auto flex items-center gap-1">
                  <Download size={11} /> CSV
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
