import { useMutation } from "@tanstack/react-query";
import useFetchWithAuth from "./useFetchWithAuth";

const useCadastrarUsuario = (role) => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useMutation({
    mutationFn: async (novoUsuario) => {

      const resp = await fetchWithAuth(
        "http://localhost:8080/api/usuario/" + role,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novoUsuario),
        }
      );

      if (!resp.ok) {
        const erro = await resp.json().catch(() => null);

        let mensagem = "Erro ao cadastrar usuário.";

        if (erro && typeof erro === "object") {
          mensagem = Object.values(erro).join("\n");
        }

        if (erro?.mensagem) {
          mensagem = erro.mensagem;
        }

        throw new Error(mensagem);
      }

      return resp.json();
    }
  });
};

export default useCadastrarUsuario;
