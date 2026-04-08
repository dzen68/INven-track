import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts'
import {
  Package, AlertTriangle, ShoppingCart, TruckIcon, ArrowUp, ArrowDown,
  Boxes, DollarSign, Clock, Activity, TrendingUp, Warehouse
} from 'lucide-react'

const salesData = [
  { day: 'Mon', revenue: 4200, orders: 24 },
  { day: 'Tue', revenue: 3800, orders: 18 },
  { day: 'Wed', revenue: 5100, orders: 31 },
  { day: 'Thu', revenue: 4700, orders: 27 },
  { day: 'Fri', revenue: 6300, orders: 42 },
  { day: 'Sat', revenue: 5800, orders: 38 },
  { day: 'Sun', revenue: 3200, orders: 19 },
]

const topItems = [
  { name: 'Wireless Headphones', sku: 'WH-2040', sold: 142, revenue: 28400 },
  { name: 'USB-C Hub Pro', sku: 'UCH-005', sold: 98, revenue: 14700 },
  { name: 'Ergonomic Mouse', sku: 'EM-301', sold: 87, revenue: 8700 },
  { name: 'Laptop Stand', sku: 'LS-110', sold: 76, revenue: 6080 },
  { name: 'Mechanical Keyboard', sku: 'MK-420', sold: 61, revenue: 18300 },
]

const stockAlerts = [
  { name: 'USB-C Hub Pro', sku: 'UCH-005', qty: 4, reorder: 20, level: 'critical' },
  { name: 'Laptop Stand', sku: 'LS-110', qty: 12, reorder: 25, level: 'low' },
  { name: 'HDMI Cable 2m', sku: 'HC-200', qty: 18, reorder: 30, level: 'low' },
]

const recentActivity = [
  { type: 'sale', msg: "SO-0231 — Elena's DTC Store", value: '+42 units', time: '3m ago', color: 'green' },
  { type: 'purchase', msg: 'PO-0087 received from TechSource', value: '+200 units', time: '1h ago', color: 'blue' },
  { type: 'transfer', msg: 'Transfer: Warehouse A → B (WH-2040)', value: '50 units', time: '2h ago', color: 'violet' },
  { type: 'alert', msg: 'Low stock: USB-C Hub Pro critical', value: '4 remaining', time: '3h ago', color: 'yellow' },
  { type: 'sale', msg: 'SO-0230 — Amazon FBA Channel', value: '+18 units', time: '5h ago', color: 'green' },
]

const kpis = [
  {
    label: 'Total Inventory Value',
    value: '$284,320',
    change: '+12.4%',
    up: true,
    icon: DollarSign,
    color: 'indigo',
    sub: '3,840 SKUs across 2 warehouses',
  },
  {
    label: 'Orders This Week',
    value: '199',
    change: '+8.1%',
    up: true,
    icon: ShoppingCart,
    color: 'violet',
    sub: '23 pending fulfillment',
  },
  {
    label: 'Low Stock Alerts',
    value: '7',
    change: '+3',
    up: false,
    icon: AlertTriangle,
    color: 'yellow',
    sub: '3 critical, 4 low',
  },
  {
    label: 'Open Purchase Orders',
    value: '12',
    change: '-2',
    up: true,
    icon: TruckIcon,
    color: 'blue',
    sub: 'Est. arrival this week: 5',
  },
]

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
}

const activityColor: Record<string, string> = {
  green: 'bg-green-400',
  blue: 'bg-blue-400',
  violet: 'bg-violet-400',
  yellow: 'bg-yellow-400',
  red: 'bg-red-400',
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div key={kpi.label} className="glass-card rounded-xl p-5 hover:border-white/15 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${colorMap[kpi.color]}`}>
                  <Icon size={16} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>
                  {kpi.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white mb-0.5">{kpi.value}</p>
              <p className="text-xs font-medium text-slate-400">{kpi.label}</p>
              <p className="text-xs text-slate-600 mt-1">{kpi.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="xl:col-span-2 glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Revenue & Orders</h3>
              <p className="text-xs text-slate-500 mt-0.5">Last 7 days</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Revenue
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400" /> Orders
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1e2537', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revenueGrad)" />
              <Area type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} fill="none" strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stock alerts */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <AlertTriangle size={14} className="text-yellow-400" /> Stock Alerts
            </h3>
            <span className="text-xs text-slate-500">7 items</span>
          </div>
          <div className="space-y-3">
            {stockAlerts.map((item) => {
              const pct = Math.round((item.qty / item.reorder) * 100)
              return (
                <div key={item.sku}>
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <p className="text-xs font-medium text-slate-200">{item.name}</p>
                      <p className="text-xs text-slate-600">{item.sku}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      item.level === 'critical' ? 'bg-red-500/15 text-red-400' : 'bg-yellow-500/15 text-yellow-400'
                    }`}>
                      {item.qty} left
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        item.level === 'critical' ? 'bg-red-400' : 'bg-yellow-400'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <button className="mt-4 w-full py-2 text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 rounded-lg hover:bg-indigo-500/5 transition-colors">
            View all alerts →
          </button>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Top selling items */}
        <div className="xl:col-span-2 glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <TrendingUp size={14} className="text-indigo-400" /> Top Selling Items
            </h3>
            <span className="text-xs text-slate-500">This week</span>
          </div>
          <div className="space-y-1">
            {topItems.map((item, i) => (
              <div key={item.sku} className="table-row-hover flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all">
                <span className="text-xs font-bold text-slate-700 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-200 truncate">{item.name}</p>
                  <p className="text-xs text-slate-600">{item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-white">{item.sold} units</p>
                  <p className="text-xs text-slate-500">${item.revenue.toLocaleString()}</p>
                </div>
                <div className="w-20">
                  <div className="h-1 bg-white/5 rounded-full">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                      style={{ width: `${Math.round((item.sold / 142) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Activity size={14} className="text-violet-400" /> Recent Activity
            </h3>
          </div>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activityColor[a.color]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-300 leading-snug">{a.msg}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-medium text-slate-500">{a.value}</span>
                    <span className="text-xs text-slate-700">·</span>
                    <span className="text-xs text-slate-700">{a.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
