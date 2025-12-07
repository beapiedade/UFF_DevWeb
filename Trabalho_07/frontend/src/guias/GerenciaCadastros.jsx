import { Link } from 'react-router-dom';

function GerenciaCadastros() {

  return (
    <div>
        <h2>Cadastros</h2>
        <ul className="opcoes">
            <li><Link to="/usuarios">Lista de Cadastros</Link></li>
            <li><Link to="/novo-usuario">Cadastro de Usuários</Link></li>
        </ul>
    </div>
  );
}

export default GerenciaCadastros;