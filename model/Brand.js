const mongoose = require('mongoose');

const BrandListSchema = new mongoose.Schema(
	{
		label: {
			type: String,
			require: true
		},
		isChecked: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Brand', BrandListSchema);
