// src/utils/useKanban.ts



import {create}  from 'zustand'

interface Card {
  id: string;
  title: string;
}

interface KanbanState {
  columns: {
    todo: Card[];
    inProgress: Card[];
    done: Card[];
  };
  addCard: (column: keyof KanbanState['columns'], card: Card) => void;
  deleteCard: (column: keyof KanbanState['columns'], cardId: string) => void;
  updateCardTitle: (column: keyof KanbanState['columns'], cardId: string, title: string) => void;
  moveCard: (from: keyof KanbanState['columns'], to: keyof KanbanState['columns'], cardId: string) => void;
}

export const useKanban = create<KanbanState>((set) => ({
  columns: {
    todo: [],
    inProgress: [],
    done: [],
  },
  addCard: (column, card) => set((state) => ({
    columns: {
      ...state.columns,
      [column]: [...state.columns[column], card],
    }
  })),
  deleteCard: (column, cardId) => set((state) => ({
    columns: {
      ...state.columns,
      [column]: state.columns[column].filter(card => card.id !== cardId),
    }
  })),
  updateCardTitle: (column, cardId, title) => set((state) => ({
    columns: {
      ...state.columns,
      [column]: state.columns[column].map(card =>
        card.id === cardId ? { ...card, title } : card
      ),
    }
  })),
  moveCard: (from, to, cardId) => set((state) => {
    const card = state.columns[from].find(card => card.id === cardId);
    if (card) {
      const newFromColumn = state.columns[from].filter(card => card.id !== cardId);
      const newToColumn = [...state.columns[to], card];
      return {
        columns: {
          ...state.columns,
          [from]: newFromColumn,
          [to]: newToColumn,
        }
      };
    }
    return state;
  }),
}));
