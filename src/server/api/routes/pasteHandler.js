const HTTP_STATUS = require('http-status');
const fs = require('fs-extra');

async function pasteHandler(req, res) {
    let {filesToPaste, pathToPaste} = req.body;

    if (!filesToPaste) {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST);
        return;
    }

    pathToPaste = '/home/lofod/Documents/filemanager/' + pathToPaste;

    try {
        for (let i in filesToPaste) {
            let filename = filesToPaste[i].split('/').pop();
            fs.copySync(filesToPaste[i], pathToPaste + '/' + filename);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        return;
    }
    res.sendStatus(HTTP_STATUS.OK);
}

module.exports = pasteHandler;