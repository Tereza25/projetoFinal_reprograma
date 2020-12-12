# Projeto Final - {reprograma}
------------------------

O projeto PCDrive foi criado visando ajudar pessoas com deficiência que procuram oportunidades de emprego, diante da grande dificuldade motivada pela falta de programas de inclusão e o pouco conhecimento das empresas em saber como encontrar e recrutar candidates com deficiência.

A API irá armazenar dados importantes de candidatxs, suficiente para suprir as informações necessárias para uma empresa se interessar e contactar para participar de um processo seletivo. Também irá armazenar dados das empresas cadastradas e que querem divulgar seu interesse em investir na diversidade.

Será utilizado duas schemas:

| CANDIDATE     | EMPRESAS       |
| ------------- | -------------- |
| id            |  id            |
| name          |  companyName   |
| birth         |  fantasyName   |
| genre         |  cnpj          |
| deficiency    |  occupationArea|
| breed         |  city          |
| city          |  phone         | 
| schooling     |  email         |
| language      |  userName      |
| experience    |      -         |
| area          |      -         |
| phone         |      -         |
| email         |      -         |
| status        |      -         |        

 #### Tecnologias utilizadas
- Node.js
- MongoDB
- Git

#### Pacotes utilizados

#### Instruções de instalação

#### Rotas

Por meio dos métodos HTTP, será manipulado os dados de acordo com a necessidade dos usuários.

| MÉTODO |       AÇÃO                   |
|------- | ---------------------------- |
|GET     | EXIBIR PERFIL EMPRESA        |
|GET     | EXIBIR O PERFIL CANDIDATO    |
|GET     | EXIBIR STATUS (find e map)   |
|POST    | CADASTRAR CANDIDATO          |
|POST    | CADASTRAR EMPRESAS           |
|PUT     | ATUALIZAR DADOS GERAIS       |
|PATH    | ATUALIZAR APENAS STATUS      |
|DELETE  | EXCLUIR EMPRESA              |
|DELETE  | EXCLUIR CANDIDATO            |



#### readme em processo de finalização