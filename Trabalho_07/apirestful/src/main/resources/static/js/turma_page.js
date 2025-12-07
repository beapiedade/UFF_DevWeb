async function carregarDetalhesDaTurma() {
// Pega os parâmetros da URL (ex: ?id=1)
const params = new URLSearchParams(window.location.search);
const turmaId = params.get('id');

if (!turmaId) {
    document.querySelector('.container').innerHTML = '<h1>ID da turma não fornecido na URL.</h1>';
    return;
}

try {
    // Busca os detalhes da turma específica na API
    const response = await fetch(`http://localhost:8080/api/turma/${turmaId}`);
    
    if (!response.ok) {
        throw new Error(`ERRO: ${response.statusText}`);
    }

    const turma = await response.json();

    // Preenche as informações da turma
    document.getElementById('disciplina-nome').textContent = `Disciplina: ${turma.disciplina.nome}`;
    document.getElementById('turma-periodo').textContent = `${turma.ano}/${turma.periodo}`;
    document.getElementById('professor-nome').textContent = turma.professor.nome;

    // Preenche a tabela de alunos inscritos
    const tabelaBody = document.querySelector("#alunos-inscritos-tabela tbody");
    tabelaBody.innerHTML = '';
    
    // Assumindo que o endpoint retorna a lista de inscrições
    // e cada inscrição tem o objeto do aluno dentro dela.
    if (turma.inscricoes && turma.inscricoes.length > 0) {
            turma.inscricoes.forEach(inscricao => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${inscricao.aluno.nome}</td>
                <td>${inscricao.aluno.curso}</td>
            `;
            tabelaBody.appendChild(tr);
        });
    } else {
        tabelaBody.innerHTML = '<tr><td colspan="2">Nenhum aluno inscrito nesta turma.</td></tr>';
    }

} catch (error) {
        console.error("ERRO:", error);
        document.querySelector('.container').innerHTML = '<h1>Não foi possível carregar os dados da turma.</h1>';
}
}

window.onload = carregarDetalhesDaTurma;