const User = require('../../models/user.models');
const Role = require('../../models/role.models');

// class Detail {
//     constructor(id) {
//         (this.id = id)
//     }

//     async exec() {
//         try {
//             let data = await User.findOne({
//                 _id: this.id
//             }).exec()

//             if (data === null) {
//                 throw new Error("Data not found")
//             }

//             return {
//                 data
//             }
//         } catch (err) {
//             throw err
//         }
//     }

//     async getAll() {
//         try {
//             let data = await User.find()

//             return data
//         } catch (err) {
//             throw err
//         }
//     }
// }

class Detail {
	constructor(req) {
		this.query = req.query;
	}

	async exec() {
		try {
			let { name, permission, page, limit, sorting } = this.query;
			let params = {
				deleted_at: null
			};

			if (name) {
				params.name = { $regex: name, $options: '$i' };
			}
			if (permission) {
				params.permission = permission;
			}

			let query = await User.find(params).populate([
				{
					path: 'role_id',
					model: Role
				}
			]);
			return query;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
}

module.exports = Detail;
