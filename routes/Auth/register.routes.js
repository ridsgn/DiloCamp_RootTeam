const express = require('express');
const router = express.Router();
const Register = require('../../actions/Auth/register.actions');
const { check, validationResult, body } = require('express-validator');

router.post(
	'/',
	[
		check('name')
			.not()
			.isEmpty(),
		check('email')
			.not()
			.isEmpty(),
		check('phone')
			.not()
			.isEmpty(),
		check('username')
			.not()
			.isEmpty(),
		check('gender')
			.not()
			.isEmpty(),
		check('password')
			.not()
			.isEmpty()
			.isLength({ min: 8 }),
		check('password_confirmation')
			.not()
			.isEmpty(),
		body('password_confirmation').custom((value, { req }) => {
			if (value != req.body.password) {
				throw new Error('Password confirmation does not match');
			} else {
				return value;
			}
		})
	],

	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.send({
				code: 400,
				status: 'error',
				message: errors.array()
			});
		}

		try {
			let data = await new Register(req).exec();
			return res.send({
				code: 201,
				status: 'success',
				message: 'Register successfully',
				data
			});
		} catch (err) {
			return res.send({
				code: 400,
				status: 'error',
				message: err.message
			});
		}
	}
);

module.exports = router;
