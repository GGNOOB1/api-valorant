# API de Valorant PT-BR V1

## Objetivo

Está API foi construída afim de colocar os conhecimentos de node js, javascript, git e o mais importante o CRUD.

## Como funciona?

Para aqueles que não conhecem o jogo Valorant, irei resumidamente contar um pouco de como ele funciona. O jogo funciona com duas equipes de cinco jogadores uma contra a outra com cada equipe tendo que cumprir determinados objetivos para vencer as rodadas, cada pessoa de uma equipe é um agente que possui 4 habilidades. Uma equipe assume o papel de atacantes, enquanto a outra equipe assume o papel de defensores. Cada equipe possui agentes, e esses agentes utilizam armas. A partir dessas informações, a API tem como objetivo obter dados de todos agentes, obter dados de um agente, atualizar um agente ou deletar um agente, assim como também fazer o mesmo com as armas.

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

    2° Abrir os arquivos em um editor de texto com o terminal incluso, ou somente um terminal com acesso a pasta
    baixada e executar o comando **npm install**

    3° Após isso executar o comando **npm run start** para iniciar o servidor e a API já estará em funcionamento

## Como usar e exemplos de uso

Para utilizar a API é necessário uma ferramenta que dê suporte à documentação das requisições feitas pela API e execução de testes de APIs, neste caso é recomendado o uso do Programa PostMan ou um semelhante. Bom, a API tem suporte a 4 métodos de requisição http, GET, POST, PATCH e DELETE que deverão ser acessadas pelas seguintes rotas:

    localhost:3000/api/v1/agentes
    localhost:3000/api/v1/agentes/:id
    localhost:3000/api/v1/armas
    localhost:3000/api/v1/armas/:id
    localhost:3000/api/v1/valorant

### Rotas para o método GET:

**localhost:3000/api/v1/agentes** - Listará todos os agentes disponíveis no banco de dados

**localhost:3000/api/v1/armas** - Listará todas as armas disponíveis no banco de dados

**localhost:3000/api/v1/valorant** - Listará todos os agentes e armas disponíveis no banco de dados

**localhost:3000/api/v1/agentes/:id** - Lista apenas um agente

> É possível utilizar o id do agente ou nome do agente composto ou único, nomes compostos deverão seguir este padrão: maria-luiza

**localhost:3000/api/v1/agentes/:id** - Lista apenas uma arma | Obs: É possível utilizar o nome da arma ou id do arma

> É possível utilizar o id da arma ou nome da arma composto ou único, nomes compostos deverão seguir este padrão: sub-thompsom

> É esperado o status code 200(ok) para requisições com sucesso e o status code 404(Not Found) para dados não encontrados

### Rotas para o método POST - Agentes:

**localhost:3000/api/v1/agentes** - Cadastrará os dados dos agentes no banco de dados da API. Para isso
será necessário preencher corretamente os campos de dados de um agente utilizando o formato JSON na aba body
do PostMan. Então logo abaixo terá o template e após um exemplo com dados para mostrar como deve ser.

> É esperado o status code 201(Created) para requisições com sucesso e o status code 400(Bad Request) para erro do cliente ou solicitação inválida

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

### Rotas para o método POST - Armas:

**localhost:3000/api/v1/armas** - Cadastrará os dados das armas no banco de dados da API. Para isso
será necessário preencher corretamente os campos de dados de um agente utilizando o formato JSON na aba body
do PostMan. Então logo abaixo terá o template e após um exemplo com dados para mostrar como deve ser.

> É esperado o status code 201(Created) para requisições com sucesso e o status code 400(Bad Request) para erro do cliente ou solicitação inválida

#### Template

```JSON

{
    "nome": "Colocar aqui um nome de arma com no minimo 3 letras e no máximo 1 nome composto, este campo será único, então terá uma validação mais forte",
    "categoria": "Colocar aqui uma das categorias a seguir: ['Pistolas','Sub-metralhadoras','Escopetas','Rifles','Metralhadoras','Armas brancas'], seguindo exatamente cada letra maiúscula e minúscula",
    "descricao": "Colocar a descrição da arma",
    "disparo": "Colocar um dos modos de disparo a seguir: ['Automático', 'Semi-automático', 'Corpo-a-corpo'], seguindo exatamente cada letra maiúscula e minúscula",
    "dano": {
            "cabeca": "Colocar aqui o dano na cabeça com o tipo de dado number",
            "corpo": "Colocar aqui o dano no corpo com o tipo de dado number",
            "perna": "Colocar aqui o dano na perna com o tipo de dado number"
        }

    }

```

#### Exemplo com dados reais

```JSON

{
    "nome": "Phanton",
    "categoria": "Rifles",
    "descricao": "Vandal é um rifle automático que possui dois tipos de disparo. O primeiro, com o botão esquerdo, é o tiro normal, enquanto o segundo, com o botão direito, coloca uma mira que dá 1.25x de zoom e diminui levemente a taxa de disparo. Ele carrega 25 balas no pente e tem penetração media na parede em relação ao varados",
    "disparo": "Automático",
    "dano": {
            "cabeca": 160,
            "corpo": 40,
            "perna": 34
        }

    }


```

### Rotas para o método PATCH - Agentes:

**localhost:3000/api/v1/agentes/:id** - Neste método de requisição será possível atualizar uma parte do documendo
do agente pelo id, sendo obrigatório utilizar o id do agente para fazer as atualizações e também ter um dos campos
do agente senão ocasionará em erro de validação. Para isso será necessário preencher corretamente os campos de
dados de um agente utilizando o formato JSON na aba body do PostMan. Então logo abaixo terá a lista das propriedades
que poderão ser alteradas:

obs: Caso necessário leia o template novamente no método POST para lembrar as propriedades que precisam ter um dos
nomes pré-definidos, ou seja, que são construidos com enums.

> É esperado o status code 200(Ok) para atualizações com sucesso e o status code 404(Not found) se não for encontrado nenhum agente para ser modificado

```JSON

{
    "nome": "",
    "historia": "",
    "categoria": "",
    "habilidades": [
        {
            "nome": "",
            "tempoDeRecarga": "",
            "descricao": ""
        },
        {
            "nome": "",
            "tempoDeRecarga": "",
            "descricao": ""
        },
        {
            "nome": "",
            "tempoDeRecarga": "",
            "descricao": ""
        },
        {
            "nome": "",
            "tempoDeRecarga": "",
            "descricao": ""
        }
    ]

}

```

### Rotas para o método PATCH - Armas:

**localhost:3000/api/v1/armas/:id** -Neste método de requisição será possível atualizar uma parte do documendo
da arma pelo id, sendo obrigatório utilizar o id da arma para fazer as atualizações e também ter um dos campos
da arma senão ocasionará em erro de validação. Para isso será necessário preencher corretamente os campos de
dados de uma arma utilizando o formato JSON na aba body do PostMan. Então logo abaixo terá a lista das propriedades
que poderão ser alteradas:

obs: Caso necessário leia o template novamente no método POST para lembrar as propriedades que precisam ter um dos
nomes pré-definidos, ou seja, que são construidas com enums.

> É esperado o status code 200(Ok) para atualizações com sucesso e o status code 404(Not found) se não for encontrado nenhuma arma para ser atualizada

```JSON

{
    "nome": "",
    "categoria": "",
    "descricao": "",
    "disparo": "",
    "dano": {
            "cabeca": ,
            "corpo": ,
            "perna":
        }

    }


```

### Rotas para o método DELETE - Agentes:

> É esperado o status code 204(No Content) para exclusão com sucesso e o status code 404(Not found) se não for encontrado nenhuma agente ou arma para ser atualizada

**localhost:3000/api/v1/agentes/:id** - Neste método de requisição será possível excluir um agente pelo id, sendo obrigatório utilizar o id do agente para fazer a exclusão. Para realiza-lá, basta escolher o método de requisição DELETE, colocar a URL e
no final o id do agente. Como no exemplo abaixo:

**localhost:3000/api/v1/agentes/:63bb25327337a83e112d877b**

### Rotas para o método DELETE - Armas:

**localhost:3000/api/v1/armas/:id** - Neste método de requisição será possível excluir uma arma pelo id, sendo obrigatório
utilizar o id da arma para fazer a exclusão. Para realiza-lá, basta escolher o método de requisição DELETE, colocar a URL e
no final o id do agente. Como no exemplo abaixo:

**localhost:3000/api/v1/armas/:63bb25327337a83e112d877b**
