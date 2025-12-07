import { useForm } from "react-hook-form";
import useInscricaoStore from "../stores/useInscricaoStore";
import DisciplinaComboBox from "./inscricao/DisciplinaComboBox";
import TurmaComboBox from "./inscricao/TurmaComboBox";
import AlunoComboBox from "./inscricao/AlunoComboBox";
import useInscreverAluno from "../hooks/useInscreverAluno";

const InscricaoForm = () => {
  const disciplinaId = useInscricaoStore((state) => state.disciplinaId);
  const turmaId = useInscricaoStore((state) => state.turmaId);
  const alunoId = useInscricaoStore((state) => state.alunoId);
  const setAlunoId = useInscricaoStore((state) => state.setAlunoId);
  const inscreverAluno = useInscreverAluno();

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  const onSubmit = () => {
    if (!disciplinaId) return alert("Selecione uma disciplina.");
    if (!turmaId) return alert("Selecione uma turma.");
    if (!alunoId) return alert("Selecione um aluno para inscrever.");

    const inscricaoPayload = {
      alunoId: alunoId,
      turmaId: turmaId,
      dataHora: new Date().toISOString().split("T")[0]
    };

    inscreverAluno.mutate(inscricaoPayload, {
      onSuccess: () => {
        alert("Aluno inscrito com sucesso!");
        setAlunoId(null);
        reset();
      },
      onError: (err) => {
        console.error(err);
        alert("Erro ao inscrever aluno: " + err.message);
      }
    });
  };

  return (
    <div>
      <h2>Inscrição de Aluno em Turma</h2>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <fieldset>
          <DisciplinaComboBox />
          <TurmaComboBox />
          <AlunoComboBox />

          <button type="submit" disabled={isSubmitting}>
            Concluir
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default InscricaoForm;
