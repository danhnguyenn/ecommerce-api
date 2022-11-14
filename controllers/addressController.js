const { Address } = require('../model/Address');
const { Users } = require('../model/User');

const addressController = {
	//Add category
	addAddress: async (req, res) => {
		try {
			const newAddress = new Address({
				fullName: req.body.fullName,
				address: req.body.address,
				apartment: req.body.apartment,
				city: req.body.city,
				zip: req.body.zip,
				country: req.body.country,
				phone: req.body.phone,
				userId: req.body.userId
			});
			const address = await newAddress.save();

			if (req.body.userId) {
				const user = Users.findById(req.body.userId);
				await user.updateOne({ $push: { addressList: address._id } });
			}

			res.status(200).json({ message: 'Add Sucessfully', address });
		} catch (err) {
			res.status(500).json(err);
		}
	},
	deleleAddress: async (req, res) => {
		await Users.updateMany(
			{ addressList: req.params.id },
			{ $pull: { addressList: req.params.id } }
		);
		await Address.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Deleted Successfully' });
	}
};

module.exports = addressController;
