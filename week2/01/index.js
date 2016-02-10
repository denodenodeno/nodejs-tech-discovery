'use strict';

const fs = require('fs');
const http = require('http');
const port = 8000;

http
    .createServer((req, res) => {

        res.writeHead(200, {
            'Content-Type' : 'text/plain'
        });

        if (req.url == '/file.txt') {
            fs.createReadStream(__dirname + '/file.txt').pipe(res);
        } else {
            res.end('hello, deno');
        }

    })
    .listen(port);

console.log('server running on port:', port);
