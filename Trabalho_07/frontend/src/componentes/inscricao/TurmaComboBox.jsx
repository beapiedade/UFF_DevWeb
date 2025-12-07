import { useQuery } from "@tanstack/react-query";
import useInscricaoStore from "../../stores/useInscricaoStore";
import useApi from "../../hooks/useApi";

function useTurmas() {
  const { getAll } = useApi("turma");
  return useQuery({
    queryKey: ["turmas"],
    queryFn: getAll,
  });
}

function TurmaComboBox() {
  const {
    data: turmas,
    isLoading: isLoadingTurmas,
    isError,
    error
  } = useTurmas();

  const disciplinaId = useInscricaoStore((s) => s.disciplinaId);
  const turmaId = useInscricaoStore((s) => s.turmaId);
  const setTurmaId = useInscricaoStore((s) => s.setTurmaId);

  const turmasFiltradas = turmas?.filter(
    (t) => t.disciplina.id == disciplinaId
  );

  const handleTurmaChange = (e) => {
    setTurmaId(e.target.value.toString());
  };

  if (isLoadingTurmas) {
    return <p>Carregando turmas...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar turmas: {error.message}</p>;
  }

  return (
    <div className='busca-header'>
      <h3>Turma</h3>
      <select
        className="combo-box"
        id="turma-select"
        value={turmaId || ""}
        onChange={handleTurmaChange}
        disabled={disciplinaId == null}
      >
        <option value="">Selecione uma Turma</option>

        {turmasFiltradas?.map((turma) => (
          <option key={turma.id} value={turma.id}>
            {turma.id}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TurmaComboBox;
