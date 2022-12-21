const express = require('express');
const cors = require('cors')

const {PORT} = require('./config/variables');
const app = express();

const {userRouter} = require('./routers')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/ping', (req, res) => {res.json('Pong')})
app.use('/', userRouter);

app.listen(PORT, () => {
    console.log('Server on port', PORT);
})