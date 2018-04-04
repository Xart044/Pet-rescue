const express = require('express');
const router = express.Router();

const petTypeRouter = require('./petType');
const petStatusRouter = require('./petStatus');

router.use('/type', petTypeRouter);
router.use('/status', petStatusRouter);

module.exports = router;