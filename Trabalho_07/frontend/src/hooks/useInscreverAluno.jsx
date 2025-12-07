import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";

const useCadastrarInscricao = () => {
  const queryClient = useQueryClient();
  const { criar } = useApi("inscricao");

  return useMutation({
    mutationFn: criar,

    onSuccess: (inscricaoCriada) => {
      queryClient.invalidateQueries({
        queryKey: ["alunosInscritos", inscricaoCriada.turma.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["turma", inscricaoCriada.turma.id],
      });
      queryClient.invalidateQueries(["alunos"]);
    },

    onError: (error) => {
      let mensagem = "Erro ao cadastrar inscrição.";

      if (error instanceof Error && error.message) {
        mensagem = error.message;
      }

      alert(mensagem);
    },
  });
};

export default useCadastrarInscricao;
