const HTTP_STATUS = require('http-status');
const fs = require('fs');

async function createDirectoryHandler(req, res) {
    let {path, directoryName} = req.body;

    if((!path && path !== '') || !directoryName) {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST);
        return;
    }

    path = '/home/lofod/Documents/filemanager/' + path;

    try {
        fs.mkdirSync(path + '/' + directoryName);
    } catch (e) {
        console.log(e);
        res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        return;
    }
    res.sendStatus(HTTP_STATUS.OK);
}

module.exports = createDirectoryHandler;