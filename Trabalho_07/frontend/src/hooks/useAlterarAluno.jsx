import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";

const useAlterarAluno = () => {
  const { alterar } = useApi("aluno");
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: alterar,

    onSuccess: (aluno) => {
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
      return aluno;
    },

    onError: (error) => {
      let mensagem = "Erro ao alterar aluno.";

      if (error instanceof Error && error.message) {
        mensagem = error.message;
      }

      alert(mensagem);
    }
  });

  return mutate;
};

export default useAlterarAluno;
