const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		passwordHash: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		wishListIds: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
		refreshToken: {
			type: String
		},
		addressList: [{ type: mongoose.ObjectId, ref: 'Address' }]
	},
	{ timestamps: true }
);

let Users = mongoose.model('User', UserSchema);
module.exports = { Users };
