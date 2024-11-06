# ByteKids

## Definição de Requisitos Funcionais

- **RF1**: O sistema deve permitir que novos professores sejam cadastrados com dados básicos, como nome, e-mail e CPF.
- **RF2**: O sistema deve autenticar os professores por meio de login, solicitando credenciais como email e senha.
- **RF3**: O sistema deve permitir o cadastro de novos alunos, incluindo informações como nome completo, idade e contato.
- **RF4**: O sistema deve possibilitar o cadastro de novos workshops, com dados como título, data, duração e instrutor responsável.
- **RF5**: O sistema deve permitir o registro da frequência dos alunos para cada workshop, indicando a presença ou ausência em cada sessão.
- **RF6**: O sistema deve possibilitar a visualização da frequência dos alunos em workshops e gerar certificados de participação para aqueles que atendam aos requisitos de presença.

## Arquitetura de Alto Nível do Sistema
<img width="405" alt="image" src="https://github.com/user-attachments/assets/bdecd5fd-f18f-4187-95fa-c86885476d63">

## Estratégia de Automação de Testes

**Objetivo**: Assegurar uma cobertura mínima de 80% para garantir a qualidade do sistema.  
**Escopo**: Requisitos cobertos pelos testes: RF1, RF2, RF3, RF4, RF5 e RF6.  
**Ferramentas**: JUnit, Mockito, e Jest.  
**Técnicas**: Testes unitários e de integração.

### Critérios de Entrada e Saída dos Requisitos

| Requisito | Método | Entrada                                                        | Saída                             |
|-----------|--------|----------------------------------------------------------------|-----------------------------------|
| **RF1**   | POST   | Nome do professor, E-mail, CPF                                 | Código 201 – Created              |
| **RF2**   | POST   | Nome de usuário, Senha                                         | Código 200 – OK / Código 401 – Unauthorized |
| **RF3**   | POST   | Nome do aluno, Data de nascimento, E-mail, Telefone            | Código 201 – Created              |
| **RF4**   | POST   | Título do workshop, Data, Duração, Instrutor responsável       | Código 201 – Created              |
| **RF5**   | POST   | ID do aluno, ID do workshop, Data e hora da presença           | Código 201 – Created              |
| **RF6**   | GET    | ID do workshop, ID do aluno                                    | Frequência do aluno e status do certificado |
| **RF6**   | POST   | ID do aluno, ID do workshop                                    | Código 201 – Certificado emitido           |


## Tecnologias Utilizadas

- **Backend**: Java, Spring Boot
- **Frontend**: Angular, TypeScript
- **Banco de Dados**: PostgreSQL
- **Testes**: JUnit, Mockito, Jest
