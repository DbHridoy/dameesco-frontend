import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { ChevronDown, Menu, X } from 'lucide-react'
import sunarLogo from '@/assets/sunar-logo.png'
import Button from '@/components/ui/Button'
import AuthModal from '@/components/ui/AuthModal'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { signOut } from '@/features/auth/authSlice'
import { api } from '@/services/api'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [accountOpen, setAccountOpen] = useState(false)
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const [, navigate] = useLocation()
  const accountRef = useRef<HTMLDivElement | null>(null)
  const isPaidUser = user?.subscriptionStatus === 'paid'
  const accessLabel = isPaidUser ? 'Paid' : 'Free'
  const userInitials = user
    ? user.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('')
    : ''

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!accountRef.current) return
      if (!accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!user) {
      setAccountOpen(false)
    }
  }, [user])

  const handleSignOut = () => {
    dispatch(signOut())
    dispatch(api.util.resetApiState())
    setAccountOpen(false)
    setIsOpen(false)
    navigate('/')
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-background)]/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <Link href="/" aria-label="SUNAR home" className="flex items-center">
              <img src={sunarLogo} alt="SUNAR" className="h-5 w-auto" />
            </Link>
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] border border-[var(--color-border-default)] rounded px-1.5 py-0.5">
              beta
            </span>
          </div>

          <div className="hidden md:flex items-center gap-7">
            <Link
              href="/"
              className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/library"
              className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Browse Music
            </Link>
            <Link
              href="/pricing"
              className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Pricing
            </Link>
            {user ? (
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  onClick={() => setAccountOpen((open) => !open)}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface)] px-2 py-1 pr-3 text-[13px] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
                  aria-haspopup="menu"
                  aria-expanded={accountOpen}
                >
	                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[11px] font-medium text-[var(--color-accent)]">
	                    {userInitials}
	                  </span>
	                  <span className="max-w-[120px] truncate">{user.name}</span>
                    <span
                      className={`mono rounded px-1.5 py-0.5 text-[9px] uppercase tracking-[0.12em] ${
                        isPaidUser
                          ? 'bg-green-500/12 text-green-300'
                          : 'bg-white/[0.04] text-[var(--color-text-tertiary)]'
                      }`}
                    >
                      {accessLabel}
                    </span>
	                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[var(--color-text-tertiary)] transition-transform ${
                      accountOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {accountOpen ? (
                  <div
                    role="menu"
                    className="absolute right-0 top-[calc(100%+10px)] w-44 overflow-hidden rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] shadow-2xl"
                  >
                    <Link
                      href="/profile"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-3 text-[13px] text-[var(--color-text-secondary)] transition-colors hover:bg-white/[0.04] hover:text-[var(--color-text-primary)]"
                    >
                      Profile
                    </Link>
                    <button
	                      type="button"
	                      onClick={handleSignOut}
	                      className="block w-full px-4 py-3 text-left text-[13px] text-[var(--color-text-secondary)] transition-colors hover:bg-white/[0.04] hover:text-[var(--color-text-primary)]"
                    >
                      Log out
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setAuthMode('register')
                    setAuthOpen(true)
                  }}
                >
                  Register
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setAuthMode('login')
                    setAuthOpen(true)
                  }}
                >
                  Sign in
                </Button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[var(--color-text-primary)] p-2 -mr-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-[var(--color-border-subtle)] bg-[var(--color-background)]">
            <div className="px-6 py-4 space-y-1">
            <Link
              href="/"
              className="block py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/library"
              className="block py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Browse Music
            </Link>
            <Link
              href="/pricing"
              className="block py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
              {user ? (
                <div className="mt-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface)] p-2">
	                  <div className="flex items-center gap-3 px-1 py-1.5">
	                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[12px] font-medium text-[var(--color-accent)]">
	                      {userInitials}
	                    </span>
	                    <span className="min-w-0">
	                      <span className="block truncate text-[13px] text-[var(--color-text-primary)]">
	                        {user.name}
	                      </span>
	                      <span
                          className={`mt-1 inline-flex rounded px-1.5 py-0.5 mono text-[9px] uppercase tracking-[0.12em] ${
                            isPaidUser
                              ? 'bg-green-500/12 text-green-300'
                              : 'bg-white/[0.04] text-[var(--color-text-tertiary)]'
                          }`}
                        >
	                        {accessLabel} account
	                      </span>
	                    </span>
	                  </div>
                  <Link
                    href="/profile"
                    className="block rounded-md px-3 py-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-white/[0.04] hover:text-[var(--color-text-primary)]"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
	                    type="button"
	                    onClick={handleSignOut}
	                    className="block w-full rounded-md px-3 py-2 text-left text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-white/[0.04] hover:text-[var(--color-text-primary)]"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('register')
                      setAuthOpen(true)
                      setIsOpen(false)
                    }}
                    className="rounded-md border border-[var(--color-border-subtle)] px-3 py-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)]"
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login')
                      setAuthOpen(true)
                      setIsOpen(false)
                    }}
                    className="rounded-md bg-[var(--color-accent)] px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />
    </>
  )
}
