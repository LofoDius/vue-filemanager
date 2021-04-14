const HTTP_STATUS = require('http-status');
const fs = require('fs');

async function renameFileHandler(req, res) {
    let {path, oldName, newName} = req.body;
    if (!path || !oldName || !newName) {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST);
        return;
    }

    fs.renameSync(path, path.replace(oldName, newName));
    res.sendStatus(HTTP_STATUS.OK);
}

module.exports = renameFileHandler;