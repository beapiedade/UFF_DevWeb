import { useQuery } from "@tanstack/react-query";

const recuperarAlunoPorId = async (id) => {
  const response = await fetch(`http://localhost:8080/api/aluno/${id}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

const useRecuperarAlunoPorId = (id, removido = false) => {
  return useQuery({
    queryKey: ["alunos", id],
    queryFn: () => recuperarAlunoPorId(id),
    enabled: !removido,
  });
};

export default useRecuperarAlunoPorId;