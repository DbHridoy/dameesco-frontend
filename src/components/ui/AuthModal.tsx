import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useLoginMutation, useRegisterMutation } from '@/services/api'
import { useAppDispatch } from '@/hooks/redux'
import { setCredentials } from '@/features/auth/authSlice'

type AuthModalProps = {
  open: boolean
  onClose: () => void
  title?: string
}

export default function AuthModal({
  open,
  onClose,
  title = 'Sign in to continue',
}: AuthModalProps) {
  const dispatch = useAppDispatch()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [login, { isLoading: loggingIn }] = useLoginMutation()
  const [register, { isLoading: registering }] = useRegisterMutation()

  useEffect(() => {
    if (open) {
      setError('')
    }
  }, [open, mode])

  if (!open) return null

  const isLoading = loggingIn || registering

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    try {
      const data =
        mode === 'login'
          ? await login({ email, password }).unwrap()
          : await register({ name, email, password }).unwrap()

      dispatch(setCredentials(data))
      onClose()
    } catch (apiError: any) {
      setError(apiError?.data?.message ?? 'Authentication failed')
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-md text-[var(--color-text-tertiary)] hover:bg-white/[0.04] hover:text-[var(--color-text-primary)]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          <h2 className="text-[18px] font-medium text-[var(--color-text-primary)]">
            {title}
          </h2>
          <p className="mt-2 text-[13px] text-[var(--color-text-secondary)]">
            {mode === 'login'
              ? 'Use your account to request licenses and downloads.'
              : 'Create an account to access licenses and downloads.'}
          </p>

          <div className="mt-5 flex gap-2 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-background)] p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 rounded-md px-3 py-2 text-[12px] transition-colors ${
                mode === 'login'
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'text-[var(--color-text-secondary)]'
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 rounded-md px-3 py-2 text-[12px] transition-colors ${
                mode === 'register'
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'text-[var(--color-text-secondary)]'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {mode === 'register' ? (
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full name"
                className="w-full h-10 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-background)] px-3 text-[13px] text-[var(--color-text-primary)] outline-none"
              />
            ) : null}
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="w-full h-10 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-background)] px-3 text-[13px] text-[var(--color-text-primary)] outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="w-full h-10 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-background)] px-3 text-[13px] text-[var(--color-text-primary)] outline-none"
            />

            {error ? (
              <p className="text-[12px] text-red-400">{error}</p>
            ) : null}

            <Button
              type="submit"
              size="sm"
              disabled={
                isLoading ||
                !email.trim() ||
                !password.trim() ||
                (mode === 'register' && !name.trim())
              }
              className="w-full justify-center"
            >
              {isLoading
                ? 'Please wait...'
                : mode === 'login'
                  ? 'Sign in'
                  : 'Create account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
