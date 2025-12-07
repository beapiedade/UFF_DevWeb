import { Link } from 'react-router-dom';
import useTokenStore from "../stores/useTokenStore";
import LoginForm from './LoginForm';

function Menu() {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);

  return (
    <div>
      {tokenResponse.token != "" ? (
        <div>
          <h2>Seja bem-vindo(a) ao sistema escolar!</h2>
          <ul className="opcoes">
            <li><Link to="/gerencia-alunos">Alunos</Link></li>
            <li><Link to="/gerencia-turmas">Turmas</Link></li>
            {tokenResponse.role == "ADMIN" ? (
              <li><Link to="/gerencia-cadastros">Cadastros de Usuários</Link></li>
            ) : null}
          </ul>
        </div>
      ) : (
        
        <div>
          <h2>Área de Login</h2>
          <LoginForm />
        </div>
      )}
    </div>
  );
}

export default Menu;