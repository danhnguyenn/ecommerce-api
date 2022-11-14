const { Product } = require('../model/Product');
const { Category } = require('../model/Category');
const multer = require('multer');
const { Users } = require('../model/User');

const productController = {
	//ADD product and update Image

	addProduct: async (req, res) => {
		try {
			const file = req.file;
			if (!file)
				return res.status(400).json({ message: 'No image in the request' });
			const fileName = req.file.filename;
			const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

			const newProduct = new Product({
				title: req.body.title,
				description: req.body.description,
				imageUrl: `${basePath}${fileName}`,
				category: req.body.category,
				size: req.body.size,
				rating: req.body.rating,
				newPrice: req.body.newPrice,
				oldPrice: req.body.oldPrice,
				brand: req.body.brand,
				isNew: req.body.isNew,
				countInStock: req.body.countInStock,
				numReviews: req.body.numReviews
			});
			const savedProduct = await newProduct.save();
			if (req.body.category) {
				const category = Category.findById(req.body.category);
				await category.updateOne({ $push: { products: savedProduct._id } });
			}
			res.status(200).json({ message: 'Add Successfully', savedProduct });
		} catch (err) {
			res.status(500).json(err);
		}
	},
	//Get All Product
	getAllProduct: async (req, res) => {
		try {
			let filter = {};
			let {
				categories,
				page,
				limit,
				sort,
				brands,
				search,
				salePrice_gte,
				salePrice_lte
			} = req.query;

			let count = await Product.count();
			if (!page) {
				page = 1;
			} else {
				page = parseInt(page);
			}
			if (!limit) {
				limit = 10;
			} else {
				limit = parseInt(limit);
			}
			const skip = (page - 1) * 5;
			if (categories) {
				filter = { category: categories };
				count = await Product.count(filter);
			} else if (brands) {
				filter = { brand: brands.split(',') };
				count = await Product.count(filter);
			} else if (search) {
				filter = search
					? {
							title: {
								$regex: search,
								$options: 'i'
							}
					  }
					: {};
				count = await Product.count(filter);
			} else if (salePrice_gte > 0 && salePrice_gte > 0) {
				salePrice_gte = parseInt(salePrice_gte);
				salePrice_lte = parseInt(salePrice_lte);
				filter = {
					newPrice: { $gte: salePrice_gte, $lte: salePrice_lte }
				};
				count = await Product.count(filter);
			}

			const products = await Product.find(filter)
				.sort({ createdAt: 'asc' })
				.skip(skip)
				.limit(limit);
			res.status(200).json({
				message: 'Get Successfully',
				pagination: {
					page,
					limit,
					total: count
				},
				products
			});
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//Get Product Detail
	getProductDetail: async (req, res) => {
		try {
			const product = await Product.findById(req.params.id).populate(
				'category'
			);
			res.status(200).json({ message: 'Get Detail Successfully', product });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//Update Product
	updateProduct: async (req, res) => {
		try {
			const product = await Product.findById(req.params.id);
			await product.updateOne({ $set: req.body });
			res.status(200).json({ message: 'Updated Successfully' });
		} catch (err) {
			res.status(500).json(err);
		}
	}
};

module.exports = productController;
