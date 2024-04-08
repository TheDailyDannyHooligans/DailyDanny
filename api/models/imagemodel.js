const mongoose = require('mongoose');

let imageSchema = new mongoose.Schema({
	img:
	{
		data: Buffer,
		contentType: String
	},
	advertisement: {
		type: Boolean,
		required: true
	}
});

const Imagedb = mongoose.model('Image', imageSchema)

module.exports = Imagedb;