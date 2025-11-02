import { useQuery } from '@tanstack/react-query'; 

const fetchAlunos = async () => {
  const response = await fetch('/api/aluno');
  if (!response.ok) {
    throw new Error(`ERRO HTTP: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

function AlunosLista() {
  const { data: alunos, isLoading, error } = useQuery({ queryKey: ['alunos'], queryFn: fetchAlunos });
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Alunos</h2>
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
              <td>{aluno.nome}</td>
              <td>{aluno.curso}</td>
              <td>{aluno.ingresso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlunosLista;