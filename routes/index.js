var express = require('express');
var router = express.Router();
var ControllerTolls = require('../controllers/tolls');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Routes
/**
 * @swagger
 * /tolls:
 *  get:
 *    description: Use to request all tolls
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/tolls', ControllerTolls.get_tolls);
router.post('/tolls/scrapper', ControllerTolls.create_post_scrapper);

router.post('/tolls', ControllerTolls.create_post);
/**
 * @swagger
 * /tolls/id:
 *  get:
 *    description: Use to request a specific toll got it with id
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/tolls/:id', ControllerTolls.get_toll_id);
/**
 * @swagger
 * /tolls/id:
 *  patch:
 *    description: Use to request a specific toll delete by id
 *  responses:
 *    '200':
 *      description: A successful response
 */
router.patch('/tolls/:id', ControllerTolls.update);
/**
 * @swagger
 * /tolls/id:
 *  delete:
 *    description: you can change all characteristics specify in post 
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/tolls/:id', ControllerTolls.delete);

module.exports = router;
