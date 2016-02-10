'use strict';

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'denodenodeno',
        pass: '' ///removed
    }
});

function SendMail(options) {
    transporter.sendMail(options, (err, info) => {
        if (err) throw err;
        console.log('Message sent: ' + info.response);
    });
}

module.exports = SendMail;