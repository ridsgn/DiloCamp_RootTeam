const UserResetPass = require('../../models/reset_pass.models');
const User = require('../../models/user.models');
const { randomKey } = require('../../lib/generatorkey');
const SendMail = require('nodemailer');

class ForgotPassword {
	constructor(email) {
		this.email = email;
	}

	async exec() {
		try {
			const options = {
				service: 'gmail',
				auth: {
					user: process.env.EMAIL_USERNAME,
					pass: process.env.EMAIL_PASSWORD
				}
			};

			let user = await User.findOne({
				email: this.email
			}).exec();

			if (user === null) {
				throw new Error('User tidak ditemukan');
			}

			let token = randomKey(54, 'aA#');
			let password = new UserResetPass({
				email: this.email,
				token
			});
			await password.save();

			const transporter = await SendMail.createTransport(options);

			const data = {
				from: 'rizukifirumanshaa96@gmail.com',
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

module.exports = ForgotPassword;
