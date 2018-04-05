const express = require('express');
const validation = require('express-validation');
const shelterController = require('../controllers/shelter');
const adminShelterController = require('../controllers/admin-shelter');
const paramsValidation = require('./requestParamsValidation');

const router = express.Router();

// POST/api/shelter
router.route('/')
    .post(validation(paramsValidation.createShelter), adminShelterController.create);

// PUT/DELETE /api/shelter/:id
router.route('/:id')
    .put(validation(paramsValidation.updateShelter), shelterController.update)
    .delete(validation(paramsValidation.deleteShelter), adminShelterController.delete);

module.exports = router;