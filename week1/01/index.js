'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let mode = process.argv[2]; //encrypt/decrypt
let root = process.cwd() + '/';
let algo = 'aes-256-ctr';
let pass = process.argv[3] || 'deno';
let folderName = process.argv[4];

if (!mode || !folderName) {
    console.log(`Please provide all arguments
                 [2] encrypt/decrypt
                 [3] folder name`);
    process.exit(0);
}

console.log(mode + '....');
let folderPath = root + folderName + '/';

////read dir
fs.readdir(path.normalize(folderPath), (err, files) => {
    files.forEach((file) => {
        let filePath = folderPath + file;

        switch (mode) {
            case 'encrypt':
                readFile(filePath, encrypt, saveFile);
                break;
            case 'decrypt':
                readFile(filePath, decrypt, saveFile);
                break;
            default:
                console.log('not valid mode. Exiting..');
                process.exit(0);
        }
    })
});


////methods
function readFile(file, cb, fn) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) handleError(err);
        cb(data, fn, file);
    })
}

function saveFile(txt, file) {
    fs.writeFile(file, txt, 'utf8', (err) => {
        if (err) handleError(err);
        console.log(file, 'saved');
    })
}

function encrypt(text, cb, file) {
    let cipher = crypto.createCipher(algo, pass),
        cryptedTxt = cipher.update(text, 'utf8', 'hex');
    cryptedTxt += cipher.final('hex');
    cb(cryptedTxt, file);
}

function decrypt(text, cb, file) {
    let decipher = crypto.createDecipher(algo, pass),
        decipheredTxt = decipher.update(text, 'utf8', 'hex');
    decipheredTxt += decipher.final('hex');
    cb(decipheredTxt, file);
}


///helpers
function handleError(err) {
    throw err;
}