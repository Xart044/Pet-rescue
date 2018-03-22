const express = require('express');
const validation = require('express-validation');
const userController = require('../controllers/user');
const paramsValidation = require('./requestParamsValidation');

const router = express.Router();

router.get('/signin',(req, res) => {
    res.send({data: 'sign in'});
});

router.route('/register')
    .post(validation(paramsValidation.createUser), userController.create);

module.exports = router;