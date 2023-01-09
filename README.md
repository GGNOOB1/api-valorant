# API de Valorant PT-BR V1

## Objetivo

Está API foi construída afim de colocar os conhecimentos de node js, javascript, git e o mais importante o CRUD.

## Como funciona?

Para aqueles que não conhecem o jogo Valorant, irei resumidamente contar um pouco de como ele funciona. O jogo funciona com duas equipes de cinco jogadores uma contra a outra, com cada equipe tendo que cumprir determinados objetivos para vencer as rodadas. Uma equipe assume o papel de atacantes, enquanto a outra equipe assume o papel de defensores. Cada equipe possui agentes, e esses agentes utilizam armas. A partir dessas informações, a API tem como objetivo obter dados de todos agentes, obter dados de um agente, atualizar um agente ou deletar um agente, assim como também fazer o mesmo com as armas.

## Depêndencias utilizadas

    Dependências padrões:

    • dotenv: "^16.0.3" - Pacote utilizado para configurar variáveis de ambiente;
    • express: "^4.18.2" - Pacote utilizado para gerenciar requisições de diferentes métodos HTTP em diferentes URLs;
    • joi: "^17.7.0" - Pacote utilizado para validar dados de entrada nas requisições;
    • lodash: "^4.17.21" - Pacote utilizado para formatar dados e fazer algumas validações;
    • mongoose: "^6.8.2" - Pacote utilizado para manipular e gerenciar o banco de dados com mongodb;
    • nodemon: "^2.0.20" - Pacote utilizado para executar o servidor e o reiniciar a cada mudança detectada.

    Dependências de dev:

    • prettier: "^2.8.1" - Pacote utilizado para formatar o código.

## Instalando

    1° Baixar todos os arquivos presentes nesse repositório

    2° Abrir os arquivos em um editor de texto com o terminal incluso, ou somente um terminal com acesso a pasta baixada e executar o   comando **npm install**

    3° Após isso executar o comando **npm run start** para iniciar o servidor e a API já estará em funcionamento

## Como usar e exemplos de uso

Para utilizar a API é necessário uma ferramenta que dê suporte à documentação das requisições feitas pela API e execução de testes de APIs, neste caso é recomendado o uso do Programa PostMan ou um semelhante. Bom, a API tem suporte a 4 métodos de requisição HTTP, GET, POST, PATCH e DELETE que deverão ser acessadas pelas seguintes rotas:

    localhost:3000/api/v1/agentes
    localhost:3000/api/v1/agentes/:id
    localhost:3000/api/v1/armas
    localhost:3000/api/v1/armas/:id
    localhost:3000/api/v1/valorant

Primeiro, temos as rotas para o método GET:

**localhost:3000/api/v1/agentes** - Listará todos os agentes disponíveis no banco de dados
**localhost:3000/api/v1/armas** - Listará todas as armas disponíveis no banco de dados
**localhost:3000/api/v1/valorant** - Listará todos os agentes e armas disponíveis no banco de dados

Segundo, temos as rotas para o método POST:

**localhost:3000/api/v1/agentes** - Listará todos os agentes disponíveis no banco de dados
**localhost:3000/api/v1/armas** - Listará todas as armas disponíveis no banco de dados
**localhost:3000/api/v1/valorant** - Listará todos os agentes e armas disponíveis no banco de dados
