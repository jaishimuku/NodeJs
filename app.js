const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const ticketsRoute = require('./app/routes/tickets');
const userRoutes = require('./app/routes/user');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use('/tickets', ticketsRoute);
app.use('/user', userRoutes);


app.get('/', (req, res, next) => {
    res.send("Welcome to My app")
})
app.get('*', (req, res) => {
    res.send("Wrong route")
})
module.exports = app;