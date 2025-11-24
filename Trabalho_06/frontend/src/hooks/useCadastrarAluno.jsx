import { useMutation, useQueryClient } from "@tanstack/react-query";

const cadastrarAluno = async (aluno) => {
  const response = await fetch("http://localhost:8080/api/aluno", {
    method: "POST",
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

const useCadastrarAluno = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: cadastrarAluno,
    onSuccess: (aluno) => {
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
      return aluno;
    },
  });

  return mutate;
};

export default useCadastrarAluno;