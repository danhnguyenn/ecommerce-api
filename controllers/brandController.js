const Brand = require('../model/Brand');

const brandController = {
	addBrand: async (req, res) => {
		try {
			const newBrand = new Brand({
				label: req.body.label
			});
			const savedBrand = await newBrand.save();
			res.status(200).json({ message: 'Add Sucessfully', savedBrand });
		} catch (err) {
			res.status(500).json(err);
		}
	},
	getAll: async (req, res) => {
		try {
			const brands = await Brand.find();
			res.status(200).json({ message: 'Get Sucessfully', brands });
		} catch (err) {
			res.status(500).json(err);
		}
	},
	updateBrand: async (req, res) => {
		try {
			const brand = await Brand.findById(req.params.id);
			await brand.updateOne({ $set: req.body });
			res.status(200).json({ message: 'Updated Successfully' });
		} catch (err) {
			res.status(500).json(err);
		}
	}
};

module.exports = brandController;
