const express = require('express');
const validation = require('express-validation');
const petTypesController = require('../controllers/admin-petTypes');
const paramsValidation = require('./requestParamsValidation');

const router = express.Router();

// POST /api/pet/type
router.route('/')
    .post(validation(paramsValidation.petTypeCreate), petTypesController.create)
    .put(validation(paramsValidation.petTypeUpdate), petTypesController.update)
    .delete(validation(paramsValidation.petTypeDelete), petTypesController.delete);

module.exports = router;