const express = require('express');
const validation = require('express-validation');
const petStatusesController = require('../controllers/admin-petStatuses');
const paramsValidation = require('./requestParamsValidation');

const router = express.Router();

// POST /api/pet/status
router.route('/')
    .post(validation(paramsValidation.petStatusCreate), petStatusesController.create)
    .put(validation(paramsValidation.petStatusUpdate), petStatusesController.update)
    .delete(validation(paramsValidation.petStatusDelete), petStatusesController.delete);
    
module.exports = router;