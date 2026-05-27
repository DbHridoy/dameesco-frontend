
import { useState } from 'react'
import { Link } from 'wouter'
import Button from './Button'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <img
              src="/BrandMusic_H.svg"
              alt="Brandmusic"
              width={320}
              height={80}
              className="h-16 w-auto brightness-0 invert"
             
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/library" className="text-white/70 hover:text-white transition-colors">
              Browse Music
            </Link>
            <Link href="/features" className="text-white/70 hover:text-white transition-colors">
              Features
            </Link>
            {/* --- Disabled nav links (uncomment to re-enable) ---
            <Link href="/pricing" className="text-white/70 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/services" className="text-white/70 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/enterprise" className="text-white/70 hover:text-white transition-colors">
              For Enterprise
            </Link>
            */}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* --- Disabled auth links (uncomment to re-enable) ---
            {user ? (
              <>
                <Link href="/profile" className="text-white/70 hover:text-white transition-colors">
                  Profile
                </Link>
                <Link href="/library">
                  <Button>Library</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="text-white/70 hover:text-white transition-colors">
                    Log in
                  </button>
                </Link>
                <Link href="/signup">
                  <Button>Start Free</Button>
                </Link>
              </>
            )}
            */}
            <Link href="/library">
              <Button>Browse Music</Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-white/5">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="/library"
              className="block text-white/70 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Browse Music
            </Link>
            <Link
              href="/features"
              className="block text-white/70 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            {/* --- Disabled mobile nav links (uncomment to re-enable) ---
            <Link
              href="/pricing"
              className="block text-white/70 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/services"
              className="block text-white/70 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/enterprise"
              className="block text-white/70 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              For Enterprise
            </Link>
            */}
            <div className="pt-4 border-t border-white/5 space-y-3">
              {/* --- Disabled mobile auth links (uncomment to re-enable) ---
              {user ? (
                <>
                  <Link href="/profile" onClick={() => setIsOpen(false)}>
                    <button className="w-full text-left text-white/70 hover:text-white transition-colors py-2">
                      Profile
                    </button>
                  </Link>
                  <Link href="/library" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Library</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full text-left text-white/70 hover:text-white transition-colors py-2">
                      Log in
                    </button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Start Free</Button>
                  </Link>
                </>
              )}
              */}
              <Link href="/library" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Browse Music</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
