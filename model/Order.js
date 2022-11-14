const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		orderItems: [
			{
				name: { type: String, required: true },
				quantity: { type: Number, required: true },
				price: { type: Number, required: true },
				image: { type: String, required: true },
				brand: { type: String, required: true },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product'
				}
			}
		],
		fullName: {
			type: String,
			required: true
		},
		shippingAddress: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		zip: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		},
		country: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true,
			default: 'Pending'
		},
		priceSavings: {
			type: Number,
			required: true,
			default: 0
		},
		priceDelivery: {
			type: Number,
			required: true,
			default: 0
		},
		totalPrice: {
			type: Number
		},

		dateOrdered: {
			type: Date,
			default: Date.now
		},
		dateFinish: {
			type: Date,
			default: null
		}
	},
	{ timestamps: true }
);

exports.Order = mongoose.model('Order', OrderSchema);
