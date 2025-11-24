import { Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Menu from './componentes/Menu';
import ListaAlunos from './paginas/ListaAlunos';
import ListaTurmas from './paginas/ListaTurmas';
import BuscaTurmas from './paginas/BuscaTurmas';
import BuscaInscricoes from './paginas/BuscaInscricoes';
import TurmaPage from './paginas/TurmaPage';
import AlunoPage from './paginas/AlunoPage';
import CadastroDeAlunosPage from './paginas/CadastroDeAlunosPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Menu />} />
        <Route path="alunos" element={<ListaAlunos />} />
        <Route path="turmas" element={<ListaTurmas />} />
        <Route path="turmas/:id" element={<TurmaPage />} />
        <Route path="turmas-busca" element={<BuscaTurmas />} />
        <Route path="inscricoes-busca" element={<BuscaInscricoes />} />
        <Route path="novo-aluno" element={<CadastroDeAlunosPage />} />
        <Route path="aluno/:id" element={<AlunoPage />} />
      </Route>
    </Routes>
  )
}

export default App