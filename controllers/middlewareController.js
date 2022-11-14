const jwt = require('jsonwebtoken');

const middlewareController = {
	//Verify Token
	verifyToken: (req, res, next) => {
		const token = req.headers.authorization;
		if (token) {
			//Bearer 123456
			const accessToken = token.split(' ')[1];
			jwt.verify(accessToken, process.env.JWT_TOKEN_KEY, (err, user) => {
				if (err) {
					return res.status(403).json({ message: 'Token is not valid' });
				}
				req.user = user;
				next();
			});
		} else {
			return res.status(403).json({ message: "You 're not authenticated" });
		}
	},
	verifyTokenIsAdmin: (req, res, next) => {
		middlewareController.verifyToken(req, res, () => {
			if (req.user.userId === req.params.id || req.user.admin) {
				next();
			} else {
				return res.status(403).json({ message: "You 're not allowed access" });
			}
		});
	}
};

module.exports = middlewareController;
