const JSONdb = require('simple-json-db');
const users = new JSONdb('./db/db.js');
const {v4: uuidv4} = require('uuid');


module.exports = {
    getAllUsers: (req, res) => {
        res.json(users.storage)
    },

    postUser: (req, res) => {
        const {email, password} = req.body;


        const id = uuidv4();
        const newUser = {
            id,
            email,
            password,
        }

        users.set(id, newUser);
        res.send(newUser);
    }
}