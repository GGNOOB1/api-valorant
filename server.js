const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Configurando as variáveis de ambiente
dotenv.config({ path: './config.env' });

// Importando app
const app = require('./app');

// Substituindo a string <password> para a real senha do bd
const bdInfo = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD,
);

/* Config para previnir o seguinte erro: 
Mongoose: the strictQuery option will be switched back to false by default 
in Mongoose 7. Use mongoose.set('strictQuery', false); if you want to prepare for this change. 
Or use mongoose.set('strictQuery', true); to suppress this warning.*/
mongoose.set('strictQuery', true);

// Estabelecendo conexão com o banco de dados
mongoose

    // Config uneUnifiedTopology para eliminar o aviso de depracated pois foi mudado o pacote de
    // gerenciamento de servidor e mecanismo
    .connect(bdInfo, { useUnifiedTopology: true })
    .then(() => {
        console.log('Conexão bem sucedida');
    })
    .catch(err => {
        console.log(err);
    });

// Definindo porta do servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
