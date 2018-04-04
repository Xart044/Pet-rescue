const express = require('express');
const router = express.Router();

const petTypeRouter = require('./petType');

router.use('/type', petTypeRouter);

module.exports = router;