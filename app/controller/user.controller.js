const {v4: uuidv4} = require('uuid');

const usersFromFile = require('../db/db');
const fs = require("fs");
const path = require("path");
const users = JSON.parse(JSON.stringify(usersFromFile));

module.exports = {

    loginUser: (req, res) => {
        const {email, password} = req.body;

        const logUser = users.find(user => user.email === email && user.password === password);
        if (logUser) {
            res.status(200).send({massage: 'User is login'})
            return;
        }
        res.status(404).send({massage: 'Password or email is incorrect'});
    },


    registerUser: (req, res) => {

        const {email, password, userName} = req.body;
        const id = uuidv4();
        const isUserExist = users.some(user => user.email === email);

        if (!email || !password) {
            res.status(400).send({massage: 'fill in all fields'});
            return;
        }
        if (isUserExist) {
            res.status(400).send({massage: 'User is already register'});
            return;
        }

        users.push({id, email, password, userName});
        fs.writeFile(path.join(__dirname, '../db', 'db.js'), `module.exports = ${JSON.stringify(users)}`,
            err => {
                console.log(err);
            });

        res.status(200).send({massage: 'User register'});
    }
}