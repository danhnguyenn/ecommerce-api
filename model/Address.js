const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		apartment: {
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
		country: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		},
		userId: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

let Address = mongoose.model('Address', AddressSchema);
module.exports = { Address };
