const UserResetPass = require('../../models/reset_pass.models');
const User = require('../../models/user.models');
const TokenSearch = require('../ResPass/token_search.actions');
const bcrypt = require('bcryptjs');

class Reset {
	constructor(password, token) {
		this.password = password;
		this.token = token;
	}

	async exec() {
		try {
			let data = await new TokenSearch({
				token: this.token
			}).exec();

			let password = bcrypt.hashSync(this.password, 8);
			let user = await User.findOne({
				email: data.email
			}).exec();

			if (user === null) {
				throw new Error('User tidak ditemukan');
			}

			let updateUser = await User.findOneAndUpdate(
				{
					_id: user._id
				},
				{
					password,
					updated_at: Date.now()
				}
			).exec();

			await UserResetPass.findOneAndDelete({
				token: this.token
			}).exec();

			return updateUser;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = Reset;
