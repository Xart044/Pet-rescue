const express = require('express');
const validation = require('express-validation');
const userController = require('../controllers/user');
const paramsValidation = require('./requestParamsValidation');

const router = express.Router();

// PUT /api/user/:id
router.route('/:id')
    .put(validation(paramsValidation.updateUser), userController.update);

module.exports = router;