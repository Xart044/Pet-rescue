const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const userRouter = require('./user');
const shelterRouter = require('./shelter');
const petRouter = require('./pet');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/shelter', shelterRouter);
router.use('/pet', petRouter);

module.exports = router;