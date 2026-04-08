import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  TruckIcon,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  LogOut,
  User,
  Boxes,
  Receipt,
} from 'lucide-react'
import { useAuthStore } from '../stores/authStore'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/items', icon: Package, label: 'Items' },
  { to: '/inventory', icon: Boxes, label: 'Inventory' },
  { to: '/sales-orders', icon: ShoppingCart, label: 'Sales Orders' },
  { to: '/purchase-orders', icon: TruckIcon, label: 'Purchase Orders' },
  { to: '/reports', icon: BarChart3, label: 'Reports' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuthStore()

  const pageTitles: Record<string, string> = {
    '/': 'Dashboard',
    '/items': 'Item Catalog',
    '/inventory': 'Inventory',
    '/sales-orders': 'Sales Orders',
    '/purchase-orders': 'Purchase Orders',
    '/reports': 'Reports & Analytics',
    '/settings': 'Settings',
  }

  const currentTitle = pageTitles[location.pathname] || 'InvenTrack'

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0f1e]">
      {/* Sidebar */}
      <aside
        className={`flex flex-col flex-shrink-0 transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-60'
        } bg-[#0d1424] border-r border-white/5`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
              <Boxes size={16} className="text-white" />
            </div>
            {!collapsed && (
              <span className="font-bold text-white text-lg tracking-tight whitespace-nowrap">
                Inven<span className="text-indigo-400">Track</span>
              </span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1 rounded-md text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronLeft
              size={16}
              className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`
              }
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-white/5">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <User size={14} className="text-white" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-200 truncate">
                  {user?.user_metadata?.full_name || user?.email || 'User'}
                </p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={() => signOut()}
                className="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Sign out"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 flex items-center gap-4 px-6 bg-[#0d1424]/50 border-b border-white/5 flex-shrink-0">
          <h1 className="font-semibold text-white text-base">{currentTitle}</h1>

          {/* Search */}
          <div className="flex-1 max-w-md ml-4">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search items, orders, vendors..."
                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/8 rounded-lg text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-colors"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="relative ml-auto">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-400 rounded-full status-pulse" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 glass-card rounded-xl shadow-2xl shadow-black/40 z-50 p-4">
                <p className="text-sm font-semibold text-white mb-3">Notifications</p>
                {[
                  { type: 'warning', msg: '3 items are below reorder point', time: '2m ago' },
                  { type: 'info', msg: 'PO-0041 received from Acme Corp.', time: '1h ago' },
                  { type: 'success', msg: 'SO-0123 shipped via FedEx', time: '3h ago' },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      n.type === 'warning' ? 'bg-yellow-400' : n.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
                    }`} />
                    <div>
                      <p className="text-xs text-slate-300">{n.msg}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Plan badge */}
          <div className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400">
            Free Plan
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
