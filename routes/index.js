var express = require('express');
var router = express.Router();
var ControllerTolls = require('../controllers/tolls');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tolls', ControllerTolls.get_tolls);
router.post('/tolls/scrapper', ControllerTolls.create_post_scrapper);
router.post('/tolls', ControllerTolls.create_post);
router.get('/tolls/:id', ControllerTolls.get_toll_id);
router.patch('/tolls/:id', ControllerTolls.update);
router.delete('/tolls/:id', ControllerTolls.delete);
module.exports = router;
