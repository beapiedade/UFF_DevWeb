import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchTurmas = async () => {
  const res = await fetch('/api/turma');
  if (!res.ok) {
    throw new Error('Não foi possível carregar as turmas.');
  }
  return res.json();
};

const fetchTurma = async ({ queryKey }) => {
  const [_key, turmaId] = queryKey; 
  if (!turmaId) return null;
  
  const res = await fetch(`/api/turma/${turmaId}`);
  if (!res.ok) {
    throw new Error(`Não foi possível carregar os detalhes da turma.`);
  }
  return res.json();
};

const getGrupoFromStorage = (turmaId) => {
  if (!turmaId) return new Set();

  const data = localStorage.getItem(turmaId);
  try {
    const ids = data ? JSON.parse(data) : [];
    return new Set(ids);
  } catch (e) {
    console.error("Falha ao ler o LocalStorage:", e);
    return new Set();
  }
};

const saveGrupoToStorage = (turmaId, grupoSet) => {
  if (!turmaId) return;
  const data = JSON.stringify(Array.from(grupoSet));
  localStorage.setItem(turmaId, data);
};

function InscricoesLista() {
  const [selectedTurmaId, setSelectedTurmaId] = useState('');
  const [grupo, setGrupo] = useState(new Set()); 

  const { data: turmas, isLoadingTurmas, errorTurmas } = useQuery({ queryKey: ['turmas'], queryFn: fetchTurmas });
  const { data: selectedTurma, isLoadingAlunos, errorAlunos } = useQuery({ queryKey: ['turma', selectedTurmaId], queryFn: fetchTurma, enabled: !!selectedTurmaId });

  useEffect(() => {
    const grupoSalvo = getGrupoFromStorage(selectedTurmaId);
    setGrupo(grupoSalvo);
  }, [selectedTurmaId]); 

  const handleTurmaChange = (e) => {
    setSelectedTurmaId(e.target.value);
  };

  const handleToggleGrupo = (alunoId) => {
    const novoGrupo = new Set(grupo);

    if (novoGrupo.has(alunoId)) {
      novoGrupo.delete(alunoId);
    } else {
      novoGrupo.add(alunoId);
    }
    setGrupo(novoGrupo);
    saveGrupoToStorage(selectedTurmaId, novoGrupo);
  };

  if (errorTurmas) return <p>Erro ao carregar turmas: {errorTurmas.message}</p>;
  if (errorAlunos) return <p>Erro ao carregar alunos: {errorAlunos.message}</p>;

  return (
    <div>
      <div>
        <label htmlFor="turma-select"><strong>Turma:</strong></label>
        <select  className="combo-box" id="turma-select" value={selectedTurmaId} onChange={handleTurmaChange}>
          <option value="">Selecione uma turma</option>
          
          {isLoadingTurmas ? (
            <option disabled>Carregando...</option>
          ) : (
            turmas?.map(turma => (
              <option key={turma.id} value={turma.id}>
                {turma.id} - {turma.disciplina.nome}
              </option>
            ))
          )}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingAlunos ? ( <tr><td colSpan="4">Carregando alunos da turma...</td></tr> ) : selectedTurma && selectedTurma.inscricoes.length > 0 ? (
            
            selectedTurma.inscricoes.map(inscricao => {
              const aluno = inscricao.aluno;
              const estaNoGrupo = grupo.has(aluno.id);

              return (
                <tr key={aluno.id}>
                  <td>{aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.email}</td>
                  <td>
                    <button onClick={() => handleToggleGrupo(aluno.id)}>
                      {estaNoGrupo ? 'Remover' : 'Incluir'}
                    </button>
                  </td>
                </tr>
              );
            })

          ) : selectedTurmaId ? (
            <tr><td colSpan="4">Nenhum aluno inscrito nesta turma.</td></tr>

          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InscricoesLista;