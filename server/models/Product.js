const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
	writer: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	productName: {
		type: String,
		index: true,
		maxlength: 50
	},
	amazonLink: {
		type: String
	},
	originalPrice: {
		type: Number,
		default: 0
	},
	discountedPrice: {
		type: Number,
		default: 0
	},
	totalQuantity: {
		type: Number
	},
	quantityLimitPerDay: {
		type: Number
	},
	images: {
		type: Array,
		default: []
	},
	sold: {
		type: Number,
		maxlength: 100,
		default: 0
	},
	views: {
		type: Number,
		default: 0
	}
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
