const User = require('../../models/user.models');
const Role = require('../../models/role.models');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { randomKey } = require('../../lib/generatorkey');
const token = randomKey(54, 'aA#');

class Register {
	constructor(req) {
		(this.name = req.body.name),
			(this.email = req.body.email),
			(this.phone = req.body.phone),
			(this.username = req.body.username),
			(this.password = req.body.password),
			(this.password_confirm = req.body.password_confirm),
			(this.gender = req.body.gender),
			(this.activation_token = token);
	}

	async exec() {
		try {
			const options = {
				host: process.env.EMAIL_HOST,
				port: process.env.EMAIL_PORT,
				secure: false,
				auth: {
					user: process.env.EMAIL_USERNAME,
					pass: process.env.EMAIL_PASSWORD
				}
			};

			let password = bcrypt.hashSync(this.password, 8);
			// console.log(`Hashing password ${password}`)
			let role = await Role.findOne({
				name: 'User'
			}).exec();

			let insert_data = {
				name: this.name,
				username: this.username,
				email: this.email,
				phone: this.phone,
				gender: this.gender,
				activated_at: null,
				activation_token: this.activation_token,
				role_id: role._id,
				password
			};

			let query = new User(insert_data);
			await query.save();

			const transporter = await nodemailer.createTransport(options);

			const data = {
				to: this.email,
				subject: 'Register and GET token to verify',
				text: `Your token for verify is: ${token}`,
				html: ``
			};

			setTimeout(async () => {
				return await transporter.sendMail(data, (error, resp) => {
					if (error) {
						console.log(error);
					}
				});
			}, 600);

			return {
				token,
				expires_in: '24 hours'
			};
		} catch (err) {
			throw err;
		}
	}
}

module.exports = Register;
