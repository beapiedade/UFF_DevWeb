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

      
      if (!resp.ok) {
        throw new Error(resp.status);
      }

      return true;
    },

    onSuccess: () => {
      qc.invalidateQueries(["alunos"]);
    }
  });
};

export default useDeletarAluno;