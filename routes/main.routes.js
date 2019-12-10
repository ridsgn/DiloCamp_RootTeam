const login = require('./Auth/login.routes');
const reg = require('./Auth/register.routes');
const user = require('./User/user.routes');
const role = require('./Role/role.routes');
//const book = require('./Book/book.routes');
const reset = require('./ResPass/reset_pass.routes');
const verifyJwt = require('../middleware/jwt.middleware');
const activate = require('./Auth/activation_user.routes');

const routes = app => {
	app.use('/reset', reset);
	app.use('/role', verifyJwt(), role);
	app.use('/user', verifyJwt(), user);
	//app.use('/book', verifyJwt(), book);
	app.use('/login', login);
	app.use('/registration', reg);
};

module.exports = routes;
