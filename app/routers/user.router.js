const router = require('express').Router();
const {registerUser, loginUser, getUsers, getCalendarData, getPlannedVacations} = require("../controller/user.controller");

router.get('/users', getUsers)
router.get('/planned-vacation', getPlannedVacations)
router.post('/registration', registerUser)
router.post('/login', loginUser)
router.post('/calendar', getCalendarData)



module.exports = router;