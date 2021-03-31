const HTTP_STATUS = require('http-status');
const fs = require('fs')
const fpath = require('path')

async function getDirectoryItemsHandler(req, res) {
    let {path} = req.body;
    if (!path) {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST);
    }

    let body = []

    if (fs.existsSync(path)) {
        try {
            let dirItems = fs.readdirSync(path);
            dirItems.forEach((item) => {
                let itemPath = path + '/' + item;
                let itemStats = fs.statSync(itemPath);
                if (itemStats.isDirectory()) {
                    body.push({
                        itemPath: itemPath,
                        lastModified: itemStats.mtime,
                        type: 'directory',
                    });
                }
                else {
                    body.push({
                        itemPath: itemPath,
                        lastModified: itemStats.mtime,
                        size: itemStats.size,
                        type: fpath.extname(itemPath).substring(1)
                    })
                }
            });
        } catch (e) {
            console.log('Найс путь');
            console.log(e);
            res.sendStatus(HTTP_STATUS.IM_A_TEAPOT);
        }
    } else {
        res.sendStatus(HTTP_STATUS.NOT_FOUND);
    }
    res.status(HTTP_STATUS.OK).json(body);
}

module.exports = getDirectoryItemsHandler;