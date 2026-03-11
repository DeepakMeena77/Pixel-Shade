import { create } from 'zustand'

export const useStore = create((set) => ({
    isMenuOpen: false,
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    closeMenu: () => set({ isMenuOpen: false }),
    // Mock session/contact state
    contactFormSubmitted: false,
    setContactFormSubmitted: (status) => set({ contactFormSubmitted: status })
}))
