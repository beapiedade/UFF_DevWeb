import { Link } from 'react-router-dom';
import useTokenStore from "../stores/useTokenStore";

function GerenciaAlunos() {

  return (
    <div>
        <h2>Alunos</h2>
        <ul className="opcoes">
            <li><Link to="/alunos">Lista de Alunos</Link></li>
            <li><Link to="/novo-aluno">Cadastro de Alunos</Link></li>
            <li><Link to="/nova-inscricao">Inscrição em Turmas</Link></li>
        </ul>
    </div>
  );
}

export default GerenciaAlunos;