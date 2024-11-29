import { create } from 'zustand';

interface SidebarState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set(() => ({ isSidebarOpen: false })),
  openSidebar: () => set(() => ({ isSidebarOpen: true })),
}));

export default useSidebarStore;
