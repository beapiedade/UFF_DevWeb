import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TurmasView() {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchTurmas() {
      try {
        const response = await fetch('/api/turma');
        if (!response.ok) {
          throw new Error(`ERRO HTTP: ${response.status}`);
        }
        const data = await response.json();
        setTurmas(data);
      } catch (e) {
        console.error("ERRO NA BUSCA POR TURMAS:", e);
        setError("Não foi possível carregar as turmas.");
      } finally {
        setLoading(false);
      }
    }
    fetchTurmas();
  }, []); 

  const filteredTurmas = turmas.filter(turma =>
    turma.disciplina.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Turmas</h2>

      <ul className="lista-turmas">
        {filteredTurmas.length > 0 ? (
          filteredTurmas.map(turma => (
            <li key={turma.id}>
              <Link to={`/turmas/${turma.id}`}>
                {turma.disciplina.nome} ({turma.ano}/{turma.periodo})
              </Link>
            </li>
          ))
        ) : (
          <p>Nenhuma turma encontrada.</p>
        )}
      </ul>
    </div>
  );
}

export default TurmasView;