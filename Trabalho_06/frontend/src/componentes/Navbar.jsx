import { NavLink, Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav>
        <NavLink to="/">Menu</NavLink>
        <NavLink to="/turmas-busca">Busca de Turmas</NavLink>
        <NavLink to="/inscricoes-busca">Busca de Inscrições</NavLink>
        <NavLink to="/novo-aluno">Inscrição de Aluno</NavLink>
        <NavLink to="/nova-inscricao">Inscrição em Turma</NavLink>
      </nav>

      <div className="container">
        <Outlet/>
      </div>
    </div>
  )
}

export default Navbar