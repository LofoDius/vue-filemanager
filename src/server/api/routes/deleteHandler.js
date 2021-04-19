const HTTP_STATUS = require('http-status')
const fs = require('fs-extra')
const f = require('fs')

async function deleteHandler(req, res) {
    let {filesToDelete} = req.body;

    if (!filesToDelete) {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST);
        return;
    }

    try {
        for (let i in filesToDelete) {
            fs.removeSync(filesToDelete[i]);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        return;
    }

    res.sendStatus(HTTP_STATUS.OK);
}

module.exports = deleteHandler;