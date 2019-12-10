const express = require('express');
const router = express.Router();
const Create = require('../../actions/Role/create_role.actions');
const Update = require('../../actions/Role/update_role.actions');
const Read = require('../../actions/Role/read_role.actions');
const Delete = require('../../actions/Role/destroy_role.actions');

router.post('/', async (req, res) => {
	try {
		let data = await new Create(req).exec();

		return res.send({
			code: 201,
			status: 'success',
			message: 'Role created successfully',
			data
		});
	} catch (err) {
		return res.send({
			code: 400,
			status: 'error',
			message: err.message
		});
	}
});

router.put('/:id', async (req, res) => {
	try {
		let { id } = req.params;
		let data = await new Update(id, req).update();

		return res.send({
			code: 200,
			status: 'success',
			message: 'Role data updated successfully',
			data
		});
	} catch (err) {
		return res.send({
			code: 400,
			status: 'error',
			message: err.message
		});
	}
});

router.get('/', async (req, res) => {
	try {
		let data = await new Read(req).exec();

		return res.send({
			code: 200,
			status: 'success',
			message: 'Get data request',
			data
		});
	} catch (err) {
		return res.send({
			code: 400,
			status: 'error',
			message: err.message
		});
	}
});

router.delete('/:id', async (req, res) => {
	try {
		let { id } = req.params;
		let data = await new Delete(id).delete();

		return res.send({
			code: 200,
			status: 'success',
			message: 'Role data deleted successfully',
			data
		});
	} catch (err) {
		return res.send({
			code: 400,
			status: 'error',
			message: err.message
		});
	}
});

module.exports = router;
