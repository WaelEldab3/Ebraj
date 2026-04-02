import { create } from 'zustand';

export const useUiStore = create((set) => ({
  isSidebarOpen: false,
  theme: 'light',

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  
  setTheme: (newTheme) => set({ theme: newTheme }),
}));
