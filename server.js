// Budget API

const express = require('express');
const app = express();
const budgetData = require("./budgetData.json");
const port = 3000;

app.use('/', express.static('public'));

app.get('/budget', (req, res) => {
    res.json(budgetData);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});