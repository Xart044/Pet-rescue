const express = require('express');
const router = express.Router();

router.get('/signin',(req, res) => {
    res.send({data: 'sign in'});
});

router.get('/signup',(req, res) => {
    res.send({data: 'sign up'});
});

module.exports = router;