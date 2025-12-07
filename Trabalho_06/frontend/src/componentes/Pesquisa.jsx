import useInscricaoStore from "../stores/useInscricaoStore";

function Pesquisa() {
  const filtroNome = useInscricaoStore((s) => s.filtroNome);
  const setFiltroNome = useInscricaoStore((s) => s.setFiltroNome);

  return (
    <div className='busca-header'>
      <h2>Pesquisa</h2>
      <div className="busca-caixa">
          <input
          type="text"
          placeholder="Informe o nome de um aluno"
          value={filtroNome}
          onChange={(e) => setSearchTerme.target.value)}
        />
      </div>
    </div>
  );
}

export default Pesquisa;
