import { useParams } from "react-router-dom";
import useRecuperarAlunoPorId from "../hooks/useRecuperarAlunoPorId";
import useAlunoStore from "../stores/useAlunoStore";
import { Navigate, useNavigate } from "react-router-dom";

const AlunoPage = () => {
  const { id } = useParams();
  const alunoSelecionado = useAlunoStore((state) => state.setAlunoSelecionado);
  const { data: aluno, isLoading, isError } = useRecuperarAlunoPorId(parseInt(id));
  const navigate = useNavigate();

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Ocorreu um erro ao carregar os dados do aluno.</p>;
  if (!aluno) return <p>Aluno não encontrado.</p>;

  const editar = (aluno) => {
    alunoSelecionado(aluno);
    navigate("/novo-aluno");
  };

  return (
    <div>
      <h2>PÁGINA DO ALUNO</h2>
      <p><strong>ID</strong> {aluno.id}</p>
      <p><strong>Nome completo</strong> {aluno.nome}</p>
      <p><strong>Curso</strong> {aluno.curso}</p>
      <p><strong>Email</strong> {aluno.email}</p>
      <p><strong>Data de ingresso</strong> {aluno.ingresso}</p>

      <button onClick={() => editar(aluno)}>Editar</button>
    </div>
  );
};

export default AlunoPage;