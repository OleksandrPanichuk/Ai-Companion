import { create } from 'zustand'


interface UseProModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}


export const useProModal = create<UseProModalStore>()(set => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true })
}))