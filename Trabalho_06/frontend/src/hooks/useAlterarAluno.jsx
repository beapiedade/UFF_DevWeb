import { useMutation, useQueryClient } from "@tanstack/react-query";

const alterarAluno = async (aluno) => {
  const response = await fetch(`http://localhost:8080/api/aluno/${aluno.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "Application/json"
    },
    body: JSON.stringify(aluno)
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

const useAlterarAluno = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: alterarAluno,
    onSuccess: (aluno) => {
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
      return aluno;
    },
  });

  return mutate;
};

export default useAlterarAluno;