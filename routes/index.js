var express = require('express');
var router = express.Router();
var ControllerPeajes = require('../controllers/peajes');
const { route } = require('./users');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/peajes', ControllerPeajes.peajes_get);
router.post('/peajes', ControllerPeajes.create_post);
router.patch('/peajes/:id', ControllerPeajes.actualizar);
module.exports = router;
