import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';

const fetchTurma = async ({ queryKey }) => {
  const [_key, id] = queryKey; 
  const response = await fetch(`/api/turma/${id}`);
  if (!response.ok) {
    throw new Error(`ERRO HTTP: ${response.status}`);
  }
  return response.json();
};

function TurmaPage() {
  const { id } = useParams();
  const { get } = useApi("turma");
  const { data: turma, isLoading, error } = useQuery({ queryKey: ['turma', id], queryFn: () => get(id), enabled: !!id }); 

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!turma) return <p>Turma não encontrada.</p>;

  return (
    <div>
      <h2>{turma.id} - {turma.disciplina.nome}</h2>
      <p><strong>Período:</strong> {turma.ano}/{turma.periodo}</p>
      <p><strong>Professor:</strong> {turma.professor.nome}</p>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Curso</th>
          </tr>
        </thead>
        <tbody>
          {turma.inscricoes && turma.inscricoes.length > 0 ? (
            turma.inscricoes.map(inscricao => (
              <tr key={inscricao.id}>
                <td>{inscricao.aluno.nome}</td>
                <td>{inscricao.aluno.curso}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Sem alunos inscritos.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TurmaPage;