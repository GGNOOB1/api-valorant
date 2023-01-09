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

### Primeiro, temos as rotas para o método GET:

    **localhost:3000/api/v1/agentes** - Listará todos os agentes disponíveis no banco de dados
    **localhost:3000/api/v1/armas** - Listará todas as armas disponíveis no banco de dados
    **localhost:3000/api/v1/valorant** - Listará todos os agentes e armas disponíveis no banco de dados

### Segundo, temos as rotas para o método POST:

    **localhost:3000/api/v1/agentes** - Cadastrará os dados dos agentes no banco de dados da API. Para isso será necessário preencher corretamente os campos de dados de um agente. Para isso logo abaixo terá o template e após um exemplo com dados.

#### Template

    ```JSON

    {
    "nome": "Colocar aqui um nome de agente com no minimo 3 letras e no máximo 1 nome composto, este campo será único, então terá uma validação mais forte",
    "historia": "Colocar a história da/do agente",
    "categoria": "Colocar uma das 6 categorias a seguir: ['Duelista', 'Controlador', 'Iniciador', 'Sentinela'] , exatamente igual senão ocasionará ume erro de validação",
    "habilidades": [
        {
            "nome": "Colocar o nome da habilidade",
            "tempoDeRecarga": "Colocar o tipo de tempo de regarga como '1 seg' ou '3 cargas' ",
            "descricao": "Colocar uma descrição de habilidade"
        },
        {
            "nome": "Colocar o nome da habilidade",
            "tempoDeRecarga": "Colocar o tipo de tempo de regarga como '1 seg' ou '3 cargas' ",
            "descricao": "Colocar uma descrição de habilidade"
        },
        {
            "nome": "Colocar o nome da habilidade",
            "tempoDeRecarga": "Colocar o tipo de tempo de regarga como '1 seg' ou '3 cargas' ",
            "descricao": "Colocar uma descrição de habilidade"
        },
        {
            "nome": "Colocar o nome da habilidade",
            "tempoDeRecarga": "Colocar o tipo de tempo de regarga como '1 seg' ou '3 cargas' ",
            "descricao": "Colocar uma descrição de habilidade"
        }
        ]

    }

    ```

#### Exemplo com dados reais

```JSON
{
    "nome": "Skye",
    "historia": "Skye é a 13º agente de Valorant e a primeira vindo da Austrália. Chamada por Sage para ajudar a salvar o mundo, ela está se juntando às forças do futuro próximo da Terra e compartilhando sua experiência em vida selvagem no campo de batalha. Skye definitivamente não é um fragger.",
    "categoria": "Iniciador",
    "habilidades": [
        {
            "nome": "Predador explosivo",
            "tempoDeRecarga": "1 carga",
            "descricao": "EQUIPE um amuleto de lobo-da-tasmânia. DISPARE para enviar e controlar esse predador. Enquanto estiver no controle, DISPARE para saltar para a frente. O lobo gera uma explosão e causa dano aos inimigos diretamente atingidos."
        },
        {
            "nome": "Reflorescer",
            "tempoDeRecarga": "4 segundos",
            "descricao": "Skye cura seus aliados em uma grande área ao seu redor. O tempo dura o bastante para restaurar 100 pontos de vida em aproximadamente 4 segundos. O feitiço pode ser usado mais de uma vez, mas o somatório de todas as vezes segue como 4 segundos."
        },
        {
            "nome": "Luz Desbravadora",
            "tempoDeRecarga": "3 cargas (1 grátis)",
            "descricao": "Skye invoca um falcão que sai em linha reta por padrão. Ela também pode controlar o falcão e fazer curvas mantendo o botão esquerdo do mouse pressionado. Se Skye pressionar E novamente antes que o falcão desapareça, o falcão explode e cega os inimigos por 2 segundos. Os jogadores que estão perto do falcão no momento de sua explosão, mas não estão olhando para ele, recebem o flash por 0,5 segundo. Skye vê um marcador de sucesso em sua tela se ela conseguir atordoar um inimigo."
        },
        {
            "nome": "Rastreadores",
            "tempoDeRecarga": "6 pontos",
            "descricao": "Skye invoca três rastreadores que vão automaticamente para os três oponentes mais próximos. Assim como outras magias da agente, eles também podem ser destruídos por inimigos. Se atingirem o alvo, ele ficará cego por 4 segundos. O mesmo jogador só pode ser alvo de um rastreador. Se apenas um ou dois oponentes estiverem vivos, apenas um ou dois rastreadores serão invocados ao invés do padrão de três. O rastreador desaparece se percorrer cerca de metade do mapa sem atingir seu alvo."
        }
    ]

}

```

    **localhost:3000/api/v1/armas** - Listará todas as armas disponíveis no banco de dados
    **localhost:3000/api/v1/valorant** - Listará todos os agentes e armas disponíveis no banco de dados
