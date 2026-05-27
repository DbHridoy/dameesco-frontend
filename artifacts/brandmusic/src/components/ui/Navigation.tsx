import { useState } from 'react'
import { Link } from 'wouter'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-background)]/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-[15px] font-semibold tracking-tight text-[var(--color-text-primary)]">
              brandmusic
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] border border-[var(--color-border-default)] rounded px-1.5 py-0.5">
              beta
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <Link
              href="/library"
              className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Browse Music
            </Link>
            <Link
              href="/features"
              className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Features
            </Link>
            {/* --- Disabled nav links (uncomment to re-enable) ---
            <Link href="/pricing" className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Pricing</Link>
            <Link href="/services" className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Services</Link>
            <Link href="/enterprise" className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">For Enterprise</Link>
            */}
            {/* --- Disabled auth links (uncomment to re-enable) ---
            <Link href="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
            <Link href="/signup"><Button size="sm">Start Free</Button></Link>
            */}
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
              href="/library"
              className="block py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Browse Music
            </Link>
            <Link
              href="/features"
              className="block py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            {/* --- Disabled mobile nav links (uncomment to re-enable) ---
            <Link href="/pricing" className="block py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors" onClick={() => setIsOpen(false)}>Pricing</Link>
            <Link href="/services" className="block py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="/enterprise" className="block py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors" onClick={() => setIsOpen(false)}>For Enterprise</Link>
            */}
            {/* --- Disabled mobile auth links (uncomment to re-enable) ---
            <div className="pt-3 mt-2 border-t border-[var(--color-border-subtle)]">
              <Link href="/login" onClick={() => setIsOpen(false)}><Button variant="ghost" size="sm" fullWidth>Log in</Button></Link>
              <Link href="/signup" onClick={() => setIsOpen(false)}><Button size="sm" fullWidth>Start Free</Button></Link>
            </div>
            */}
          </div>
        </div>
      )}
    </nav>
  )
}
