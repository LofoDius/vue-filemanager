const express = require('express');
const router = express.Router();
const getFolderItemsHandler = require('./routes/getDirectoryItemsHandler');
const renameFileHandler = require('./routes/renameFileHandler');
const pasteHandler = require('./routes/pasteHandler');
const deleteHandler = require('./routes/deleteHandler');
const createDirectoryHandler = require('./routes/createDirectoryHandler');

router.post('/getDirectoryItems', getFolderItemsHandler);
router.post('/renameFile', renameFileHandler);
router.post('/paste', pasteHandler);
router.post('/delete', deleteHandler);
router.post('/createDirectory', createDirectoryHandler);


module.exports = router;