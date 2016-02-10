'use strict';

const cron = require('node-cron');
const GetPage = require('./get-page');
const SendMail = require('./send-mail');
const url = 'https://news.ycombinator.com/newest';

let options = {
    from: 'denislav.ganchev@gmail.com',
    to: 'denodenodeno@gmail.com',
    subject: 'New things',
    text: 'Check the html.'
};

///run cron job every 30 second; get, save, open in browser
cron.schedule('*/30 * * * * *', () => {
    GetPage(url);
    SendMail(options); //configured
});