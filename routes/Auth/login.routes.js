const express = require('express');
const router = express.Router();
const Login = require('../../actions/Auth/login.actions');

router.post('/', async (req, res) => {
	try {
		let data = await new Login(req).exec();

		return res.send({
			code: 200,
			status: 'success',
			message: 'login successfully!',
			data
		});
	} catch (err) {
		return res.send({
			code: 400,
			status: 'error coy',
			message: err.message
		});
	}
});

module.exports = router;
