import { useState } from 'react'
import { ArrowRightLeft, Plus, Search, Warehouse, AlertCircle, TrendingDown } from 'lucide-react'

const warehouses = ['All Warehouses', 'Warehouse A — Mumbai', 'Warehouse B — Delhi']

const STOCK = [
  { id: '1', name: 'Wireless Headphones', sku: 'WH-2040', wA: 90, wB: 52, reorder: 30, reserved: 10, unit: 'pcs' },
  { id: '2', name: 'USB-C Hub Pro', sku: 'UCH-005', wA: 2, wB: 2, reorder: 20, reserved: 0, unit: 'pcs' },
  { id: '3', name: 'Ergonomic Mouse', sku: 'EM-301', wA: 50, wB: 37, reorder: 25, reserved: 8, unit: 'pcs' },
  { id: '4', name: 'Laptop Stand', sku: 'LS-110', wA: 8, wB: 4, reorder: 25, reserved: 2, unit: 'pcs' },
  { id: '5', name: 'Mechanical Keyboard', sku: 'MK-420', wA: 40, wB: 21, reorder: 15, reserved: 5, unit: 'pcs' },
  { id: '6', name: 'HDMI Cable 2m', sku: 'HC-200', wA: 10, wB: 8, reorder: 30, reserved: 0, unit: 'pcs' },
  { id: '7', name: 'Monitor Light Bar', sku: 'MLB-01', wA: 0, wB: 0, reorder: 10, reserved: 0, unit: 'pcs' },
  { id: '8', name: 'Webcam 4K', sku: 'WC-4K', wA: 20, wB: 15, reorder: 12, reserved: 3, unit: 'pcs' },
]

export default function Inventory() {
  const [search, setSearch] = useState('')
  const [warehouse, setWarehouse] = useState(warehouses[0])
  const [showAdjust, setShowAdjust] = useState(false)

  const filtered = STOCK.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.sku.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total SKUs Tracked', value: '3,840', color: 'indigo' },
          { label: 'On Hand Value', value: '$284,320', color: 'violet' },
          { label: 'Reserved / Committed', value: '420 units', color: 'blue' },
          { label: 'Items Below Reorder', value: '7', color: 'yellow' },
        ].map(s => (
          <div key={s.label} className="glass-card rounded-xl p-4">
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search stock..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/8 rounded-lg text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
        <select
          value={warehouse}
          onChange={e => setWarehouse(e.target.value)}
          className="px-3 py-2 bg-white/5 border border-white/8 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-colors"
        >
          {warehouses.map(w => <option key={w} value={w} className="bg-[#1e2537]">{w}</option>)}
        </select>
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => setShowAdjust(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-lg transition-all"
          >
            <Plus size={14} /> Stock Adjustment
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 bg-white/5 border border-white/8 rounded-lg hover:bg-white/8 transition-colors">
            <ArrowRightLeft size={14} /> Transfer
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-medium text-slate-500">Item</th>
                <th className="text-right p-4 text-xs font-medium text-slate-500">
                  <Warehouse size={12} className="inline mr-1" />Warehouse A
                </th>
                <th className="text-right p-4 text-xs font-medium text-slate-500">
                  <Warehouse size={12} className="inline mr-1" />Warehouse B
                </th>
                <th className="text-right p-4 text-xs font-medium text-slate-500">Total</th>
                <th className="text-right p-4 text-xs font-medium text-slate-500">Reserved</th>
                <th className="text-right p-4 text-xs font-medium text-slate-500">Available</th>
                <th className="text-right p-4 text-xs font-medium text-slate-500">Reorder At</th>
                <th className="text-center p-4 text-xs font-medium text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filtered.map(item => {
                const total = item.wA + item.wB
                const available = total - item.reserved
                const isCritical = total <= item.reorder * 0.3
                const isLow = total > item.reorder * 0.3 && total <= item.reorder
                const isOut = total === 0

                return (
                  <tr key={item.id} className="table-row-hover transition-colors">
                    <td className="p-4">
                      <p className="text-sm font-medium text-slate-200">{item.name}</p>
                      <p className="text-xs font-mono text-slate-500">{item.sku}</p>
                    </td>
                    <td className="p-4 text-right text-sm text-slate-300">{item.wA}</td>
                    <td className="p-4 text-right text-sm text-slate-300">{item.wB}</td>
                    <td className="p-4 text-right text-sm font-semibold text-white">{total}</td>
                    <td className="p-4 text-right text-xs text-slate-500">{item.reserved}</td>
                    <td className="p-4 text-right text-sm text-green-400">{available}</td>
                    <td className="p-4 text-right text-xs text-slate-500">{item.reorder}</td>
                    <td className="p-4 text-center">
                      {isOut ? (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">
                          <AlertCircle size={10} /> Out of Stock
                        </span>
                      ) : isCritical ? (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400">
                          <TrendingDown size={10} /> Critical
                        </span>
                      ) : isLow ? (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400">
                          <TrendingDown size={10} /> Low
                        </span>
                      ) : (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400">OK</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {showAdjust && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAdjust(false)}>
          <div className="glass-card rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-base font-semibold text-white mb-1">Stock Adjustment</h2>
            <p className="text-xs text-slate-500 mb-5">Manually adjust inventory quantities with a reason code.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Item</label>
                <select className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-colors">
                  {STOCK.map(s => <option key={s.id} value={s.id} className="bg-[#1e2537]">{s.name} ({s.sku})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Adjustment Type</label>
                  <select className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-colors">
                    <option className="bg-[#1e2537]">Add (+)</option>
                    <option className="bg-[#1e2537]">Remove (-)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Quantity</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Reason Code</label>
                <select className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-colors">
                  {['Damaged / Spoiled', 'Cycle Count Correction', 'Found / Returned', 'Theft / Loss', 'Other'].map(r => (
                    <option key={r} className="bg-[#1e2537]">{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Notes</label>
                <textarea rows={2} placeholder="Optional notes..." className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAdjust(false)} className="flex-1 py-2.5 text-sm text-slate-400 bg-white/5 rounded-lg hover:bg-white/8 transition-colors">
                Cancel
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg transition-all">
                Apply Adjustment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
