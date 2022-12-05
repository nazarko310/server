const express = require('express');
const {static} = require("express");
const cors = require('cors')

const {PORT} = require('./config/variables');
const app = express();

const {userRouter, authRouter} = require('./routers')
const bodyParser = require("express");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.get('/ping', (req, res) => {res.json('Pong')})
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log('Server on port', PORT);
})