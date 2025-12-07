import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import Paginacao from '../componentes/Paginacao';
import useFetchWithAuth from "../hooks/useFetchWithAuth";
import useTokenStore from '../stores/useTokenStore';

const ALUNOS_POR_PAGINA = 5;

function BuscaTurmas() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTurmaId, setSelectedTurmaId] = useState(null);

  const { fetchWithAuth } = useFetchWithAuth();
  const tokenResponse = useTokenStore((s) => s.tokenResponse);
  const isAuthenticated = tokenResponse.token !== "";

  const { data: allTurmas, isLoading: isLoadingTurmas, error: errorTurmas } = useQuery({ 
    queryKey: ['turmas'], 
    queryFn: async () => {
      const response = await fetchWithAuth(`http://localhost:8080/api/turma/`);
      const dados = await response.json();
      return dados || [];
    },
    enabled: isAuthenticated, 
    staleTime: 5 * 60 * 1000,
  });

  const { data: selectedTurma, isLoading: isLoadingDetalhes, error: errorDetalhes } = useQuery({ 
    queryKey: ['turma', selectedTurmaId], 
    queryFn: async () => {
      const response = await fetchWithAuth(`http://localhost:8080/api/turma/${selectedTurmaId}`);
      const dados = await response.json();
      return dados || [];
    },
    enabled: !!selectedTurmaId && isAuthenticated, 
  });

  const filteredTurmas = useMemo(() => {
    if (!searchQuery) {
      return []; 
    }
    if (!allTurmas) {
      return [];
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    return allTurmas.filter(turma =>
      turma.disciplina.nome.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery, allTurmas]); 

  const handleTurmaClick = (turmaId) => {
    if (selectedTurmaId === turmaId) return;
    setSelectedTurmaId(turmaId);
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalAlunos = selectedTurma?.inscricoes?.length || 0;
  const indexUltimoAluno = currentPage * ALUNOS_POR_PAGINA;
  const indexPrimeiroAluno = indexUltimoAluno - ALUNOS_POR_PAGINA;

  const alunosPaginados = selectedTurma?.inscricoes?.slice(
    indexPrimeiroAluno,
    indexUltimoAluno
  ) || [];

  const error = errorTurmas || errorDetalhes;

  if (!isAuthenticated) return <p>É necessário estar logado para acessar a Gerência de Turmas.</p>; 
  if (isLoadingTurmas) return <p>Carregando turmas...</p>;
  if (error) return <p>Erro ao carregar dados: {error.message || 'Erro desconhecido'}</p>;

  return (
    <div>
       <div className='busca-header'>
            <h2>Turmas</h2>
            <div className="busca-caixa">
                <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Digite o nome da disciplina"
                />
            </div>
      </div>

      <div className="busca-container">
        <div>
          {searchQuery && filteredTurmas.length === 0 && (
             <p>Nenhuma turma encontrada.</p>
          )}
          
          <ul className="opcoes">
            {filteredTurmas.map(turma => (
              <li 
                id='busca-item'
                key={turma.id}
                className={selectedTurma?.id === turma.id ? 'active' : ''}
              >
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTurmaClick(turma.id);
                  }}
                >
                  {turma.id} - {turma.disciplina.nome} ({turma.ano}/{turma.periodo})
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {isLoadingDetalhes && <p>Carregando detalhes da turma...</p>}

          {selectedTurma && (
            <div id='busca-item'>
              <div>
                <h3>{selectedTurma.id} - {selectedTurma.disciplina.nome}</h3>
                <p>
                  <strong>Ano:</strong> {selectedTurma.ano} | 
                  <strong> Período:</strong> {selectedTurma.periodo} | 
                  <strong> Prof:</strong> {selectedTurma.professor.nome}
                </p>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Curso</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {alunosPaginados.length > 0 ? (
                    alunosPaginados.map(inscricao => (
                      <tr key={inscricao.id}>
                        <td>{inscricao.aluno.id}</td>
                        <td>{inscricao.aluno.nome}</td>
                        <td>{inscricao.aluno.curso}</td>
                        <td>{inscricao.aluno.email}</td> 
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">Sem alunos inscritos nesta turma.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <Paginacao
                itemsPerPage={ALUNOS_POR_PAGINA}
                totalItems={totalAlunos}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default BuscaTurmas;