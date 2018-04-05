const express = require('express');
const validation = require('express-validation');
const userController = require('../controllers/user');
const paramsValidation = require('./requestParamsValidation');

const router = express.Router();

// PUT/DELETE /api/user/:id
router.route('/:id')
    .put(validation(paramsValidation.updateUser), userController.update)
    .delete(validation(paramsValidation.deleteUser), userController.delete);

module.exports = router;