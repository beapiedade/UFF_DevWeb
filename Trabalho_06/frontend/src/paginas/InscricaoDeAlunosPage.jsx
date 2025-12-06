import InscricaoForm from "../componentes/InscricaoForm";
import TabelaDeAlunosPorTurma from "../componentes/TabelaDeAlunosPorTurma";

const InscricaoDeAlunosPage = () => {
  return (
    <>
      <InscricaoForm />
      <hr/>
      <TabelaDeAlunosPorTurma />
    </>
  );
};

export default InscricaoDeAlunosPage;