import { useState } from 'react'
import { Link } from 'wouter'
import { Menu, X } from 'lucide-react'
import sunarLogo from '@/assets/sunar-logo.png'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
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
          </div>
        </div>
      )}
    </nav>
  )
}
