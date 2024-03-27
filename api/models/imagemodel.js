const mongoose = require('mongoose');
let imageSchema = new mongoose.Schema({
	name: String,
	img:
	{
		data: Buffer,
		contentType: String
	}
});

const Imagedb = mongoose.model('Image', imageSchema)

module.exports = Imagedb;