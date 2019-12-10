const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
	judul: {
		type: String,
		required: true
	},
	isbn: {
		type: String,
		default: null
	},
	kategori: {
		type: String,
		default: null
	},
	author: {
		type: String,
		default: null
	},
	penerbit: {
		type: String,
		default: null
	},
	harga: {
		type: Number,
		default: 0
	},
	stok: {
		type: Number,
		default: 0
	}
});

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;
