const express = require('express');
const router = express.Router();
const getFolderItemsHandler = require('./routes/getDirectoryItemsHandler');

router.post('/getDirectoryItems', getFolderItemsHandler);

module.exports = router;