# Desenvolvimento Web
- mvn spring-boot:run
- npm run dev

FEITO - Crie uma tela de login para o seu projeto. Nesta tela deve haver um link para que um usuário do sistema (um funcionário da universidade, por exemplo) possa se cadastrar e criar uma conta. O usuário, ao se cadastrar, será necessariamente inserido no banco de dados com o perfil USER (Role do Spring Security). Os dois perfis possíveis são USER e ADMIN.
FEITO - Após um usuário se logar deverá ser exibido, na NavBar, o nome do usuário autenticado.
FEITO - Para um usuário poder ver os alunos cadastrados ele deverá estar logado e deverá possuir, no mínimo, o perfil USER. Isto é, deverá possuir o perfil USER ou ADMIN.
FEITO - Apenas os usuários com o perfil ADMIN devem ser capazes de cadastrar novos alunos.
FEITO - Crie uma opção de menu, na NavBar, para permitir que um usuário ADMIN possa cadastrar um outro usuário ADMIN ou USER. Esta opção de menu só deve ser exibida para usuários com o perfil ADMIN.
FEITO - Apenas os usuários com o perfil ADMIN devem ser capazes de remover alunos. No entanto, o botão de remoção de um aluno deve ser exibido para todos os usuários do sistema, isto é, devem ser exibidos para usuários ADMIN e USER. Naturalmente se um USER tentar remover um aluno, o back-end deverá retornar o erro 403 - FORBIDDEN.


FEITO - Inclua neste trabalho a implementação do cadastro de alunos solicitada para o trabalho 6. E acrescente a esta implementação, além da validação no cliente com o Zod, a validação no servidor com o Spring Validator.





- Acrescente no seu trabalho o hook useApi() (implementado no projeto 21 de react) que deverá conter todas as chamadas à API RESTful, que podem ser implementadas de forma genérica. A implementação deste hook, da forma como foi implementado no projeto 21, valerá 20% da nota deste trabalho. 

Ao executar a sua aplicação você deverá executar os seguintes testes com o postman e com a sua aplicação React:
1. Tentar remover um aluno sem estar logado. No Postman, deverá ocorrer o erro 401 - UNAUTHORIZED e no react o usuário deverá ser redirecionado para a tela de login que deverá exibir a mensagem "Necessário estar autenticado para acessar este recurso."
2. Tentar remover um aluno após se logar com um usuário que possui o perfil USER. No Postman, deverá ocorrer o erro 403 - FORBIDDEN e no react o usuário deverá ser redirecionado para a tela de login que deverá exibir a mensagem "Você não tem permissão para acessar este recurso."
3. Tentar remover um aluno após se logar com um usuário que possui o perfil ADMIN.  No Postman, o código de retorno deverá ser 200 OK e no react o usuário deverá ser removido.

Para realizar este trabalho utilize como base o projetos na versão 20 (tanto do back-end como do front-end).