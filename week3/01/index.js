'use strict';

const request = require('request');
const http = require('http');
const keyword = process.argv[2];
const port = 8000;
const githubApi = 'https://api.github.com/search/repositories?q=' + keyword;

let reposList;

makerRequest()
    .then((res) => {
        reposList = res;
        createServer();
    })
    .catch((err) => {
        console.log(err);
    });



function makerRequest() {
    return new Promise((resolve, reject) => {
        request
            .get(githubApi, {
                headers: {
                    'User-Agent': 'request'
                }
            }, (err, res, body) => {
                if (err || res.statusCode !=  200) reject('error');
                resolve(body);
            });
    })
}

function createServer() {
    http
        .createServer((req, res) => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            if (req.url == '/getRepos') {
                console.log(reposList);
                res.end(reposList);
            } else {
                res.end('hello, deno');
            }

        })
        .listen(port);

    console.log('server running on port:', port);

}