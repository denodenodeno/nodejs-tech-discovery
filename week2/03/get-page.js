'use strict';

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const exec = require('child_process').exec;

const headers = {
    headers: {
        'User-Agent': 'request'
    }
};

function GetPage(url) {
    request(url, headers, (err, response, body) => {
        if (err) throw err;

        var $ = cheerio.load(body).html();

        fs.writeFile('./output.html', $, 'utf8', (err) => {
            if (err) throw err;
            console.log('saved');
            exec('open output.html');
        })

    });
}


module.exports = GetPage;