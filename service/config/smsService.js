const Nexmo = require('nexmo');
const config = require('./index');

const nexmo = new Nexmo({
  apiKey: config.nexmo.api_key,
  apiSecret: config.nexmo.api_secret
});

const sendSMS = (receiverNumber, message) => {
    return new Promise((resolve, reject) => {
        nexmo.message.sendSms(config.nexmo.from, receiverNumber, message, (error, response) => {
            if(error) {
                console.log(error);
                reject(error);
            } else if(response.messages[0].status != '0') {
                console.log('Nexmo returned back a non-zero status');
                reject('Nexmo returned back a non-zero status');
            } else {
                console.log(response);
                resolve(response);
            }
        });
    });
};

module.exports = { sendSMS };