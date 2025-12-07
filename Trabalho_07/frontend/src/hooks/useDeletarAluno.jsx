import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetchWithAuth from "./useFetchWithAuth";

const useDeletarAluno = () => {
  const { fetchWithAuth } = useFetchWithAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const resp = await fetchWithAuth(`http://localhost:8080/api/aluno/${id}`, {
        method: "DELETE",
      });

      if (resp.status === 403) {
        throw new Error("Necessário estar autenticado para acessar este recurso.");
      }

      if (!resp.ok) {
        throw new Error("Erro ao excluir aluno.");
      }

      return true;
    },

    onSuccess: () => {
      qc.invalidateQueries(["alunos"]);
    }
  });
};

export default useDeletarAluno;