async function carregarAlunos() {
    try {
        const response = await fetch('http://localhost:8080/api/aluno');
        
        if (!response.ok) {
            throw new Error(`ERRO: ${response.statusText}`);
        }

        const alunos = await response.json();
        const tabelaBody = document.querySelector("#alunos-tabela tbody");
        
        tabelaBody.innerHTML = '';
        alunos.forEach(aluno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.ingresso}</td>
            `;
            tabelaBody.appendChild(tr);
        });

    } catch (error) {
        console.error("ERRO:", error);
        const tabelaBody = document.querySelector("#alunos-tabela tbody");
        tabelaBody.innerHTML = '<tr><td colspan="4">Não foi possível carregar os dados :(.</td></tr>';
    }
}

window.onload = carregarAlunos;