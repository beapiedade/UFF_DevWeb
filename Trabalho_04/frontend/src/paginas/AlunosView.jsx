import React, { useState, useEffect } from 'react';

function AlunosView() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const response = await fetch('/api/aluno'); 
        if (!response.ok) {
          throw new Error(`ERRO HTTP: ${response.status}`);
        }
        const data = await response.json();
        setAlunos(data);
      } catch (e) {
        console.error("ERRO NA BUSCA POR ALUNOS:", e);
        setError("Não foi possível carregar os alunos.");
      } finally {
        setLoading(false);
      }
    }
    fetchAlunos();
  }, []);

  if (loading) return <p>Carregando...</p>;
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

export default AlunosView;