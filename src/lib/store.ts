import { create } from 'zustand';

interface Store {
  answers: Record<string, string>;
  currentQuestionId: string;
  setAnswer: (questionId: string, answer: string) => void;
  setCurrentQuestionId: (questionId: string) => void;
  reset: () => void;
}

export const useStore = create<Store>((set) => ({
  answers: {},
  currentQuestionId: 'q1',
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  setCurrentQuestionId: (questionId) =>
    set({ currentQuestionId: questionId }),
  reset: () => set({ answers: {}, currentQuestionId: 'q1' }),
})); 