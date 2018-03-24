const { sendSMS } = require('../services/smsService');

const generateVerificationNumber = () => Math.floor(Math.random() * 8999) + 1000;

const sendVerificationSMS = (phoneNo, verificationNumber) => sendSMS(phoneNo, `Your activation number is: ${verificationNumber}`);

module.exports = { generateVerificationNumber, sendVerificationSMS };