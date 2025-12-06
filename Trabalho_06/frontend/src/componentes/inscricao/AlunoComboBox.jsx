import { useQuery } from "@tanstack/react-query";
import useInscricaoStore from "../../stores/useInscricaoStore";

const recuperarTurmaPorId = async (turmaId) => {
  const response = await fetch(`http://localhost:8080/api/turma/${turmaId}`);
  if (!response.ok) throw new Error(response.status);
  return await response.json();
};

const recuperarAlunos = async () => {
  const response = await fetch(`http://localhost:8080/api/aluno`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

function useAlunos() {
  return useQuery({
    queryKey: ["alunos"],
    queryFn: recuperarAlunos,
  });
};

function useTurmaSelecionada(turmaId) {
  return useQuery({
    queryKey: ["turma", turmaId],
    queryFn: () => recuperarTurmaPorId(turmaId),
    enabled: !!turmaId,
  });
};

function AlunoComboBox() {
  const turmaId = useInscricaoStore((s) => s.turmaId);
  const alunoId = useInscricaoStore((s) => s.alunoId);
  const setAlunoId = useInscricaoStore((s) => s.setAlunoId);

  const { data: turma } = useTurmaSelecionada(turmaId);
  const {
    data: alunos,
    isLoading: isLoadingAlunos,
    isError,
    error
  } = useAlunos();

  const alunosInscritosIds = turma?.inscricoes?.map((i) => i.aluno.id) || [];
  const alunosDisponiveis = alunos?.filter(
    (aluno) => !alunosInscritosIds.includes(aluno.id)
  );

  const handleAlunoChange = (e) => {
    setAlunoId(e.target.value);
  };

  if (isLoadingAlunos) {
    return <p>Carregando alunos...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar alunos: {error.message}</p>;
  }

  return (
    <div className='busca-header'>
      <h3>Aluno</h3>
      <select
        className="combo-box"
        id="aluno-select"
        value={alunoId || ""}
        onChange={handleAlunoChange}
        disabled={turmaId == null}
      >
        <option value="">Selecione um Aluno</option>

        {alunosDisponiveis?.map((aluno) => (
          <option key={aluno.id} value={aluno.id}>
            {aluno.id} - {aluno.nome}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AlunoComboBox;
