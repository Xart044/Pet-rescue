const express = require('express');
const validation = require('express-validation');
const petTypesController = require('../controllers/admin-petTypes');
const paramsValidation = require('./requestParamsValidation');

const router = express.Router();

// POST /api/pet/type
router.route('/')
    .post(validation(paramsValidation.petTypeCreate), petTypesController.create);

// PUT /api/pet/type
router.route('/')
    .put(validation(paramsValidation.petTypeUpdate), petTypesController.update);

module.exports = router;