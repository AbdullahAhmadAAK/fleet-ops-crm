import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  // ─── State ────────────────────────────────────────────────────────────
  unreadCount: 0,
  sseConnected: false,

  // ─── Actions ──────────────────────────────────────────────────────────
  setUnreadCount:  (count) => set({ unreadCount: count }),
  incrementUnread: ()      => set((s) => ({ unreadCount: s.unreadCount + 1 })),
  resetUnread:     ()      => set({ unreadCount: 0 }),
  setSseConnected: (val)   => set({ sseConnected: val }),
}));

export default useNotificationStore;