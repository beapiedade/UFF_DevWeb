import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";

const useCadastrarAluno = () => {
  const { criar } = useApi("aluno");
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: criar,

    onSuccess: (aluno) => {
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
      return aluno;
    },

    onError: (error) => {
      let mensagem = "Erro ao cadastrar aluno.";

      if (error instanceof Error && error.message) {
        mensagem = error.message;
      }

      alert(mensagem);
    }
  });

  return mutate;
};

export default useCadastrarAluno;
