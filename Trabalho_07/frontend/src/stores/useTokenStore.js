import { create } from "zustand";

const useTokenStore = create((set) => ({
  tokenResponse: {
    token: "",
    idUsuario: 0,
    nome: "",
    role: ""
  },

  setTokenResponse: (novoTokenResponse) =>
    set(() => ({ tokenResponse: novoTokenResponse })),
}));

export default useTokenStore;