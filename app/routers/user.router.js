const router = require('express').Router();
const controller = require('../controller/user.controller');
const {postUser} = require("../controller/user.controller");

router.post('/registration', postUser)
router.get('/', controller.getAllUsers)


module.exports = router;