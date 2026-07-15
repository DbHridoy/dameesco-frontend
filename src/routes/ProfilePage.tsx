import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Camera, Loader2, Lock, LogOut, Mail, MapPin, Pencil, Phone, Save, User2, X } from 'lucide-react'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'
import AuthModal from '@/components/ui/AuthModal'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setUser, signOut } from '@/features/auth/authSlice'
import {
  api,
  useGetCurrentUserQuery,
  useGetMyPlaylistsQuery,
  useUpdateCurrentUserMutation,
} from '@/services/api'

export default function ProfilePage() {
  const [authOpen, setAuthOpen] = useState(false)
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const [, navigate] = useLocation()
  const { data: currentUser } = useGetCurrentUserQuery(undefined, { skip: !user })
  const [updateCurrentUser, { isLoading: savingProfile }] = useUpdateCurrentUserMutation()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [avatar, setAvatar] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement | null>(null)
  const {
    data: playlists = [],
    isLoading: loadingPlaylists,
  } = useGetMyPlaylistsQuery(undefined, { skip: !user })

  const profile = user ? (currentUser ?? user) : null
  const isPaidUser = profile?.subscriptionStatus === 'paid'
  const accessLabel = isPaidUser ? 'Paid user' : 'Free user'
  const planLabel =
    profile?.subscriptionPlan === 'premium'
      ? 'Studio'
      : profile?.subscriptionPlan === 'standard'
        ? 'Starter'
        : profile?.subscriptionPlan === 'custom'
          ? 'Custom'
          : 'Free'

  useEffect(() => {
    if (!currentUser) return
    dispatch(setUser(currentUser))
  }, [currentUser, dispatch])

  useEffect(() => {
    if (!profile) return
    setName(profile.name ?? '')
    setPhone(profile.phone ?? '')
    setAddress(profile.address ?? '')
    setAvatar(profile.avatar ?? '')
  }, [profile])

  const saveProfile = async () => {
    setMessage('')
    setError('')

    try {
      const updatedUser = await updateCurrentUser({
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        avatar: avatar.trim(),
      }).unwrap()
      dispatch(setUser(updatedUser))
      setMessage('Profile updated successfully.')
      setIsEditing(false)
    } catch (apiError: any) {
      setError(apiError?.data?.message ?? 'Unable to update profile')
    }
  }

  const resetForm = () => {
    if (!profile) return
    setName(profile.name ?? '')
    setPhone(profile.phone ?? '')
    setAddress(profile.address ?? '')
    setAvatar(profile.avatar ?? '')
    setMessage('')
    setError('')
    setIsEditing(false)
  }

  const handleAvatarFile = (file: File | null) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setAvatar(typeof reader.result === 'string' ? reader.result : '')
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const fieldClass = (editable = true) =>
    `h-10 w-full rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-background)] px-3 text-[13px] outline-none ${
      isEditing && editable
        ? 'text-[var(--color-text-primary)] focus:border-[var(--color-accent)]'
        : 'cursor-default text-[var(--color-text-tertiary)]'
    }`

  const handleSignOut = () => {
    dispatch(signOut())
    dispatch(api.util.resetApiState())
    navigate('/')
  }

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

      {!profile ? (
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
	          <div className="mx-auto max-w-3xl px-6">
	            <div className="space-y-4">
	              <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
	                <div className="flex items-start justify-between gap-4">
	                  <div className="flex items-start gap-4">
	                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-default)] bg-[var(--color-accent-soft)]">
	                      {profile.avatar ? (
                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User2 className="h-5 w-5 text-[var(--color-accent)]" />
                        )}
	                    </div>
                    <div>
                      <h2 className="text-[20px] font-medium text-[var(--color-text-primary)]">
	                        {profile.name}
                      </h2>
                      <p className="mt-1 text-[14px] text-[var(--color-text-secondary)]">
	                        {profile.email}
                      </p>
	                      <div className="mt-3 inline-flex items-center rounded-md border border-[var(--color-border-default)] px-2.5 py-1">
	                        <span className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
		                          {profile.role}
	                        </span>
	                      </div>
                        <div
                          className={`mt-2 inline-flex items-center rounded-md border px-2.5 py-1 ${
                            isPaidUser
                              ? 'border-green-400/25 bg-green-500/10 text-green-300'
                              : 'border-[var(--color-border-default)] bg-white/[0.03] text-[var(--color-text-secondary)]'
                          }`}
                        >
                          <span className="mono text-[10px] uppercase tracking-[0.16em]">
                            {accessLabel}
                          </span>
                        </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
	                    variant="ghost"
	                    onClick={handleSignOut}
	                  >
                    <LogOut className="mr-1.5 h-3.5 w-3.5" />
                    Sign out
                  </Button>
	                </div>
	              </div>

                <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
	                  <div className="flex items-center justify-between gap-4">
	                    <div>
	                      <h3 className="text-[16px] font-medium text-[var(--color-text-primary)]">
	                        Basic information
	                      </h3>
	                      <p className="mt-1 text-[13px] text-[var(--color-text-tertiary)]">
	                        {isEditing
                            ? 'Update your profile details. Email cannot be changed here.'
                            : 'View your profile details. Use edit to make changes.'}
	                      </p>
	                    </div>
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" onClick={resetForm}>
                            <X className="mr-1.5 h-3.5 w-3.5" />
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={saveProfile}
                            disabled={!name.trim() || savingProfile}
                          >
                            {savingProfile ? (
                              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Save className="mr-1.5 h-3.5 w-3.5" />
                            )}
                            Save
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setMessage('')
                            setError('')
                            setIsEditing(true)
                          }}
                        >
                          <Pencil className="mr-1.5 h-3.5 w-3.5" />
                          Edit
                        </Button>
                      )}
	                  </div>

	                  <div className="mt-6 grid gap-5 sm:grid-cols-[140px_1fr]">
	                    <div className="space-y-3">
	                      <button
                          type="button"
                          disabled={!isEditing}
                          onClick={() => avatarInputRef.current?.click()}
                          className={`group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-default)] bg-[var(--color-background)] ${
                            isEditing ? 'cursor-pointer hover:border-[var(--color-accent)]' : 'cursor-default'
                          }`}
                          aria-label="Upload profile avatar"
                        >
	                        {avatar.trim() ? (
	                          <img
	                            src={avatar}
	                            alt={name || 'Profile avatar'}
	                            className="h-full w-full object-cover"
                          />
	                        ) : (
	                          <User2 className="h-8 w-8 text-[var(--color-accent)]" />
	                        )}
                          {isEditing ? (
                            <span className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity group-hover:opacity-100">
                              <Camera className="h-5 w-5 text-white" />
                            </span>
                          ) : null}
	                      </button>
                        <input
                          ref={avatarInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => handleAvatarFile(event.target.files?.[0] ?? null)}
                        />
                        <p className="text-[12px] leading-relaxed text-[var(--color-text-tertiary)]">
                          {isEditing ? 'Click avatar to upload an image.' : 'Profile avatar'}
                        </p>
	                    </div>

	                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-background)] px-3 py-3 sm:col-span-2">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="text-[12px] text-[var(--color-text-secondary)]">
                              Subscription
                            </div>
                            <div className="mt-1 text-[14px] text-[var(--color-text-primary)]">
                              {planLabel} plan
                            </div>
                          </div>
                          <span
                            className={`mono inline-flex w-fit rounded-md px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${
                              isPaidUser
                                ? 'bg-green-500/12 text-green-300'
                                : 'bg-white/[0.04] text-[var(--color-text-tertiary)]'
                            }`}
                          >
                            {accessLabel}
                          </span>
                        </div>
                      </div>

	                      <label className="block">
                        <span className="mb-2 flex items-center gap-1.5 text-[12px] text-[var(--color-text-secondary)]">
                          <User2 className="h-3.5 w-3.5" />
                          Name
                        </span>
	                        <input
	                          type="text"
	                          value={name}
                            disabled={!isEditing}
	                          onChange={(event) => setName(event.target.value)}
	                          className={fieldClass()}
	                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 flex items-center gap-1.5 text-[12px] text-[var(--color-text-secondary)]">
                          <Mail className="h-3.5 w-3.5" />
                          Email
                        </span>
                        <input
	                          type="email"
	                          value={profile.email}
	                          disabled
	                          className={fieldClass(false)}
	                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 flex items-center gap-1.5 text-[12px] text-[var(--color-text-secondary)]">
                          <Phone className="h-3.5 w-3.5" />
                          Phone number
                        </span>
                        <input
	                          type="tel"
	                          value={phone}
                            disabled={!isEditing}
	                          onChange={(event) => setPhone(event.target.value)}
	                          placeholder="+1 555 0100"
	                          className={fieldClass()}
	                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 flex items-center gap-1.5 text-[12px] text-[var(--color-text-secondary)]">
                          <MapPin className="h-3.5 w-3.5" />
                          Address
                        </span>
                        <input
	                          type="text"
	                          value={address}
                            disabled={!isEditing}
	                          onChange={(event) => setAddress(event.target.value)}
	                          placeholder="City, country, or full address"
	                          className={fieldClass()}
	                        />
                      </label>
                    </div>
                  </div>

                  {message ? (
                    <p className="mt-4 text-[12px] text-green-400">{message}</p>
                  ) : null}
                  {error ? (
                    <p className="mt-4 text-[12px] text-red-400">{error}</p>
                  ) : null}
                </div>

                <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-[16px] font-medium text-[var(--color-text-primary)]">
                        Your playlists
                      </h3>
                      <p className="mt-1 text-[13px] text-[var(--color-text-tertiary)]">
                        Saved playlists linked to your account.
                      </p>
                    </div>
                    <span className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                      {loadingPlaylists ? 'Loading' : `${playlists.length} total`}
                    </span>
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
