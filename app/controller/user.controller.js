const {v4: uuidv4} = require('uuid');

const usersFromFile = require('../db/db-user');
const calendarDateFromFile = require('../db/db-calendar');
const fs = require("fs");
const path = require("path");


const users = JSON.parse(JSON.stringify(usersFromFile));
const calendars = JSON.parse(JSON.stringify(calendarDateFromFile));

module.exports = {

    patchPlannedVacation: (req, res) => {
        const {id} = req.body;
        const idCalendar = calendars.map(value => value.id)
        const {statusVacation} = req.body;


        const newCalendar = calendars.map((calendar) => (
            idCalendar.toString() === id.toString()
                ? {...calendar, statusVacation: statusVacation}
                : calendar.statusVacation
        ));

        fs.writeFile(path.join(__dirname, '../db', 'db-calendar.js'), `module.exports = ${JSON.stringify(newCalendar)}`,
            err => {
                console.log(err);
            });


        res.status(200).send('Vacation approve');

    },

    getPlannedVacations: (req, res) => {
        const arrayFromCalendars = Object.keys(calendars).map(key => calendars[key])
        res.send(arrayFromCalendars)
    },

    getCalendarData: (req, res) => {
        const {startVacation, endVacation, userIsLogin} = req.body;
        const id = uuidv4();
        const isCalendarExist = calendars.some(calendar => calendar.userIsLogin === userIsLogin);
        const statusVacation = 'register';

        if (!startVacation || !endVacation) {
            res.status(400).send({massage: 'fill in all fields'});
            return;
        }
        if (isCalendarExist) {
            res.status(416).send({massage: 'Vacation is already register'});
            return;
        }

        calendars.push({id, userIsLogin, startVacation, endVacation, statusVacation});
        fs.writeFile(path.join(__dirname, '../db', 'db-calendar.js'), `module.exports = ${JSON.stringify(calendars)}`,
            err => {
                console.log(err);
            });

        res.status(200).send({massage: 'Vacation is register'});
    },

    getUsers: (req, res) => {
        const arrayFromTodosObj = Object.keys(users).map(key => users[key])
        res.send(arrayFromTodosObj)
    },

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

        const {email, password, userName, secondName, department, position} = req.body;
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

        users.push({id, email, password, userName, secondName, department, position});
        fs.writeFile(path.join(__dirname, '../db', 'db-user.js'), `module.exports = ${JSON.stringify(users)}`,
            err => {
                console.log(err);
            });

        res.status(200).send({massage: 'User register'});
    }
}