const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true
		},
		description: {
			type: String
		},
		imageUrl: {
			type: String,
			required: true
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category'
		},
		size: {
			type: [String],
			default: ['S', 'M', 'XL', 'XXl']
		},
		rating: {
			type: Number,
			required: true,
			default: 0
		},
		newPrice: {
			type: Number,
			required: true
		},
		oldPrice: {
			type: Number,
			required: true
		},
		brand: {
			type: String,
			required: true
		},
		isNew: {
			type: Boolean,
			default: true
		},
		countInStock: {
			type: Number,
			min: 0,
			max: 100
		},
		numReviews: {
			type: Number,
			default: 0
		},
		isPromotion: {
			type: Boolean,
			default: false
		},
		promotionPercent: {
			type: Number,
			default: 0
		},
		isFreeShip: {
			type: Boolean,
			default: false
		},
		isTrending: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
);

let Product = mongoose.model('Product', ProductSchema);
module.exports = { Product };
