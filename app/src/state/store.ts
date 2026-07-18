import { create } from 'zustand'
import type { CriteriaWeights } from '../lib/types'

interface AppState {
  chatOpen: boolean
  toggleChat: () => void
  selectedNodeId: string | null
  setSelectedNode: (id: string | null) => void
  /* live weights readout, updated by feedback so Fund Profile reflects changes */
  weights: CriteriaWeights | null
  setWeights: (w: CriteriaWeights) => void
  /* last learning note, shown as a toast after feedback */
  learningNote: string | null
  setLearningNote: (n: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  chatOpen: false,
  toggleChat: () => set((s) => ({ chatOpen: !s.chatOpen })),
  selectedNodeId: null,
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  weights: null,
  setWeights: (w) => set({ weights: w }),
  learningNote: null,
  setLearningNote: (n) => set({ learningNote: n }),
}))
