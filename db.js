const mongoose = require('mongoose');
require('dotenv').config();

const host = process.env.HOST;

mongoose.connect(host, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

mongoose.set('useCreateIndex', true);
