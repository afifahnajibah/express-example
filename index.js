const express = require('express');
const serveIndex = require('serve-index');

const app = express();
const port = 4000;

app.use(express.json()); 

let accounts = [
    {
        "id": 1,
        "username": "paulhal",
        "role": "admin"
    },
    {
        "id": 2,
        "username": "johndoe",
        "role": "guest"
    },
    {
        "id": 3,
        "username": "sarahjane",
        "role": "guest"
    }
];


app.get('/accounts', (response) => {
    response.json(accounts);
})

app.get('/accounts/:id', (request, response) => {

const accountId = Number(request.params.id);
const getAccount = accounts.find((account) => account.id === accountId);

if (!getAccount) {
    response.status(500).send('Account not found.')
    } else {
    response.json(getAccount);
    }
})

app.post('/accounts', function (request, response) {
    const incomingAccount = request.body;
    accounts.push(incomingAccount);
    
    response.send(accounts);
})

app.put('/accounts/:id', (request, response) => {
    const accountId = Number(request.params.id);
    const body = request.body;
    const account = accounts.find((account) => account.id === accountId);
    const index = accounts.indexOf(account);

    if (!account) {
        response.status(500).send('Account not found.');
    } else {
        const updatedAccount = { ...account, ...body };
    
        accounts[index] = updatedAccount;
    
        response.send(updatedAccount);
    }
})

app.delete('/accounts/:id', (request, response) => {
    const accountId = Number(request.params.id);
    const newAccounts = accounts.filter((account) => account.id != accountId);

    if (!newAccounts) {
        response.status(500).send('Account not found.');
    } else {
        accounts = newAccounts;
        response.send(accounts);
    }
})

app.listen(port, () => console.log(`Example app is listening on port ${port}`));