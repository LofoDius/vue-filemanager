const HTTP_STATUS = require('http-status');
const path = require('path');
const fs = require('fs');

const images = ['BMP', 'ICO', 'JPEG', 'JPG', 'PNG', 'SVG', 'WEBP'];
const files = ['C', 'CFG', 'CS', 'CSS', 'HTML', 'INI', 'LOG', 'PHP', 'SQL', 'TXT', 'JS', 'VUE', 'JSON', 'KT', 'JAVA',
'XML'];

async function getFileHandler(req, res) {
    let {filePath} = req.body;

    if (!filePath) {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST);
        return;
    }

    let fileType = path.extname(filePath).substring(1).toUpperCase();
    if (images.includes(fileType)) {
        let image = fs.readFileSync(filePath, 'base64');
        res.send(image);
    } else if (files.includes(fileType)) {
        res.sendFile(filePath);
    } else {
        res.sendStatus(HTTP_STATUS.NOT_ACCEPTABLE);
    }
}

module.exports = getFileHandler;