const router = require('express').Router();

router.get('/', function (req, res) {
	res.send('Welcome to API Ecommerce Nodejs and ExpressJs');
});

module.exports = router;
