import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ─── Auth store ────────────────────────────────────────────────────────────
// Persists the access token and user object in sessionStorage (not localStorage)
// so the session ends when the browser tab closes — refresh token in httpOnly
// cookie handles silent re-auth across same-browser sessions.

const useAuthStore = create(
  persist(
    (set) => ({
      // ─── State ────────────────────────────────────────────────────────
      user:        null,   // { _id, name, email, role, clientId, avatar }
      accessToken: null,

      // ─── Actions ──────────────────────────────────────────────────────
      setAuth: ({ user, accessToken }) =>
        set({ user, accessToken }),

      setAccessToken: (accessToken) =>
        set({ accessToken }),

      setUser: (user) =>
        set({ user }),

      clearAuth: () =>
        set({ user: null, accessToken: null }),
    }),
    {
      name:    'fleet-crm-auth',
      storage: createJSONStorage(() => sessionStorage),
      // Only persist what's needed — don't persist stale state
      partialize: (state) => ({
        user:        state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);

export default useAuthStore;