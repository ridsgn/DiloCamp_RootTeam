const Role = require('../../models/role.models');

class UpdateRole {
	constructor(id, req) {
		(this.id = id),
			(this.name = req.body.name),
			(this.permission = req.body.permission);
	}

	async update() {
		try {
			let data = {
				_id: id,
				name: this.name,
				permission: this.permission,
				update_at: Date.now()
			};

			let query = await Role.findOneAndUpdate(
				{
					_id: this.id
				},
				data,
				{
					new: true
				}
			).exec();

			return query;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = UpdateRole;
