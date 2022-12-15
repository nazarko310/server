const router = require('express').Router();
const {registerUser, loginUser} = require("../controller/user.controller");

router.post('/registration', registerUser)
router.post('/login', loginUser)



module.exports = router;