import { useState } from 'react'
import { Plus, Search, Eye, ChevronDown } from 'lucide-react'

const SALES_ORDERS = [
  { id: 'SO-0231', customer: "Elena's DTC Store", date: '2026-04-05', items: 3, amount: 2840.50, status: 'Shipped' },
  { id: 'SO-0230', customer: 'Amazon FBA Channel', date: '2026-04-05', items: 7, amount: 5120.00, status: 'Picked' },
  { id: 'SO-0229', customer: 'Sam\'s Retail Co', date: '2026-04-04', items: 2, amount: 899.98, status: 'Invoiced' },
  { id: 'SO-0228', customer: 'Shopify — Store #4', date: '2026-04-04', items: 1, amount: 299.99, status: 'Paid' },
  { id: 'SO-0227', customer: 'Marco Distributors', date: '2026-04-03', items: 12, amount: 14400.00, status: 'Confirmed' },
  { id: 'SO-0226', customer: 'Pacific Retail Group', date: '2026-04-03', items: 5, amount: 3750.00, status: 'Draft' },
  { id: 'SO-0225', customer: 'TechHub Online', date: '2026-04-02', items: 4, amount: 1599.96, status: 'Closed' },
  { id: 'SO-0224', customer: 'WooCommerce — Shop', date: '2026-04-01', items: 2, amount: 459.98, status: 'Shipped' },
]

const statusStyle: Record<string, string> = {
  Draft: 'bg-slate-500/15 text-slate-400',
  Confirmed: 'bg-blue-500/15 text-blue-400',
  Picked: 'bg-indigo-500/15 text-indigo-400',
  Packed: 'bg-violet-500/15 text-violet-400',
  Shipped: 'bg-cyan-500/15 text-cyan-400',
  Invoiced: 'bg-orange-500/15 text-orange-400',
  Paid: 'bg-green-500/15 text-green-400',
  Closed: 'bg-slate-500/10 text-slate-500',
}

const allStatuses = ['All', 'Draft', 'Confirmed', 'Picked', 'Packed', 'Shipped', 'Invoiced', 'Paid', 'Closed']

export default function SalesOrders() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = SALES_ORDERS.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Orders', value: '231', sub: 'All time' },
          { label: 'Open Orders', value: '18', sub: 'Needs attention' },
          { label: 'Pending Shipment', value: '7', sub: 'Ready to ship' },
          { label: 'Revenue (MTD)', value: '$48,920', sub: 'This month' },
        ].map(s => (
          <div key={s.label} className="glass-card rounded-xl p-4">
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-xs font-medium text-slate-400 mt-0.5">{s.label}</p>
            <p className="text-xs text-slate-600">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters + actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search orders or customers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/8 rounded-lg text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {allStatuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                statusFilter === s
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg transition-all ml-auto">
          <Plus size={14} /> New Order
        </button>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-medium text-slate-500">Order #</th>
                <th className="text-left p-4 text-xs font-medium text-slate-500">Customer</th>
                <th className="text-left p-4 text-xs font-medium text-slate-500">Date</th>
                <th className="text-right p-4 text-xs font-medium text-slate-500">Items</th>
                <th className="text-right p-4 text-xs font-medium text-slate-500">Amount</th>
                <th className="text-center p-4 text-xs font-medium text-slate-500">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filtered.map(order => (
                <tr key={order.id} className="table-row-hover transition-colors">
                  <td className="p-4 text-sm font-mono font-medium text-indigo-400">{order.id}</td>
                  <td className="p-4 text-sm text-slate-200">{order.customer}</td>
                  <td className="p-4 text-xs text-slate-500">{order.date}</td>
                  <td className="p-4 text-right text-xs text-slate-400">{order.items}</td>
                  <td className="p-4 text-right text-sm font-semibold text-white">${order.amount.toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="p-1.5 rounded-md text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors">
                      <Eye size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-white/5 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {SALES_ORDERS.length} orders</p>
        </div>
      </div>
    </div>
  )
}
