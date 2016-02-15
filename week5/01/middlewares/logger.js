'use strict';

/**
 * Module exports.
 * @public
 */
module.exports = Logger;


/**
 * Module dependencies.
 * @private
 */
const fs = require('fs');
const stringify = require('stringify-object');


/**
 * Logger middleware
 * @public
 */

function Logger(options) {

    let cwd = process.cwd();


    //////
    init();

    ///Public
    function logRequest(req, res, next) {
        let fileContent = generateFileContent(req);

        createFile(fileContent)
            .then((res) => {
                console.log('File created.');
                req.HTTPMethod = req.method;
                req.fullUrl = req.headers.host + req.originalUrl;
                req.IP = req.connection.remoteAddress;
                req.timestamp = new Date();
                return true;
            })
        .then(() => {
            next();
        });
    }

    function logErrors(err, req, res, next) {
        req.errorStack = err.stack;
        req.memoryUsage = process.memoryUsage();
        next();
    }


    ///Private functions
    function init() {
        if (!hasDirCreated()) {
            createLogDir()
                .then(() => {
                    console.log('logs dir created.')
                });
        }
    }

    function createLogDir() {
        return Promise.resolve(fs.mkdirSync(cwd + '/logs'));
    }

    function createFile(fileContent) {
        let _logFolderPath = cwd + '/logs/log-' + new Date().getTime() + '.txt';
        return new Promise((resolve, reject) => {
            fs.writeFile(_logFolderPath, stringify(fileContent, {
                indent: '  ',
                singleQuotes: false
            }), (err) => {
                if (err) reject(err);
                resolve({res: true});
            })
        })
    }

    function hasDirCreated() {
        return fs.existsSync(cwd + '/logs');
    }

    function generateFileContent(req) {
        return {
            cwd: cwd,
            nodeEnv: process,
            nodeVersion: process.versions.v8,
            processorArchitecture: process.arch,
            platform: process.platform,
            argv: process.argv,
            host: req.headers.host,
            timestamp: new Date()
        }
    }

    return {
        logRequest: logRequest,
        logErrors: logErrors
    }
}


//two public modules
///logs
///logErrors

