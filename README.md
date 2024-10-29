# bytekids

Definição de requisitos funcionais
RF1 O sistema deve permitir o cadastro da presença dos alunos matriculados;
RF2 O sistema deve permitir a visualização da frequência dos alunos;
RF3 O sistema deve permitir a edição da marcação de presença dos alunos;
RF4 O sistema deve permitir o cadastro de alunos;
RF5 O sistema deve permitir a exclusão de aluno cadastrado;
RF6 O sistema deve permitir o cadastro de usuário (professor) pelo super usuário;
RF7 O sistema deve permitir o login do usuário com suas credenciais (email e senha);
RF8 O sistema deve permitir a troca de senha pelo professor;
RF9 O sistema deve permitir a desativação do login do professor.

Definição da arquitetura em alto nível do sistema
 


Definição da estratégia de automação de testes do sistema
Objetivos: ter uma boa cobertura de testes, mínimo de 80%.
Escopo: os requisitos a serem cobertos pelos testes serão RF1, RF2, RF3, RF4, RF5, RF6 e RF7.
Ferramentas: as ferramentas utilizadas serão JUnit, Mockito e Jest.
Técnicas: testes unitários e testes de integrção.
Critérios de entrada e saída:

RF1 (Post)
Entrada
ID do aluno
Data e hora

Saída
Código 201 – Created.

RF2 (Get)
Entrada
ID Turma

Saída
Lista de relação aluno frequência (id aluno, id presença, nome do aluno, quantidade de presença, total aulas dadas)

RF3 
Entrada
ID Presença

Saída
Código 204 – Sucesso

RF4
Entrada
Nome do aluno
Data de nascimento
Email
Telefone
Nome da mãe

Saída
Código 201 – Created

RF5
Entrada
ID Aluno

Saída
Código 204 – Sucesso

RF6 
Entrada
Nome do professor
Email do Professor
Senha do Professor
Telefone
Documento

Saída
Código 201 – Created

RF7
Entrada
Email
Senha

Saída
Objeto professor
Código 200 – Sucesso.

RF8
Entrada
ID do professor
Nova senha

Saída
Código 204 – Sucesso.

RF9

ID do professor

Saída
Código 204 – Sucesso.


Definição das tecnologias a serem utilizadas no projeto
Java, Angular, PostgreSQL, Spring Boot, JUnit, Mockito, Typescript, Jest.
