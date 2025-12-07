import { NavLink, Outlet } from 'react-router-dom'
import useTokenStore from "../stores/useTokenStore";

function Navbar() {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);
  return (
    <div>
      <nav>
        <NavLink to="/">
          {tokenResponse && tokenResponse.role != "" ? (
            "Bem-vindo, " + tokenResponse.nome
          ) : (
            "Login"
          )}
        </NavLink>
        <NavLink to="/gerencia-alunos">Gerência de Alunos</NavLink>
        <NavLink to="/gerencia-turmas">Gerência de Turmas</NavLink>
        {tokenResponse && tokenResponse.role == "ADMIN" ? (
          <NavLink to="/gerencia-cadastros">Gerência de Cadastros</NavLink>
        ) : null}
        {tokenResponse && tokenResponse.role != "" ? (
          <NavLink to="/login">Sair</NavLink>
        ) : null}
      </nav>

      <div className="container">
        <Outlet/>
      </div>
    </div>
  )
}

export default Navbar