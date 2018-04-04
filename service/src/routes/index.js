const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const petRouter = require('./pet');

router.use('/auth', authRouter);
router.use('/pet', petRouter);

module.exports = router;