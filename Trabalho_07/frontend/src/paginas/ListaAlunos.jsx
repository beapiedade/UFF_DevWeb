import { useQuery } from '@tanstack/react-query'; 
import { Link } from 'react-router-dom';
import useFetchWithAuth from '../hooks/useFetchWithAuth';
import useDeletarAluno from "../hooks/useDeletarAluno";

function ListaAlunos() {
  const deletarAluno = useDeletarAluno();
  const { fetchWithAuth } = useFetchWithAuth();
  const { data: alunos, isLoading, error } = useQuery(
    { queryKey: ['alunos'], 
      queryFn: async () => {
        const resp = await fetchWithAuth("http://localhost:8080/api/aluno", { method: "GET" });
        return resp.json(); 
      }
    });

  if (error) {return <p>{error.message}</p>;}
  if (isLoading) {return <p>Carregando...</p>;}

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
            <th></th>
          </tr>
        </thead>

        <tbody>
          {alunos?.map(aluno => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td><Link to={`/aluno/${aluno.id}`} className="link-aluno">{aluno.nome}</Link></td>
              <td>{aluno.curso}</td>
              <td>{aluno.ingresso}</td>
              <td><button
                  onClick={() => deletarAluno.mutate(aluno.id, {onError: (err) => alert(err.message),})}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaAlunos;