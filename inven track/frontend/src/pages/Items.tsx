import { useState } from 'react'
import { Plus, Search, Filter, Edit2, Trash2, Package, MoreVertical, Upload, Download } from 'lucide-react'

const MOCK_ITEMS = [
  { id: '1', name: 'Wireless Headphones', sku: 'WH-2040', category: 'Electronics', cost: 85, price: 199.99, unit: 'pcs', stock: 142, status: 'active' },
  { id: '2', name: 'USB-C Hub Pro', sku: 'UCH-005', category: 'Electronics', cost: 32, price: 149.99, unit: 'pcs', stock: 4, status: 'low' },
  { id: '3', name: 'Ergonomic Mouse', sku: 'EM-301', category: 'Peripherals', cost: 22, price: 99.99, unit: 'pcs', stock: 87, status: 'active' },
  { id: '4', name: 'Laptop Stand', sku: 'LS-110', category: 'Accessories', cost: 18, price: 79.99, unit: 'pcs', stock: 12, status: 'low' },
  { id: '5', name: 'Mechanical Keyboard', sku: 'MK-420', category: 'Peripherals', cost: 95, price: 299.99, unit: 'pcs', stock: 61, status: 'active' },
  { id: '6', name: 'HDMI Cable 2m', sku: 'HC-200', category: 'Cables', cost: 4, price: 19.99, unit: 'pcs', stock: 18, status: 'low' },
  { id: '7', name: 'Monitor Light Bar', sku: 'MLB-01', category: 'Accessories', cost: 28, price: 89.99, unit: 'pcs', stock: 0, status: 'out' },
  { id: '8', name: 'Webcam 4K', sku: 'WC-4K', category: 'Electronics', cost: 64, price: 189.99, unit: 'pcs', stock: 35, status: 'active' },
]

const statusStyle: Record<string, string> = {
  active: 'bg-green-500/15 text-green-400',
  low: 'bg-yellow-500/15 text-yellow-400',
  out: 'bg-red-500/15 text-red-400',
}

export default function Items() {
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = MOCK_ITEMS.filter(
    i => i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      {/* Header actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/8 rounded-lg text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 bg-white/5 border border-white/8 rounded-lg hover:bg-white/8 transition-colors">
            <Filter size={13} /> Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 bg-white/5 border border-white/8 rounded-lg hover:bg-white/8 transition-colors">
            <Upload size={13} /> Import
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 bg-white/5 border border-white/8 rounded-lg hover:bg-white/8 transition-colors">
            <Download size={13} /> Export
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-lg transition-all shadow-lg shadow-indigo-500/20"
          >
            <Plus size={14} /> Add Item
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Items', value: '8', icon: Package, color: 'indigo' },
          { label: 'Active', value: '5', icon: Package, color: 'green' },
          { label: 'Low Stock', value: '3', icon: Package, color: 'yellow' },
          { label: 'Out of Stock', value: '1', icon: Package, color: 'red' },
        ].map(s => (
          <div key={s.label} className="glass-card rounded-xl p-4">
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-medium text-slate-500">Item</th>
                <th className="text-left p-4 text-xs font-medium text-slate-500">SKU</th>
                <th className="text-left p-4 text-xs font-medium text-slate-500">Category</th>
                <th className="text-right p-4 text-xs font-medium text-slate-500">Cost</th>
                <th className="text-right p-4 text-xs font-medium text-slate-500">Sell Price</th>
                <th className="text-right p-4 text-xs font-medium text-slate-500">Stock</th>
                <th className="text-center p-4 text-xs font-medium text-slate-500">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filtered.map(item => (
                <tr key={item.id} className="table-row-hover transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                        <Package size={14} className="text-indigo-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-200">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-mono text-slate-400">{item.sku}</td>
                  <td className="p-4 text-xs text-slate-400">{item.category}</td>
                  <td className="p-4 text-right text-xs text-slate-400">${item.cost.toFixed(2)}</td>
                  <td className="p-4 text-right text-xs font-medium text-slate-200">${item.price.toFixed(2)}</td>
                  <td className="p-4 text-right text-xs text-slate-300">{item.stock}</td>
                  <td className="p-4 text-center">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[item.status]}`}>
                      {item.status === 'active' ? 'Active' : item.status === 'low' ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 justify-end">
                      <button className="p-1.5 rounded-md text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors">
                        <Edit2 size={13} />
                      </button>
                      <button className="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-white/5 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {MOCK_ITEMS.length} items</p>
          <div className="flex gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-7 h-7 text-xs rounded-md ${p === 1 ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:bg-white/5'} transition-colors`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="glass-card rounded-2xl p-6 w-full max-w-md shadow-2xl shadow-black/60" onClick={e => e.stopPropagation()}>
            <h2 className="text-base font-semibold text-white mb-5">Add New Item</h2>
            <div className="space-y-4">
              {[
                { label: 'Item Name', placeholder: 'e.g. Wireless Headphones' },
                { label: 'SKU', placeholder: 'e.g. WH-2040' },
                { label: 'Category', placeholder: 'e.g. Electronics' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Cost Price</label>
                  <input type="number" placeholder="0.00" className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Sell Price</label>
                  <input type="number" placeholder="0.00" className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 text-sm text-slate-400 bg-white/5 rounded-lg hover:bg-white/8 transition-colors">
                Cancel
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-lg transition-all">
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
