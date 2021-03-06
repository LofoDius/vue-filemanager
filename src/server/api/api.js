const express = require('express');
const router = express.Router();
const getFolderItemsHandler = require('./routes/getDirectoryItemsHandler');
const renameFileHandler = require('./routes/renameFileHandler');
const pasteHandler = require('./routes/pasteHandler');
const deleteHandler = require('./routes/deleteHandler');
const createDirectoryHandler = require('./routes/createDirectoryHandler');
const getFileHandler = require('./routes/getFileHandler');

router.post('/getDirectoryItems', getFolderItemsHandler);
router.post('/renameFile', renameFileHandler);
router.post('/paste', pasteHandler);
router.post('/delete', deleteHandler);
router.post('/createDirectory', createDirectoryHandler);
router.post('/getFile', getFileHandler);


module.exports = router;