import { Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Menu from './componentes/Menu';
import LoginForm from './componentes/LoginForm';
import CadastroForm from './componentes/CadastroForm';
import GerenciaAlunos from './guias/GerenciaAlunos';
import GerenciaTurmas from './guias/GerenciaTurmas';
import GerenciaCadastros from './guias/GerenciaCadastros';
import ListaAlunos from './paginas/ListaAlunos';
import ListaTurmas from './paginas/ListaTurmas';
import ListaCadastros from './paginas/ListaCadastros';
import BuscaTurmas from './paginas/BuscaTurmas';
import BuscaInscricoes from './paginas/BuscaInscricoes';
import TurmaPage from './paginas/TurmaPage';
import AlunoPage from './paginas/AlunoPage';
import CadastroDeAlunosPage from './paginas/CadastroDeAlunosPage';
import InscricaoDeAlunosPage from './paginas/InscricaoDeAlunosPage';
import CadastroDeUsuarioPage from './paginas/CadastroDeUsuarioPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Menu />} />
        <Route path="gerencia-alunos" element={<GerenciaAlunos />} />
        <Route path="alunos" element={<ListaAlunos />} />
        <Route path="aluno/:id" element={<AlunoPage />} />
        <Route path="novo-aluno" element={<CadastroDeAlunosPage />} />
        <Route path="nova-inscricao" element={<InscricaoDeAlunosPage />} />

        <Route path="gerencia-turmas" element={<GerenciaTurmas />} />
        <Route path="turmas" element={<ListaTurmas />} />
        <Route path="turmas/:id" element={<TurmaPage />} />
        <Route path="turmas-busca" element={<BuscaTurmas />} />
        <Route path="inscricoes-busca" element={<BuscaInscricoes />} />
        
        <Route path="gerencia-cadastros" element={<GerenciaCadastros />} />
        <Route path="novo-usuario" element={<CadastroDeUsuarioPage />} />
        <Route path="cadastro" element={<CadastroForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="usuarios" element={<ListaCadastros />} />
      </Route>
    </Routes>
  )
}

export default App