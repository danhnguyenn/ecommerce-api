const { Product } = require('../model/Product');
const { Users } = require('../model/User');

const userController = {
	//Get All User
	getAll: async (req, res) => {
		try {
			const users = await Users.find().select('-passwordHash');
			res.status(200).json({ message: 'Get Successfully', users });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//Get Single User
	getUserSingle: async (req, res) => {
		try {
			const user = await Users.findById(req.params.id).select('-passwordHash');
			res.status(200).json({ message: 'Get Successfully', user });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	getUserSingleAddress: async (req, res) => {
		try {
			const user = await Users.findById(req.params.id)
				.select('-passwordHash')
				.populate('addressList');
			res.status(200).json({ message: 'Get Successfully', user });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	getUserLikedProduct: async (req, res) => {
		try {
			const user = await Users.findById(req.params.id)
				.select('-passwordHash')
				.populate('wishListIds');
			res.status(200).json({ message: 'Get Successfully', user });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//User liked product
	likedProductList: async (req, res) => {
		try {
			if (req.params.userId) {
				const user = await Users.find({
					_id: req.params.userId,
					wishListIds: req.params.productId
				});

				if (!user.length) {
					await Users.findOneAndUpdate(
						{ _id: req.params.userId },
						{ $push: { wishListIds: req.params.productId } }
					);
					const user = await Users.findOne({
						_id: req.params.userId
					});
					return res.status(200).json({ message: 'Liked Successfully', user });
				}
				return res.status(200).json({ message: 'Already Loved' });
			}
		} catch (err) {
			return res.status(400).json({
				message: err.message
			});
		}
	},

	deleteLikedProduct: async (req, res) => {
		await Users.updateMany(
			{ wishListIds: req.params.id },
			{ $pull: { wishListIds: req.params.id } }
		);
		res.status(200).json({ message: 'Deleted Successfully' });
	},

	deleteUser: async (req, res) => {
		try {
			await Users.findByIdAndDelete(req.params.id);
			res.status(200).json('Deleted Sucessfully');
		} catch (err) {
			res.status(500).json(err);
		}
	},
	addressAdd: async (req, res) => {
		try {
			const product = await Product.findById(req.params.productId);
			if (req.body.userId) {
				const user = Users.findById(req.body.userId);
				await user.updateOne({ $push: { wishListIds: product._id } });
			}
			res.status(200).json({ message: 'Add Successfully' });
		} catch (err) {
			res.status(500).json(err);
		}
	}
};

module.exports = userController;
