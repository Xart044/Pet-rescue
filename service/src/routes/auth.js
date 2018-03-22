const express = require('express');
const userController = require('./../controllers/user');

const router = express.Router();

router.get('/signin',(req, res) => {
    res.send({data: 'sign in'});
});

router.route('/signup')
    .post(userController.create);

module.exports = router;