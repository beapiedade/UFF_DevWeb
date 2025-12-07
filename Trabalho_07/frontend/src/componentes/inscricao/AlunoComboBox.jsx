import { useQuery } from "@tanstack/react-query";
import useApi from "../../hooks/useApi";
import useInscricaoStore from "../../stores/useInscricaoStore";

function useAlunos() {
  const { getAll } = useApi("aluno");
  return useQuery({
    queryKey: ["alunos"],
    queryFn: getAll,
  });
};

function useTurmaSelecionada(turmaId) {
  const { get } = useApi("turma");

  return useQuery({
    queryKey: ["turma", turmaId],
    queryFn: () => get(turmaId),
    enabled: !!turmaId,
  });
}


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
