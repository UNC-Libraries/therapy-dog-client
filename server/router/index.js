'use strict';

const express = require('express');
const multer = require('multer');

let router = express.Router();
let upload = multer({ dest: process.env.UPLOADS_DIRECTORY });

router.use(require('body-parser').json());

router.get('/forms', require('../handlers/forms').index);
router.get('/forms/:id', require('../handlers/forms').show);
router.post('/deposits', require('../handlers/deposits').create);
router.post('/uploads', upload.single('file'), require('../handlers/uploads').create);

module.exports = router;
