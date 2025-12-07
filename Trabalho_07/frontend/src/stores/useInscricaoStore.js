import { create } from "zustand";

const useInscricaoStore = create((set) => ({
  disciplinaId: null,
  turmaId: null,
  alunoId: null,

  page: 1,
  pageSize: 5,
  searchTerm: "",

  setDisciplinaId: (id) =>
    set((s) => ({
      disciplinaId: id,
      turmaId: null,
      alunoId: null,
      page: 1,
      searchTerm: "",
    })),

  setTurmaId: (id) =>
    set((s) => ({
      turmaId: id,
      alunoId: null,
      page: 1,
      searchTerm: "",
    })),

  setAlunoId: (id) => set({ alunoId: id }),
  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size, page: 1 }),
  setSearchTerm: (term) => set({ searchTerm: term, page: 1 }),

  resetAll: () =>
    set({
      disciplinaId: null,
      turmaId: null,
      alunoId: null,
      page: 1,
      pageSize: 5,
      searchTerm: "",
    }),
}));

export default useInscricaoStore;