const express = require('express');
const validation = require('express-validation');
const shelterController = require('../controllers/shelter');
const adminShelterController = require('../controllers/admin-shelter');
const paramsValidation = require('./requestParamsValidation');

const router = express.Router();

// POST /api/shelter
router.route('/')
    .post(validation(paramsValidation.shelterCreate), adminShelterController.create);

// PUT/DELETE /api/shelter/:id
router.route('/:id')
    .put(validation(paramsValidation.shelterUpdate), shelterController.update)
    .delete(adminShelterController.delete);


// POST /api/shelter/:id/volunteers
router.route('/:id/volunteers')
    .post(validation(paramsValidation.shelterAddVolunteers), shelterController.addVolunteers);

module.exports = router;