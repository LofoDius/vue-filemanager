const express = require('express');
const router = express.Router();
const getFolderItemsHandler = require('./routes/getDirectoryItemsHandler');
const renameFileHandler = require('./routes/renameFileHandler');
const createDirectoryHandler = require('./routes/createDirectoryHandler');
const pasteHandler = require('./routes/pasteHandler');

router.post('/getDirectoryItems', getFolderItemsHandler);
router.post('/renameFile', renameFileHandler);
router.post('/createDirectory', createDirectoryHandler);
router.post('/paste', pasteHandler);

module.exports = router;