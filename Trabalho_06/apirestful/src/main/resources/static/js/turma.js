async function carregarTurmas() {
    try {
        const response = await fetch('http://localhost:8080/api/turma');
        
        if (!response.ok) {
            throw new Error(`ERRO: ${response.statusText}`);
        }

        const turmas = await response.json();
        const lista = document.getElementById("lista-turmas");

        lista.innerHTML = ''; 

        turmas.forEach(turma => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="turma-detalhe.html?id=${turma.id}">
                                Disciplina: ${turma.disciplina.nome} (Período: ${turma.ano}/${turma.periodo})
                            </a>`;
            lista.appendChild(li);
        });

    } catch (error) {
        console.error("ERRO:", error);
        const lista = document.getElementById("lista-turmas");
        lista.innerHTML = '<li>Não foi possível carregar os dados :(.</li>';
    }
}

window.onload = carregarTurmas;