'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');
const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let mode = process.argv[2]; //encrypt/decrypt
let root = process.cwd() + '/';
let algoList = [
        'aes-192-cfb',
        'aes-192-cfb1',
        'aes-192-cfb8',
        'aes-192-ctr',
        'aes-192-ecb',
        'aes-256-ctr'
    ];
let pass = process.argv[3] || 'deno';
let folderName = process.argv[4];
let algoNumber = process.argv[5]; // number from 0 to 5

if (!mode || !folderName || !algo) {

    ///use npm prompt

    //check if all has values - else invoke the function again
}

console.log(mode + '....');
let folderPath = root + folderName + '/';
let algo = algoList[algoNumber];

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

function promptUser(question, variable, values) {
    let _inValues = false;

    io.question(question, (data) => {
        if (_inValues) {
            variable = data;
        } else {
            promptUser(question, variable, values);
        }
    });

}