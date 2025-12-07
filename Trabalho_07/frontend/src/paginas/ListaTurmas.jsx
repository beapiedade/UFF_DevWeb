import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useApi from '../hooks/useApi';

function ListaTurmas() {
  const [searchQuery, setSearchQuery] = useState('');

  const { getAll } = useApi("turma");
  const { data: turmas, isLoading, error } = useQuery({ queryKey: ['turmas'], queryFn: getAll });

  const filteredTurmas = turmas
    ? turmas.filter(turma =>
        turma.disciplina.nome.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h2>Turmas</h2>

      <ul className="opcoes">
        {filteredTurmas.length > 0 ? (
          filteredTurmas.map(turma => (
            <li key={turma.id}>
              <Link to={`/turmas/${turma.id}`}>
                {turma.id} - {turma.disciplina.nome} ({turma.ano}/{turma.periodo})
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

export default ListaTurmas;