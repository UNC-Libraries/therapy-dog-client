var express = require('express');
var multer = require('multer');

var router = express.Router();
var upload = multer({ dest: process.env.UPLOADS_DIRECTORY });

router.use(require('body-parser').json());

router.get('/forms', require('./handlers/forms').index);
router.get('/forms/:id', require('./handlers/forms').show);
router.post('/deposits', require('./handlers/deposits').create);
router.post('/uploads', upload.single('file'), require('./handlers/uploads').create);

router.use(function(err, req, res, next) {
  res.status(500);
  res.send({ errors: [{ detail: err.message }] });
});

module.exports = router;
