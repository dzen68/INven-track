import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  setSession: (session: Session | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,

  setSession: (session) => set({ session, user: session?.user ?? null, loading: false }),

  signIn: async (email, password) => {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      const mockSession = { user: { id: 'mock-1', email } } as unknown as Session
      set({ session: mockSession, user: mockSession.user })
      return { error: null }
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  },

  signUp: async (email, password, fullName) => {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      return { error: null } // Mock success
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    })
    return { error: error?.message ?? null }
  },

  signOut: async () => {
    if (import.meta.env.VITE_SUPABASE_URL) {
      await supabase.auth.signOut()
    }
    set({ user: null, session: null })
  },
}))
