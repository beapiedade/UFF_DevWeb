import { Link } from 'react-router-dom';
import useTokenStore from "../stores/useTokenStore";

function GerenciaTurmas() {
  return (
    <div>
        <h2>Turmas</h2>
        <ul className="opcoes">
            <li><Link to="/turmas">Lista de Turmas</Link></li>
            <li><Link to="/turmas-busca">Busca de Turmas</Link></li>
            <li><Link to="/inscricoes-busca">Busca de Inscrições</Link></li>
        </ul>
    </div>
  );
}

export default GerenciaTurmas;