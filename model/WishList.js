const mongoose = require('mongoose');

const WishListSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },

		products: [
			{
				productId: {
					type: String
				}
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('WishList', WishListSchema);
