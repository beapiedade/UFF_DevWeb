import React, { useState, useEffect } from 'react';
import Paginacao from '../componentes/Paginacao';

const ALUNOS_POR_PAGINA = 5;

function TurmasBusca() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allTurmas, setAllTurmas] = useState([]);
  const [filteredTurmas, setFilteredTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [loadingTurmas, setLoadingTurmas] = useState(true);
  const [loadingDetalhes, setLoadingDetalhes] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchAllTurmas() {
      try {
        const response = await fetch('/api/turma');
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        setAllTurmas(data);
      } catch (e) {
        console.error("ERRO AO BUSCAR TODAS AS TURMAS:", e);
        setError("Não foi possível carregar os dados das turmas.");
      } finally {
        setLoadingTurmas(false);
      }
    }
    fetchAllTurmas();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredTurmas([]);
      setSelectedTurma(null); 
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = allTurmas.filter(turma =>
      turma.disciplina.nome.toLowerCase().includes(lowerCaseQuery)
    );
    
    setFilteredTurmas(filtered);
    setSelectedTurma(null); 
  }, [searchQuery, allTurmas]);

  const handleTurmaClick = async (turmaId) => {
    if (selectedTurma && selectedTurma.id === turmaId) return;

    setLoadingDetalhes(true);
    setSelectedTurma(null);
    setCurrentPage(1); 

    try {
      const response = await fetch(`/api/turma/${turmaId}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      setSelectedTurma(data);
    } catch (e) {
      console.error("ERRO AO BUSCAR DETALHES DA TURMA:", e);
      setError("Não foi possível carregar os detalhes da turma.");
    } finally {
      setLoadingDetalhes(false);
    }
  };

  const totalAlunos = selectedTurma?.inscricoes?.length || 0;
  const indexUltimoAluno = currentPage * ALUNOS_POR_PAGINA;
  const indexPrimeiroAluno = indexUltimoAluno - ALUNOS_POR_PAGINA;
  const alunosPaginados = selectedTurma?.inscricoes?.slice(
    indexPrimeiroAluno,
    indexUltimoAluno
  ) || [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loadingTurmas) return <p>A carregar dados base...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
       <div className='header'>
            <h2>Busca por Turmas</h2>
            <div className="search-bar">
                <label htmlFor="search">🔍︎</label>
                <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Digite o nome da disciplina..."
                />
            </div>
      </div>

      <div className="busca-container">
        <div className="lista-turmas-busca">
          {searchQuery && filteredTurmas.length === 0 && (
             <p>Nenhuma turma encontrada.</p>
          )}
          
          <ul className="lista-turmas">
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
                  {turma.disciplina.nome} ({turma.ano}/{turma.periodo})
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="detalhes-turma-alunos">
          {loadingDetalhes && <p>Carregando detalhes da turma...</p>}

          {selectedTurma && (
            <div id='busca-item'>
              <div className="turma-detalhes-header">
                <h3>{selectedTurma.disciplina.nome}</h3>
                <p>
                  <strong>Ano:</strong> {selectedTurma.ano} | 
                  <strong> Período:</strong> {selectedTurma.periodo} | 
                  <strong> Prof:</strong> {selectedTurma.professor.nome}
                </p>
              </div>

              <table className="alunos-tabela">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Aluno</th>
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
export default TurmasBusca;