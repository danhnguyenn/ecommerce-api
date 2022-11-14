const router = require('express').Router();
const authController = require('../controllers/authController');
const { Users } = require('../model/User');
const middlewareController = require('../controllers/middlewareController');

//Register
router.post('/register', authController.register);

//Login
router.post('/login', authController.login);

//Refresh
router.post('/refresh', authController.requestRefreshToken);

//Logout
router.patch(
	'/logout',
	middlewareController.verifyToken,
	authController.logout
);
module.exports = router;
