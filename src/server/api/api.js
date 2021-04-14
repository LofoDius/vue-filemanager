const express = require('express');
const router = express.Router();
const getFolderItemsHandler = require('./routes/getDirectoryItemsHandler');
const renameFileHandler = require('./routes/renameFileHandler')

router.post('/getDirectoryItems', getFolderItemsHandler);
router.post('/renameFile', renameFileHandler);

module.exports = router;