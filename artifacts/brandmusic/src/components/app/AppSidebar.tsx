
import { useState } from 'react'
import { Link } from 'wouter'
import { useLocation } from 'wouter'
import { 
  Search, 
  Video, 
  Sliders, 
  Package, 
  Building2, 
  Settings, 
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  User,
  Music
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { icon: Music, label: 'Library', href: '/app/search' },
  { icon: Video, label: 'Video Sync', href: '/app/video-sync' },
  { icon: Sliders, label: 'Stem Studio', href: '/app/stem-studio' },
  { icon: Package, label: 'Projects', href: '/app/projects' },
  { icon: Building2, label: 'Brand Portal', href: '/app/brand-portal', badge: 'Enterprise' },
]

const bottomNavItems = [
  { icon: Settings, label: 'Settings', href: '/app/settings' },
  { icon: HelpCircle, label: 'Help & Support', href: '/app/help' },
]

export default function AppSidebar() {
  const [pathname] = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-surface-elevated rounded-lg border border-white/10"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen w-64 bg-surface border-r border-white/5 flex flex-col z-40"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/app/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-electric-purple rounded-lg flex items-center justify-center">
              <span className="text-xl font-display font-bold text-black">B</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg group-hover:text-electric-blue transition-colors">
                SONAR
              </h1>
              <p className="text-xs text-text-tertiary">AI Sound OS</p>
            </div>
          </Link>
        </div>

        {/* Plan Badge */}
        <div className="px-6 py-4 border-b border-white/5">
          <div className="p-3 bg-surface-elevated rounded-lg border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-tertiary">Current Plan</span>
              <span className="px-2 py-0.5 text-xs bg-electric-blue/20 text-electric-blue rounded-full font-semibold">
                Pro
              </span>
            </div>
            <div className="text-sm font-semibold text-white mb-1">
              Unlimited Downloads
            </div>
            <p className="text-xs text-text-tertiary">
              Full stem access & customization
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                    isActive
                      ? 'bg-electric-blue/10 text-electric-blue'
                      : 'text-text-secondary hover:bg-surface-hover hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 font-medium text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs bg-electric-purple/20 text-electric-purple rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          <div className="mt-8 px-3 space-y-1">
            <div className="px-3 py-2 text-xs text-text-tertiary uppercase tracking-wider font-semibold">
              Settings
            </div>
            {bottomNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-electric-blue/10 text-electric-blue'
                      : 'text-text-secondary hover:bg-surface-hover hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-surface-hover transition-colors group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-electric-cyan to-electric-blue rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-black" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-sm text-white group-hover:text-electric-blue transition-colors">
                Demo User
              </div>
              <div className="text-xs text-text-tertiary">Pro Plan</div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-text-tertiary transition-transform ${
                showUserMenu ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 overflow-hidden"
              >
                <div className="space-y-1">
                  <button className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
                    Account Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
                    Billing
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
                    Upgrade Plan
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors">
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  )
}
