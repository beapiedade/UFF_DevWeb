import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";

const useRecuperarAlunoPorId = (id, removido = false) => {
  const { get } = useApi("aluno");

  return useQuery({
    queryKey: ["alunos", id],
    queryFn: () => get(id),
    enabled: !removido,

    onError: (error) => {
      let mensagem = "Erro ao recuperar aluno.";

      if (error instanceof Error && error.message) {
        mensagem = error.message;
      }

      alert(mensagem);
    },
  });
};

export default useRecuperarAlunoPorId;