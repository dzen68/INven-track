import { useState } from 'react'
import { Warehouse, Users, Link, Bell, Shield, CreditCard, ChevronRight } from 'lucide-react'

const tabs = [
  { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
  { id: 'users', label: 'Users & Roles', icon: Users },
  { id: 'integrations', label: 'Integrations', icon: Link },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
]

const integrations = [
  { name: 'Shopify', desc: 'Sync orders and inventory in real-time', connected: true, logo: '🛍️' },
  { name: 'WooCommerce', desc: 'Bi-directional order and product sync', connected: false, logo: '🔧' },
  { name: 'QuickBooks Online', desc: 'Sync invoices, COGS, and payments', connected: true, logo: '📊' },
  { name: 'Xero', desc: 'Accounting sync and bank reconciliation', connected: false, logo: '💼' },
  { name: 'FedEx', desc: 'Real-time rates and label printing', connected: true, logo: '📦' },
  { name: 'Stripe', desc: 'Accept payments and sync invoices', connected: false, logo: '💳' },
  { name: 'Twilio SMS', desc: 'Send order and stock SMS alerts', connected: false, logo: '📱' },
  { name: 'AfterShip', desc: 'Universal tracking for 900+ carriers', connected: false, logo: '🚚' },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('warehouses')

  return (
    <div className="flex gap-6">
      {/* Tab sidebar */}
      <div className="w-48 flex-shrink-0">
        <div className="glass-card rounded-xl overflow-hidden">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-500/10 text-indigo-400 border-r-2 border-indigo-500'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 min-w-0">
        {activeTab === 'warehouses' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Warehouses</h2>
              <button className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg">
                + Add Warehouse
              </button>
            </div>
            {[
              { name: 'Warehouse A', location: 'Mumbai, Maharashtra', items: 2240, primary: true },
              { name: 'Warehouse B', location: 'Delhi NCR', items: 1600, primary: false },
            ].map(w => (
              <div key={w.name} className="glass-card rounded-xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Warehouse size={18} className="text-indigo-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{w.name}</p>
                    {w.primary && <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400">Primary</span>}
                  </div>
                  <p className="text-xs text-slate-500">{w.location} · {w.items.toLocaleString()} items</p>
                </div>
                <button className="text-slate-500 hover:text-slate-300"><ChevronRight size={16} /></button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Users & Roles</h2>
              <button className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg">
                + Invite User
              </button>
            </div>
            {[
              { name: 'Priya Sharma', email: 'priya@company.com', role: 'Admin', status: 'Active' },
              { name: 'Marco Rossi', email: 'marco@company.com', role: 'Warehouse Staff', status: 'Active' },
              { name: 'Elena Gomez', email: 'elena@company.com', role: 'Manager', status: 'Active' },
              { name: 'Dev Patel', email: 'dev@company.com', role: 'Read-Only', status: 'Invited' },
            ].map(u => (
              <div key={u.email} className="glass-card rounded-xl p-4 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold">
                  {u.name[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{u.name}</p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400">{u.role}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full ${u.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/15 text-slate-400'}`}>{u.status}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-white">Integrations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {integrations.map(intg => (
                <div key={intg.name} className="glass-card rounded-xl p-4 flex items-start gap-4">
                  <span className="text-2xl">{intg.logo}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-white">{intg.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${intg.connected ? 'bg-green-500/15 text-green-400' : 'bg-slate-500/10 text-slate-500'}`}>
                        {intg.connected ? 'Connected' : 'Not connected'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{intg.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-white">Billing & Plan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {[
                { name: 'Free', price: '$0/mo', orders: '250/mo', warehouses: '1', users: '2', current: true },
                { name: 'Starter', price: '$29/mo', orders: '1,500/mo', warehouses: '2', users: '5', current: false },
                { name: 'Growth', price: '$79/mo', orders: '10,000/mo', warehouses: '5', users: '15', current: false },
                { name: 'Pro', price: '$199/mo', orders: 'Unlimited', warehouses: 'Unlimited', users: 'Unlimited', current: false },
              ].map(plan => (
                <div key={plan.name} className={`glass-card rounded-xl p-4 ${plan.current ? 'border-indigo-500/30 bg-indigo-500/5' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-white">{plan.name}</p>
                    {plan.current && <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400">Current</span>}
                  </div>
                  <p className="text-xl font-bold text-white mb-3">{plan.price}</p>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    <li>{plan.orders} orders</li>
                    <li>{plan.warehouses} warehouse{plan.warehouses !== '1' ? 's' : ''}</li>
                    <li>{plan.users} user{plan.users !== '1' ? 's' : ''}</li>
                  </ul>
                  {!plan.current && (
                    <button className="mt-4 w-full py-2 text-xs font-medium text-indigo-400 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/10 transition-colors">
                      Upgrade
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'notifications' || activeTab === 'security') && (
          <div className="glass-card rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-3">
              {activeTab === 'notifications' ? <Bell size={20} className="text-indigo-400" /> : <Shield size={20} className="text-indigo-400" />}
            </div>
            <p className="text-sm font-medium text-white mb-1">
              {activeTab === 'notifications' ? 'Notification Settings' : 'Security Settings'}
            </p>
            <p className="text-xs text-slate-500">Coming soon — configure your preferences here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
