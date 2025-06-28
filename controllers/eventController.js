const contas = {}; /* Objeto em memória para armazenar os saldos das contas */

/* Função que trata o endpoint GET /balance */
exports.getBalance = (req, res) => {
    try {
        const accountId = req.query.account_id; /* Pega o ID da conta da query string */
        if (!contas[accountId]) {
            return res.status(404).send('0'); /* Se a conta não existir, retorna 0 com status 404 */
        }

        return res.status(200).send(contas[accountId].toString()); /* Retorna o saldo da conta */
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao consultar saldo' }); /* Erro interno */
    }
};

/* Função que trata o endpoint POST /event */
exports.postEvent = (req, res) => {
    try {
        const { type, origin, destination, amount } = req.body; /* Extrai os dados da requisição */
        if (type === 'deposit') {
            /* Se a conta não existir ainda, inicializa com 0 e soma o valor */
            contas[destination] = (contas[destination] || 0) + amount;
            return res.status(201).json({
                destination: {
                    id: destination,
                    balance: contas[destination]
                }
            });
        }

        if (type === 'withdraw') {
            /* Verifica se a conta existe e tem saldo suficiente */
            if (!contas[origin] || contas[origin] < amount) {
                return res.status(404).send(); /* Erro 404 se não for possível sacar */
            }

            contas[origin] -= amount; /* Subtrai o valor da conta */

            return res.status(201).json({
                origin: {
                    id: origin,
                    balance: contas[origin]
                }
            });
        }

        if (type === 'transfer') {
            /* Verifica se a conta de origem tem saldo */
            if (!contas[origin] || contas[origin] < amount) {
                return res.status(404).send(); /* Erro 404 se saldo for insuficiente */
            }

            contas[origin] -= amount; /* Subtrai da origem */
            contas[destination] = (contas[destination] || 0) + amount; /* Adiciona na conta destino */


            return res.status(201).json({
                origin: {
                    id: origin,
                    balance: contas[origin]
                },
                destination: {
                    id: destination,
                    balance: contas[destination]
                }
            });
        }
        

        /* Se o tipo de evento for inválido */
        return res.status(400).json({ error: 'Tipo de evento inválido' });

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao processar evento' }); /* Erro interno */
    }
};

/* Função que trata o endpoint POST /reset */
exports.reset = (req, res) => {
    try {
        for (const conta in contas) {
            delete contas[conta]; /* Remove cada conta */
        }
        return res.status(200).send('OK'); /* Retorna sucesso */
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao resetar sistema' });
    }
};
