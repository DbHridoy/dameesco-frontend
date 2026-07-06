import { useState } from 'react'
import { Link } from 'wouter'
import { Loader2, Lock, LogOut, Music2, ShieldCheck, User2 } from 'lucide-react'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'
import AuthModal from '@/components/ui/AuthModal'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { signOut } from '@/features/auth/authSlice'
import { useGetMyPlaylistsQuery } from '@/services/api'

function formatDate(value?: string) {
  if (!value) return 'Recently'

  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(value))
  } catch {
    return 'Recently'
  }
}

export default function ProfilePage() {
  const [authOpen, setAuthOpen] = useState(false)
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const {
    data: playlists = [],
    isLoading: loadingPlaylists,
  } = useGetMyPlaylistsQuery(undefined, { skip: !user })

  return (
    <main className="min-h-screen text-[var(--color-text-primary)]">
      <Navigation />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      <section className="relative overflow-hidden pt-32 pb-12">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Profile
          </span>
          <h1 className="h-display mt-4 text-[40px] sm:text-[52px] md:text-[56px]">
            Your SUNAR account
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] text-[var(--color-text-secondary)]">
            Account access, licensing readiness, and your saved playlists in one place.
          </p>
        </div>
      </section>

      {!user ? (
        <section className="pb-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 text-center">
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-accent-soft)]">
                <Lock className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <h2 className="text-[20px] font-medium text-[var(--color-text-primary)]">
                Sign in to view your profile
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                Your profile becomes useful once you authenticate. That unlocks licensing requests, downloads, and your personal playlists from the backend.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button size="md" onClick={() => setAuthOpen(true)}>
                  Sign in
                </Button>
                <Link href="/library">
                  <Button size="md" variant="outline">
                    Browse music
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="pb-24">
          <div className="mx-auto grid max-w-6xl gap-4 px-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-accent-soft)]">
                      <User2 className="h-5 w-5 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <h2 className="text-[20px] font-medium text-[var(--color-text-primary)]">
                        {user.name}
                      </h2>
                      <p className="mt-1 text-[14px] text-[var(--color-text-secondary)]">
                        {user.email}
                      </p>
                      <div className="mt-3 inline-flex items-center rounded-md border border-[var(--color-border-default)] px-2.5 py-1">
                        <span className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => dispatch(signOut())}
                  >
                    <LogOut className="mr-1.5 h-3.5 w-3.5" />
                    Sign out
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border-default)] bg-[var(--color-background)]">
                    <Music2 className="h-4 w-4 text-[var(--color-accent)]" />
                  </div>
                  <div className="text-[24px] font-medium text-[var(--color-text-primary)]">
                    {loadingPlaylists ? '...' : playlists.length}
                  </div>
                  <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
                    Playlists linked to your account
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border-default)] bg-[var(--color-background)]">
                    <ShieldCheck className="h-4 w-4 text-[var(--color-accent)]" />
                  </div>
                  <div className="text-[24px] font-medium text-[var(--color-text-primary)]">
                    Active
                  </div>
                  <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
                    Authenticated session for licensing and downloads
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border-default)] bg-[var(--color-background)]">
                    <Lock className="h-4 w-4 text-[var(--color-accent)]" />
                  </div>
                  <div className="text-[24px] font-medium text-[var(--color-text-primary)]">
                    Ready
                  </div>
                  <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
                    Protected endpoints are available with your token
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-[16px] font-medium text-[var(--color-text-primary)]">
                      Your playlists
                    </h3>
                    <p className="mt-1 text-[13px] text-[var(--color-text-tertiary)]">
                      Live data from the backend playlist service.
                    </p>
                  </div>
                  <Link href="/library">
                    <Button size="sm" variant="outline">
                      Browse library
                    </Button>
                  </Link>
                </div>

                <div className="mt-5">
                  {loadingPlaylists ? (
                    <div className="flex items-center gap-2 text-[13px] text-[var(--color-text-secondary)]">
                      <Loader2 className="h-4 w-4 animate-spin text-[var(--color-accent)]" />
                      Loading your playlists...
                    </div>
                  ) : playlists.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-[var(--color-border-default)] bg-[var(--color-background)] px-4 py-8 text-center">
                      <p className="text-[14px] text-[var(--color-text-primary)]">
                        No playlists yet
                      </p>
                      <p className="mt-2 text-[13px] text-[var(--color-text-secondary)]">
                        Playlist creation is available in the backend, but there is no frontend creation flow yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {playlists.map((playlist) => (
                        <div
                          key={playlist.id}
                          className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-background)] px-4 py-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="text-[14px] font-medium text-[var(--color-text-primary)]">
                                {playlist.name}
                              </h4>
                              <p className="mt-1 text-[12.5px] text-[var(--color-text-secondary)]">
                                {playlist.description || 'No description added yet.'}
                              </p>
                            </div>
                            <span className="mono whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                              {playlist.songCount} songs
                            </span>
                          </div>
                          <div className="mt-3 flex items-center gap-3 text-[11.5px] text-[var(--color-text-tertiary)]">
                            <span>{playlist.isPublic ? 'Public' : 'Private'}</span>
                            <span>Created {formatDate(playlist.createdAt)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
                <h3 className="text-[16px] font-medium text-[var(--color-text-primary)]">
                  Account notes
                </h3>
                <div className="mt-4 space-y-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                  <p>
                    The frontend currently stores your authenticated user locally and uses that token to call protected backend APIs.
                  </p>
                  <p>
                    Licensing requests and song downloads are integrated from the library page. This profile page surfaces the account state and playlist integration that already exist.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
                <h3 className="text-[16px] font-medium text-[var(--color-text-primary)]">
                  Next useful additions
                </h3>
                <div className="mt-4 space-y-3 text-[13px] text-[var(--color-text-secondary)]">
                  <p>Playlist creation and editing UI.</p>
                  <p>License request history.</p>
                  <p>Download history and expiring link management.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
