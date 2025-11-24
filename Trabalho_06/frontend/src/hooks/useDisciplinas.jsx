import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const recuperarDisciplinas = async () => {
  const response = await fetch(`http://localhost:8080/api/disciplina`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

const useDisciplinas = () =>
  useQuery({
    queryKey: ["disciplinas"],
    queryFn: () => recuperarDisciplinas(),
    select: (data) => data.data,
  });

export default useDisciplinas;