import { useMutation, useQueryClient } from "@tanstack/react-query";

const cadastrarInscricao = async (inscricao) => {
  const response = await fetch("http://localhost:8080/api/inscricao", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(inscricao)
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
};

const useCadastrarInscricao = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cadastrarInscricao,

    onSuccess: (inscricaoCriada) => {
      queryClient.invalidateQueries({
        queryKey: ["alunosInscritos", inscricaoCriada.turma.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["turma", inscricaoCriada.turma.id],
      }); 
      queryClient.invalidateQueries(["alunos"]);
    },
  });
};

export default useCadastrarInscricao;
