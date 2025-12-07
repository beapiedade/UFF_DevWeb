import { create } from "zustand";

const useCadastroStore = create((set) => ({
  cadastroInvalido: false,
  msg: "",

  setCadastroInvalido: (valor) =>
    set(() => ({ cadastroInvalido: valor })),

  setMsg: (novaMsg) =>
    set(() => ({ msg: novaMsg })),
}));

export default useCadastroStore;