const express = require('express');
const expressHbs = require('express-handlebars');
const cors = require('cors')

const {PORT} = require('./config/variables');
const app = express();

const {userRouter} = require('./routers')
const path = require("path");


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));



app.get('/ping', (req, res) => {res.json('Pong')})
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log('Server on port', PORT);
})