import React, { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useInscricaoStore from "../stores/useInscricaoStore";
import Paginacao from "../componentes/Paginacao";
import useFetchWithAuth from "../hooks/useFetchWithAuth";

const ALUNOS_POR_PAGINA = 5;

function TabelaDeAlunosPorTurma() {
  const turmaId = useInscricaoStore((s) => s.turmaId);
  const filtroNome = useInscricaoStore((s) => s.searchTerm);
  const setFiltroNome = useInscricaoStore((s) => s.setSearchTerm);

  const { fetchWithAuth } = useFetchWithAuth();

  const { data: inscritos = [], isLoading } = useQuery({
    queryKey: ["alunosInscritos", turmaId],
    queryFn: async () => {
      const response = await fetchWithAuth(`http://localhost:8080/api/turma/${turmaId}`);
      const dados = await response.json();
      return dados.inscricoes || [];
    },
    enabled: turmaId != null
  });

  const [page, setPage] = useState(1);

  const inscritosOrdenados = useMemo(() => {
    return [...inscritos].sort((a, b) => b.id - a.id);
  }, [inscritos]);

  const filtrados = useMemo(() => {
    if (!filtroNome) return inscritosOrdenados;
    const q = filtroNome.toLowerCase();
    return inscritosOrdenados.filter((inscricao) =>
      inscricao.aluno.nome.toLowerCase().includes(q)
    );
  }, [inscritosOrdenados, filtroNome]);

  const totalPages = Math.max(1, Math.ceil(filtrados.length / ALUNOS_POR_PAGINA));
  const currentPage = Math.min(page, totalPages);

  const pageItems = filtrados.slice(
    (currentPage - 1) * ALUNOS_POR_PAGINA,
    currentPage * ALUNOS_POR_PAGINA
  );

  useEffect(() => {
    setPage(1);
    setFiltroNome("");
  }, [turmaId, setFiltroNome]);

  if (turmaId == null)
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 12 }}>Selecione uma turma para ver os inscritos.</div>;

  if (isLoading) return <div>Carregando inscritos...</div>;

  return (
    <div>
      <div className="busca-header">
        <h2>Pesquisa</h2>
        <div className="busca-caixa">
          <input
            type="text"
            placeholder="Informe o nome de um aluno"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
        </div>
      </div>
      
      <div id="busca-item">
        <table>
          <thead>
            <tr>
              <th>ID da Inscrição</th>
              <th>Nome</th>
              <th>Curso</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {pageItems.length > 0 ? (
              pageItems.map((inscricao) => (
                <tr key={inscricao.id}>
                  <td>{inscricao.id}</td>
                  <td>{inscricao.aluno.nome}</td>
                  <td>{inscricao.aluno.curso}</td>
                  <td>{inscricao.aluno.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Sem alunos inscritos nesta turma.</td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="4" style={{ textAlign: "left", padding: 8 }}>
                Total de alunos na turma: {filtrados.length}
              </td>
            </tr>
          </tfoot>
        </table>

        <Paginacao
          itemsPerPage={ALUNOS_POR_PAGINA}
          totalItems={filtrados.length}
          currentPage={currentPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default TabelaDeAlunosPorTurma;