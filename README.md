# 💳 API de Balance & Eventos

## 📄 Descrição

Projeto simples de API bancária em Node.js que permite:

- Resetar o estado das contas
- Consultar saldo
- Depositar em conta
- Sacar de conta
- Transferir entre contas

Implementado usando **Express**, com armazenamento em memória (sem persistência em banco de dados), para fins didáticos e testes.

---

## 🚀 Como executar

### 1️⃣ Instalar dependências
npm install
### 2️⃣ Iniciar o servidor
node index.js
A API ficará disponível em - http://localhost:3000

🧪 Endpoints
🔄 Reset
POST /reset

Reseta todas as contas para estado inicial (sem saldo).

💰 Consultar saldo
GET /balance?account_id=100

Retorna o saldo da conta.

Se a conta não existir, retorna 404 com body 0.

💵 Evento - Deposit
POST /event

Body JSON:
{
  "type": "deposit",
  "destination": "100",
  "amount": 10
}
Retorna status 201 com saldo atualizado.  

💸 Evento - Withdraw
POST /event

Body JSON:
{
  "type": "withdraw",
  "origin": "100",
  "amount": 5
}
Retorna status 201 com saldo atualizado ou 404 se a conta não existir ou saldo insuficiente.

🔁 Evento - Transfer
POST /event

Body JSON:
{
  "type": "transfer",
  "origin": "100",
  "amount": 15,
  "destination": "300"
}
Retorna status 201 com saldo atualizado das duas contas ou 404 se conta origem não existir ou saldo for insuficiente.

⚙️ Tecnologias usadas

Node.js

Express

🙌 Autor

Francisco Moreira
