const { Users } = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
	//REGISTER
	register: async (req, res) => {
		try {
			const user = await Users.findOne({ email: req.body.email });

			if (user) {
				return res.status(500).json({ message: 'Email already exist' });
			} else {
				const salt = await bcrypt.genSalt(10);
				const hashed = await bcrypt.hash(req.body.password, salt);

				const user = new Users({
					fullName: req.body.fullName,
					email: req.body.email,
					phone: req.body.phone,
					passwordHash: hashed
				});
				const refreshToken = authController.generateRefreshToken(user);
				user.refreshToken = refreshToken;

				await user.save();
				const token = authController.generateAccessToken(user);

				res.status(200).json({
					message: 'Register Successfully',
					user,
					token,
					refreshToken
				});
			}
		} catch (err) {
			return res.status(400).json({
				message: err.message
			});
		}
	},

	//GENERATE ACCESS TOKEN
	generateAccessToken: (user) => {
		return jwt.sign(
			{
				userId: user.id,
				admin: user.isAdmin
			},
			process.env.JWT_TOKEN_KEY,
			{ expiresIn: '1d' }
		);
	},

	//GENERATE REFERSH TOKEN
	generateRefreshToken: (user) => {
		return jwt.sign(
			{
				userId: user.id,
				admin: user.isAdmin
			},
			process.env.JWT_TOKEN_KEY,
			{ expiresIn: '365d' }
		);
	},

	//lOGIN
	login: async (req, res) => {
		try {
			const user = await Users.findOne({ email: req.body.email });
			if (!user) {
				return res.status(500).json({ message: 'Email not exit' });
			}

			if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
				const token = authController.generateAccessToken(user);
				const refreshToken = authController.generateRefreshToken(user);

				await user.updateOne({ refreshToken });
				res.status(200).json({
					message: 'Login successfully',
					user,
					token,
					refreshToken
				});
			} else {
				res.status(500).json({ message: 'Password Invalid' });
			}
		} catch (err) {
			return res.status(400).json({
				message: err.message
			});
		}
	},

	requestRefreshToken: async (req, res) => {
		try {
			const user = await Users.findOne({
				refreshToken: req.body.refreshToken
			});

			if (!user) {
				return res.status(400).json({
					message: 'Refresh token does not exits'
				});
			}
			const refreshToken = req.body.refreshToken;
			jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
				if (err) {
					return res.status(403).json(err);
				}

				const token = authController.generateAccessToken(user);
				const refreshToken = authController.generateRefreshToken(user);

				user.updateOne({ refreshToken });

				res.status(200).json({
					message: 'Refresh token successfully',
					token,
					refreshToken
				});
			});
		} catch (err) {
			return res.status(400).json({
				message: err.message
			});
		}
	},

	logout: async (req, res) => {
		try {
			await Users.findByIdAndUpdate(req.userId, { refreshToken: null });

			return res.status(200).json({
				message: 'Logout successfully'
			});
		} catch (err) {
			return res.status(400).json({
				message: err.message
			});
		}
	}
};

module.exports = authController;
