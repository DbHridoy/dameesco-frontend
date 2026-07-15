import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const STORAGE_KEY = 'sunar_frontend_auth'

type AuthUser = {
  _id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
  phone?: string
  address?: string
  avatar?: string
  subscriptionStatus?: 'free' | 'paid'
  subscriptionPlan?: 'free' | 'standard' | 'premium' | 'custom'
}

type AuthState = {
  accessToken: string
  refreshToken: string
  user: AuthUser | null
}

const readPersistedAuth = (): AuthState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { accessToken: '', refreshToken: '', user: null }
    }
    const parsed = JSON.parse(raw)
    return {
      accessToken: parsed.accessToken ?? '',
      refreshToken: parsed.refreshToken ?? '',
      user: parsed.user ?? null,
    }
  } catch {
    return { accessToken: '', refreshToken: '', user: null }
  }
}

const persist = (state: AuthState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore storage failures
  }
}

const clearPersisted = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore storage failures
  }
}

const initialState: AuthState =
  typeof window === 'undefined'
    ? { accessToken: '', refreshToken: '', user: null }
    : readPersistedAuth()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
        user: AuthUser
      }>,
    ) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
      persist(state)
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
      persist(state)
    },
    signOut: (state) => {
      state.accessToken = ''
      state.refreshToken = ''
      state.user = null
      clearPersisted()
    },
  },
})

export const { setCredentials, setUser, signOut } = authSlice.actions
export default authSlice.reducer
