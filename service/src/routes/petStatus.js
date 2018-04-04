const express = require('express');
const validation = require('express-validation');
const petStatusesController = require('../controllers/admin-petStatuses');
const paramsValidation = require('./requestParamsValidation');

const router = express.Router();

// POST /api/pet/status
router.route('/')
    .post(validation(paramsValidation.petStatusCreate), petStatusesController.create);

// PUT /api/pet/status
router.route('/')
    .put(validation(paramsValidation.petStatusUpdate), petStatusesController.update);

module.exports = router;