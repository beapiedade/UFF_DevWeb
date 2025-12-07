import { create } from "zustand";

const useAlunoStore = create((set) => ({
  alunoSelecionado: null,

  setAlunoSelecionado: (aluno) => set({ alunoSelecionado: aluno }),
}));
export default useAlunoStore;