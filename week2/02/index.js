'use strict';

const request = require('request');
const http = require('http');
const keyword = process.argv[2];
const port = 8000;
const githubApi = 'https://api.github.com/search/repositories?q=' + keyword;

let reposList;

request
    .get(githubApi, {
        headers: {
            'User-Agent': 'request'
        }
    }, (err, res, body) => {
        if (err || res.statusCode !=  200) throw new Error('error');
        reposList = body;
    });


http
    .createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type' : 'text/plain'
        });

        if (req.url == '/getMovie') {
            console.log(reposList);
            res.end(reposList);
        } else {
            res.end('hello, deno');
        }

    })
    .listen(port);

console.log('server running on port:', port);
