import { create } from "zustand";

const useLoginStore = create((set) => ({
  loginInvalido: false,
  msg: "",

  setLoginInvalido: (novoValorLoginInvalido) =>
    set(() => ({ loginInvalido: novoValorLoginInvalido })),

  setMsg: (novaMsg) =>
    set(() => ({ msg: novaMsg })),
}));

export default useLoginStore;