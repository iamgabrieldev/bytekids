# ByteKids

**ByteKids** é um sistema desenvolvido para o projeto de extensão **ELLP**, destinado a apoiar atividades educacionais e de capacitação para crianças e adolescentes. O objetivo principal do ByteKids é gerenciar a participação de alunos e professores em workshops e eventos de aprendizado, facilitando o processo de inscrição, controle de presença e emissão de certificados de participação.

## Definição de Requisitos Funcionais

- **RF1**: O sistema deve permitir que novos professores sejam cadastrados com dados básicos, como nome, e-mail e CPF.
- **RF2**: O sistema deve autenticar os professores por meio de login, solicitando credenciais como email e senha.
- **RF3**: O sistema deve permitir o cadastro de novos alunos, incluindo informações como nome completo, idade e contato.
- **RF4**: O sistema deve possibilitar o cadastro de novos workshops, com dados como título, data, duração e instrutor responsável.
- **RF5**: O sistema deve permitir o registro da frequência dos alunos para cada workshop, indicando a presença ou ausência em cada sessão.
- **RF6**: O sistema deve possibilitar a visualização da frequência dos alunos em workshops e gerar certificados de participação para aqueles que atendam aos requisitos de presença.

## Arquitetura de Alto Nível do Sistema
![Arquitetura Oficina 2](https://github.com/user-attachments/assets/3a855b47-e915-49d0-9488-411159cada4d)

## Estratégia de Automação de Testes

**Objetivo**: Assegurar uma cobertura mínima de 80% para garantir a qualidade do sistema.  
**Escopo**: Requisitos cobertos pelos testes: RF1, RF2, RF3, RF4, RF5 e RF6.  
**Ferramentas**: JUnit, Banco H2, e Jest.  
**Técnicas**: Testes unitários e de integração.

## Tecnologias Utilizadas

- **Backend**: Java, Spring Boot
- **Frontend**: Angular, TypeScript
- **Banco de Dados**: PostgreSQL
- **Testes**: JUnit, H2, Jest
