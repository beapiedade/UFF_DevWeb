import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TurmaView() {
  const [turma, setTurma] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();

  useEffect(() => {
    async function fetchTurma() {
      try {
        const response = await fetch(`/api/turma/${id}`);
        if (!response.ok) {
          throw new Error(`ERRO HTTP: ${response.status}`);
        }
        const data = await response.json();
        setTurma(data);
      } catch (e) {
        console.error("ERRO AO BUSCAR DETALHES DA TURMA:", e);
        setError("Não foi possível carregar os detalhes da turma.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchTurma();
    }
  }, [id]); 

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!turma) return <p>Turma não encontrada.</p>;

  return (
    <div>
      <h2>{turma.disciplina.nome}</h2>
      <p><strong>Período:</strong> {turma.ano}/{turma.periodo}</p>
      <p><strong>Professor:</strong> {turma.professor.nome}</p>

      <table>
        <thead>
          <tr>
            <th>Aluno</th>
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

export default TurmaView;