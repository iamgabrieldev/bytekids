# ByteKids

## Definição de Requisitos Funcionais

- **RF1**: O sistema deve permitir o cadastro da presença dos alunos matriculados.
- **RF2**: O sistema deve permitir a visualização da frequência dos alunos.
- **RF3**: O sistema deve permitir a edição da marcação de presença dos alunos.
- **RF4**: O sistema deve permitir o cadastro de alunos.
- **RF5**: O sistema deve permitir a exclusão de aluno cadastrado.
- **RF6**: O sistema deve permitir o cadastro de usuários (professores) pelo superusuário.
- **RF7**: O sistema deve permitir o login do usuário com suas credenciais (e-mail e senha).
- **RF8**: O sistema deve permitir a troca de senha pelo professor.
- **RF9**: O sistema deve permitir a desativação do login do professor.

## Arquitetura de Alto Nível do Sistema
<img width="405" alt="image" src="https://github.com/user-attachments/assets/bdecd5fd-f18f-4187-95fa-c86885476d63">

## Estratégia de Automação de Testes

**Objetivo**: Assegurar uma cobertura mínima de 80% para garantir a qualidade do sistema.  
**Escopo**: Requisitos cobertos pelos testes: RF1, RF2, RF3, RF4, RF5, RF6 e RF7.  
**Ferramentas**: JUnit, Mockito, e Jest.  
**Técnicas**: Testes unitários e de integração.

### Critérios de Entrada e Saída dos Requisitos

| Requisito | Método | Entrada                                      | Saída                         |
|-----------|--------|----------------------------------------------|-------------------------------|
| **RF1**   | POST   | ID do aluno, Data e hora                     | Código 201 – Created          |
| **RF2**   | GET    | ID da turma                                  | Lista de alunos X presença  |
| **RF3**   | PUT    | ID da presença                               | Código 204 – Sucesso          |
| **RF4**   | POST   | Nome, Data de nascimento, E-mail, Telefone, Nome da mãe | Código 201 – Created  |
| **RF5**   | DELETE | ID do aluno                                  | Código 204 – Sucesso          |
| **RF6**   | POST   | Nome, E-mail, Senha, Telefone, Documento     | Código 201 – Created          |
| **RF7**   | POST   | E-mail, Senha                                | Objeto professor, Código 200  |
| **RF8**   | PUT    | ID do professor, Nova senha                  | Código 204 – Sucesso          |
| **RF9**   | PUT    | ID do professor                              | Código 204 – Sucesso          |

## Tecnologias Utilizadas

- **Backend**: Java, Spring Boot
- **Frontend**: Angular, TypeScript
- **Banco de Dados**: PostgreSQL
- **Testes**: JUnit, Mockito, Jest
