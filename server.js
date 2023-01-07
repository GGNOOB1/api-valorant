const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Configurando as variáveis de ambiente
dotenv.config({ path: './config.env' });

// Importando app
const app = require('./app');

const bdInfo = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD,
);

// Config para eliminar o aviso de depracated
mongoose.set('strictQuery', true);

mongoose
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
