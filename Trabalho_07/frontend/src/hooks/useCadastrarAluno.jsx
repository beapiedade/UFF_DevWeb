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
  });

  return mutate;
};

export default useCadastrarAluno;
