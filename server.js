// Budget API

const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const budgetModel = require('./models/budget_schema');

let url = 'mongodb://localhost:27017/myBudget';

app.use(express.json());
app.use(express.static('public'));

app.get('/budget', (req, res) => {
    mongoose.connect(url)
    .then(() => {
        console.log("Connected to the database")

        //List all entries
        budgetModel.find({})
                .then((data) => {
                    res.send(data)
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                })
            })
    .catch((connectionError) => {
        console.log(connectionError)
    });

});

app.post("/budget", (req, res) => {

    mongoose.connect(url)
        .then(() => {
            const newData = new budgetModel(req.body);
            budgetModel.insertMany(newData)
            .then((data)=>{
                res.send("Data updated in database");
                mongoose.connection.close();
            })
            .catch((connectionError) => {
                console.log(connectionError)
            })
})  
        .catch((connectionError) => {
            res.send(connectionError);
        })
})



app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});