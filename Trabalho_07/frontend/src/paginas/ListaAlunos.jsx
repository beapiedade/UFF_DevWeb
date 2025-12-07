import { useQuery } from '@tanstack/react-query'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useFetchWithAuth from '../hooks/useFetchWithAuth';
import useDeletarAluno from "../hooks/useDeletarAluno";
  
function ListaAlunos() {
  const navigate = useNavigate();
  const deletarAluno = useDeletarAluno();
  const { fetchWithAuth } = useFetchWithAuth();
  const { data: alunos, isLoading, error } = useQuery(
    { queryKey: ['alunos'], 
      queryFn: async () => {
        const resp = await fetchWithAuth("http://localhost:8080/api/aluno", { method: "GET" });
        if (resp.status === 401) {
          alert("Erro ao buscar alunos: Necessário estar autenticado para acessar este recurso.");
          navigate("/login");
        }
        return resp.json(); 
      },
    });

  const handleDelete = (id) => {
    deletarAluno.mutate(id, {
      onSuccess: () => {
        alert("Aluno removido com sucesso!");
      },
      onError: (error) => {
        if (error.message === "401") {
          alert("Erro ao excluir: Necessário estar autenticado para acessar este recurso.");
          navigate("/login");
        } else if (error.message === "403") {
          alert("Erro ao excluir: Você não tem permissão para acessar este recurso.");
        } else {
          alert("Erro ao excluir aluno: " + error.message);
        }
      }
    });
  };

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
                  onClick={() => handleDelete(aluno.id)}>
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