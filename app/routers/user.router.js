const router = require('express').Router();
const controller = require('../controller/user.controller');
const {registerUser, loginUser,getUsers} = require("../controller/user.controller");

router.post('/registration', registerUser)
router.post('/login', loginUser)
router.get('/', getUsers)


module.exports = router;