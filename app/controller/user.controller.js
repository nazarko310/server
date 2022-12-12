const {v4: uuidv4} = require('uuid');

const usersFromFile = require('../db/db');
const fs = require("fs");
const path = require("path");
const users = JSON.parse(JSON.stringify(usersFromFile));

module.exports = {
    getUsers: (req, res) => {
        const arrayFromUsersObj = Object.keys(users).map(key => users[key])

        res.send(arrayFromUsersObj)
    },
    loginUser: (req, res) => {
        const {email, password} = req.body;

        const logUser = users.find(user => user.email === email && user.password === password);
        if (!logUser) {
            res.status(404).json('login_unsuccessful');

        }
        res.status(200).json(`login_successful`);
    },


    registerUser: (req, res) => {

        const {email, password, userName} = req.body;
        const id = uuidv4();
        const isUserExist = users.some(user => user.email === email);

        if (!email || !password) {
            res.status(400).render('register', {info: 'fill in all fields'});
            return;
        }
        if (isUserExist) {
            res.status(400).render('register', {info: 'User with this mail already exists'});
            return;
        }

        users.push({id, email, password, userName});
        fs.writeFile(path.join(__dirname, '../db', 'db.js'), `module.exports = ${JSON.stringify(users)}`,
            err => {
                console.log(err);
            });

        res.json('register_success');
    }
}