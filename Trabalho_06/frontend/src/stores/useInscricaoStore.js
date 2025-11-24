import { create } from "zustand";

const useInscricaoStore = create((set) => ({
  disciplinaId: undefined,
  turmaId: undefined,
  alunoId: undefined,
  termoBusca: "",
  pagina: 0,

  setDisciplinaId: (id) =>
    set({
      disciplinaId: id,
      turmaId: undefined,
      alunoId: undefined,
      pagina: 0,
      termoBusca: "",
    }),

  setTurmaId: (id) =>
    set({
      turmaId: id,
      alunoId: undefined,
      pagina: 0,
      termoBusca: "",
    }),

  setAlunoId: (id) => set({ alunoId: id }),
  setTermoBusca: (termo) => set({ termoBusca: termo, pagina: 0 }),
  setPagina: (pagina) => set({ pagina: pagina }),
}));

export default useInscricaoStore;