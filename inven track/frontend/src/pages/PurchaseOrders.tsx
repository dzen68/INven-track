import { useState } from 'react'
import { Plus, Search, Eye, Send } from 'lucide-react'

const PURCHASE_ORDERS = [
  { id: 'PO-0087', vendor: 'TechSource Global', date: '2026-04-04', items: 3, amount: 12400.00, status: 'Received', eta: '—' },
  { id: 'PO-0086', vendor: 'Acme Peripherals', date: '2026-04-03', items: 2, amount: 6800.00, status: 'Sent', eta: 'Apr 8' },
  { id: 'PO-0085', vendor: 'ZenTech Supply', date: '2026-04-02', items: 5, amount: 22100.00, status: 'Partially Received', eta: 'Apr 7' },
  { id: 'PO-0084', vendor: 'TechSource Global', date: '2026-04-01', items: 1, amount: 3500.00, status: 'Billed', eta: '—' },
  { id: 'PO-0083', vendor: 'Pacific Components', date: '2026-03-30', items: 4, amount: 9200.00, status: 'Draft', eta: 'TBD' },
  { id: 'PO-0082', vendor: 'Acme Peripherals', date: '2026-03-28', items: 6, amount: 18600.00, status: 'Closed', eta: '—' },
]

const statusStyle: Record<string, string> = {
  Draft: 'bg-slate-500/15 text-slate-400',
  Sent: 'bg-blue-500/15 text-blue-400',
  'Partially Received': 'bg-violet-500/15 text-violet-400',
  Received: 'bg-green-500/15 text-green-400',
  Billed: 'bg-orange-500/15 text-orange-400',
  Closed: 'bg-slate-500/10 text-slate-500',
}

export default function PurchaseOrders() {
  const [search, setSearch] = useState('')

  const filtered = PURCHASE_ORDERS.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) || o.vendor.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total POs', value: '87', sub: 'All time' },
          { label: 'Open POs', value: '12', sub: 'In progress' },
          { label: 'Awaiting Receipt', value: '5', sub: 'Expected this week' },
          { label: 'Spend (MTD)', value: '$72,600', sub: 'This month' },
        ].map(s => (
          <div key={s.label} className="glass-card rounded-xl p-4">
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-xs font-medium text-slate-400 mt-0.5">{s.label}</p>
            <p className="text-xs text-slate-600">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search POs or vendors..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/8 rounded-lg text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg transition-all ml-auto">
          <Plus size={14} /> New Purchase Order
        </button>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-medium text-slate-500">PO #</th>
                <th className="text-left p-4 text-xs font-medium text-slate-500">Vendor</th>
                <th className="text-left p-4 text-xs font-medium text-slate-500">Date</th>
                <th className="text-left p-4 text-xs font-medium text-slate-500">ETA</th>
                <th className="text-right p-4 text-xs font-medium text-slate-500">Items</th>
                <th className="text-right p-4 text-xs font-medium text-slate-500">Amount</th>
                <th className="text-center p-4 text-xs font-medium text-slate-500">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filtered.map(po => (
                <tr key={po.id} className="table-row-hover transition-colors">
                  <td className="p-4 text-sm font-mono font-medium text-violet-400">{po.id}</td>
                  <td className="p-4 text-sm text-slate-200">{po.vendor}</td>
                  <td className="p-4 text-xs text-slate-500">{po.date}</td>
                  <td className="p-4 text-xs text-slate-400">{po.eta}</td>
                  <td className="p-4 text-right text-xs text-slate-400">{po.items}</td>
                  <td className="p-4 text-right text-sm font-semibold text-white">${po.amount.toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[po.status]}`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 justify-end">
                      {po.status === 'Draft' && (
                        <button className="p-1.5 rounded-md text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" title="Send to vendor">
                          <Send size={13} />
                        </button>
                      )}
                      <button className="p-1.5 rounded-md text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors">
                        <Eye size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
