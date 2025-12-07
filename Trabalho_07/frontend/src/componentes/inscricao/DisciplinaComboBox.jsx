import { useQuery } from "@tanstack/react-query";
import useInscricaoStore from "../../stores/useInscricaoStore";
import useApi from "../../hooks/useApi";

function useDisciplinas() {
  const { getAll } = useApi("disciplina");
  return useQuery({
    queryKey: ["disciplinas"],
    queryFn: getAll,
  });
}

function DisciplinaComboBox() {
  const {
    data: disciplinas,
    isLoading: isLoadingDisciplinas,
    isError,
    error
  } = useDisciplinas();

  const disciplinaId = useInscricaoStore((s) => s.disciplinaId);
  const setDisciplinaId = useInscricaoStore((s) => s.setDisciplinaId);

  const handleDisciplinaChange = (e) => {
    setDisciplinaId(e.target.value);
  };

  if (isLoadingDisciplinas) {
    return <p>Carregando disciplinas...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar disciplinas: {error.message}</p>;
  }

  return (
    <div className='busca-header'>
      <h3>Disciplina</h3>
      <select
        className="combo-box"
        id="disciplina-select"
        value={disciplinaId || ""}
        onChange={handleDisciplinaChange}
      >
        <option value="">Selecione uma Disciplina</option>

        {disciplinas?.map((disciplina) => (
          <option key={disciplina.id} value={disciplina.id}>
            {disciplina.id} - {disciplina.nome}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DisciplinaComboBox;
