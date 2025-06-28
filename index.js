
const express = require('express'); /* Importa o framework Express */
const app = express();  /* Cria a aplicação Express */
const port = 3000;

app.use(express.json()); /* Middleware para interpretar o corpo das requisições como JSON */


const eventRoutes = require('./routes/eventRoutes'); /* Arquivo de rotas */
app.use('/', eventRoutes); /* Usa as rotas definidas para os endpoints da API */

/* Tratamento de erro */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' }); /* Retorna erro 500 para o cliente */
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`); /* Gatilho */
});
