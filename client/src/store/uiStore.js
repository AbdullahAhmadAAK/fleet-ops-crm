import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUIStore = create(
  persist(
    (set) => ({
      // ─── Sidebar ──────────────────────────────────────────────────────
      sidebarOpen:   true,   // default open on desktop
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebar:    (open) => set({ sidebarOpen: open }),

      // ─── Theme ────────────────────────────────────────────────────────
      theme:     'light',   // 'light' | 'dark'
      setTheme:  (theme) => set({ theme }),
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name:    'fleet-crm-ui',
      storage: createJSONStorage(() => localStorage),
      // User preferences should survive browser restarts
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        theme:       state.theme,
      }),
    }
  )
);

export default useUIStore;