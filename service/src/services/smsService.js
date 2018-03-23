const Nexmo = require('nexmo');
const config = require('../../config');

const nexmo = new Nexmo({
    apiKey: config.nexmo.api_key,
    apiSecret: config.nexmo.api_secret
});

const sendSMS = (receiverNumber, message) => {
    return new Promise((resolve, reject) => {
        nexmo.message.sendSms(config.nexmo.from, receiverNumber, message, (error, response) => {
            if(error) {
                reject(error);
            } else if(response.messages[0].status != '0') {
                reject('Nexmo returned back a non-zero status');
            } else {
                resolve(response);
            }
        });
    });
};

module.exports = { sendSMS };