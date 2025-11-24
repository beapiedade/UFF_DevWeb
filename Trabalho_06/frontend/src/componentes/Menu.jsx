import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div>
      <h2>Seja bem-vindo(a) ao sistema escolar!</h2>

      <ul className="opcoes">
        <li><Link to="/alunos">Lista de Alunos</Link></li>
        <li><Link to="/turmas">Lista de Turmas</Link></li>
      </ul>
    </div>
  );
}

export default Menu;