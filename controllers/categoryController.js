const { Category } = require('../model/Category');

const categoryController = {
	//Add category
	addCategory: async (req, res) => {
		try {
			const newCategory = new Category({
				name: req.body.name,
				product: req.body.products,
				color: req.body.color,
				imageUrl: req.body.imageUrl
			});
			const savedCategory = await newCategory.save();
			res.status(200).json({ message: 'Add Sucessfully', savedCategory });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//Get ALl Category
	getAllCategory: async (req, res) => {
		try {
			const categories = await Category.find();
			res.status(200).json({ message: 'Get Sucessfully', categories });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//Get Category Detail
	getCategoryDetail: async (req, res) => {
		try {
			const category = await Category.findById(req.params.id).populate(
				'products'
			);
			res.status(200).json({ message: 'Get Detail Successfully', category });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//Update
	updateCategory: async (req, res) => {
		try {
			const category = await Category.findByIdAndUpdate(
				req.params.id,
				req.body
			);
			res.status(200).json({ message: 'Updated Successfully' });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//Delete

	deleteCategory: async (req, res) => {
		try {
			const categoryDeleted = await Category.findByIdAndRemove(req.params.id);
			res.status(200).json({ message: 'Deleted Successfully' });
		} catch (err) {
			res.status(500).json(err);
		}
	}
};

module.exports = categoryController;
