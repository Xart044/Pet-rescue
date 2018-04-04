const express = require('express');
const validation = require('express-validation');
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
const paramsValidation = require('./requestParamsValidation');

const router = express.Router();

// POST /api/auth/signin
router.route('/signin')
    .post(validation(paramsValidation.signin), authController.signin);

// POST /api/auth/register
router.route('/register')
    .post(validation(paramsValidation.userRegister), userController.register);

// POST /api/auth/activate
router.route('/activate')
    .post(validation(paramsValidation.accountActivate), authController.activateAccount);

// POST /api/auth/send-verification
router.route('/send-verification')
    .post(validation(paramsValidation.sendVerification), authController.sendVerification);

module.exports = router;