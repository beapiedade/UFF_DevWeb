import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useApi from '../hooks/useApi';
import useTokenStore from '../stores/useTokenStore';  

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

function BuscaInscricoes() {
  const {get, getAll} = useApi('turma');
  const [selectedTurmaId, setSelectedTurmaId] = useState('');
  const [grupo, setGrupo] = useState(new Set()); 
  const token = useTokenStore((state) => state.token);

  const { data: turmas, isLoadingTurmas, errorTurmas } = useQuery({ queryKey: ['turmas'], queryFn: getAll });
  const { data: selectedTurma, isLoadingAlunos, errorAlunos } = useQuery({ queryKey: ['turma', selectedTurmaId], queryFn:  () => get(selectedTurmaId), enabled: !!selectedTurmaId });

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
      <div className='busca-header'>
        <h2>Inscrições</h2>
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

export default BuscaInscricoes;