const express = require('express');
const router = express.Router();
const ForgotPassword = require('../../actions/ResPass/forgot_pass.actions');
const TokenSearch = require('../../actions/ResPass/token_search.actions');
const Reset = require('../../actions/ResPass/reset_pass.actions');

router.post('/', async (req, res) => {
	try {
		await new ForgotPassword(req.body.email).exec();

		return res.send({
			status: 'success',
			message: 'Reset password successfully'
		});
	} catch (err) {
		return res.status(400).json({
			status: 'error',
			message: err.message
		});
	}
});

router.get('/:token', async (req, res) => {
	try {
		let data = await new TokenSearch({
			token: req.params.token
		}).exec();

		return res.send({
			status: 'success',
			data
		});
	} catch (err) {
		return res.status(400).json({
			status: 'error',
			message: err.message
		});
	}
});

router.post('/:token', async (req, res) => {
	try {
		let data = await new Reset(req.body.password, req.params.token).exec();

		return res.send({
			status: 'success',
			data
		});
	} catch (err) {
		return res.status(400).json({
			status: 'error',
			message: err.message
		});
	}
});

module.exports = router;
