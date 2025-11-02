import { Routes, Route } from 'react-router-dom'
import Layout from './componentes/Layout'
import AlunosView from './paginas/AlunosView'
import TurmasView from './paginas/TurmasView'
import TurmaView from './paginas/TurmaView'
import TurmasBusca from './paginas/TurmasBusca';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<h2>Seja bem-vindo(a) ao sistema escolar!</h2>} />
        <Route path="alunos" element={<AlunosView />} />
        <Route path="turmas" element={<TurmasView />} />
        <Route path="turmas/:id" element={<TurmaView />} />
        <Route path="busca-turmas" element={<TurmasBusca />} />
      </Route>
    </Routes>
  )
}

export default App