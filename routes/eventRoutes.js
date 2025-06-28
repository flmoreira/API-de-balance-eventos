const express = require('express');
const router = express.Router(); /* Cria um roteador para agrupar as rotas */
const controller = require('../controllers/eventController'); /* Importa o controller que contém a lógica */

/* Define a rota GET  /balance que chama a função getBalance do controller */
router.get('/balance', controller.getBalance);

/* Define a rota POST /event que chama a função postEvent do controller */
router.post('/event', controller.postEvent);

/* Define a rota POTS /reset que chama a função potsReset do controlle */
router.post('/reset', controller.reset);


module.exports = router; /* Exporta para ser usado no index.js */
