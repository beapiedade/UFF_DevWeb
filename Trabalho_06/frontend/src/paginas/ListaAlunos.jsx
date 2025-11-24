import { useQuery } from '@tanstack/react-query'; 
import { Link } from 'react-router-dom';

const fetchAlunos = async () => {
  const response = await fetch('/api/aluno');
  if (!response.ok) {
    throw new Error(`ERRO HTTP: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

function ListaAlunos() {
  const { data: alunos, isLoading, error } = useQuery({ queryKey: ['alunos'], queryFn: fetchAlunos });
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Alunos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Curso</th>
            <th>Ingresso</th>
          </tr>
        </thead>

        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td><Link to={`/aluno/${aluno.id}`} className="link-aluno">{aluno.nome}</Link></td>
              <td>{aluno.curso}</td>
              <td>{aluno.ingresso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaAlunos;