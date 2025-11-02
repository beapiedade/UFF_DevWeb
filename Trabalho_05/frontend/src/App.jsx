import { Routes, Route } from 'react-router-dom'
import Layout from './componentes/Layout'
import AlunosLista from './paginas/AlunosLista'
import TurmasLista from './paginas/TurmasLista'
import TurmaPagina from './paginas/TurmaPagina'
import TurmasBusca from './paginas/TurmasBusca';
import InscricoesLista from './paginas/InscricoesLista';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<h2>Seja bem-vindo(a) ao sistema escolar!</h2>} />
        <Route path="alunos" element={<AlunosLista />} />
        <Route path="turmas" element={<TurmasLista />} />
        <Route path="turmas/:id" element={<TurmaPagina />} />
        <Route path="busca-turmas" element={<TurmasBusca />} />
        <Route path="inscricoes" element={<InscricoesLista />} />
      </Route>
    </Routes>
  )
}

export default App