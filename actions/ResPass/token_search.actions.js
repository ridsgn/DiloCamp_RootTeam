const UserResetPass = require('../../models/reset_pass.models');

class TokenSearch {
	constructor(params) {
		this.params = params;
	}

	async exec() {
		try {
			let data = await UserResetPass.findOne(this.params).exec();

			if (data === null) {
				throw new Error('Data tidak ditemukan');
			}

			return data;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = TokenSearch;
