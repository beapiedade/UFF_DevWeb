import { useQuery } from '@tanstack/react-query'; 
import { Link } from 'react-router-dom';
import useFetchWithAuth from '../hooks/useFetchWithAuth';
import useTokenStore from '../stores/useTokenStore';

function ListaCadastros() {
 const tokenResponse = useTokenStore((s) => s.tokenResponse);
 const role = useTokenStore((s) => s.role);
  const { fetchWithAuth } = useFetchWithAuth();
  const { data: usuarios, isLoading, error } = useQuery({
    queryKey: ["usuarios"],
    queryFn: async () => {
      const resp = await fetchWithAuth("http://localhost:8080/api/usuario", { method: "GET" });
      return resp.json(); 
    }
  })

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Cadastros</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Permissão</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaCadastros;