const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
			}
		],
		imageUrl: {
			type: String
		}
	},
	{ timestamps: true }
);

let Category = mongoose.model('Category', CategorySchema);
module.exports = { Category };
