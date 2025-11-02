import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <nav>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/alunos">Alunos</NavLink>
        <NavLink to="/turmas">Turmas</NavLink>
        <NavLink to="/busca-turmas">Pesquisa</NavLink>
        <NavLink to="/inscricoes">Inscrições</NavLink>
      </nav>

      <div className="container">
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout