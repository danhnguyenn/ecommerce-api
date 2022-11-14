const orderController = require('../controllers/orderController');
const { Order } = require('../model/Order');
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

router.get('/', orderController.getOrderList);
router.get('/:id', orderController.getOrderDetail);
//Get One Order
router.get('/get-oneorder/:id', orderController.getOneOrder);

// router.get('/userorders/:userId', orderController.getUserOrder);

router.patch('/:id', orderController.updateStatusShip);
router.post('/', middlewareController.verifyToken, orderController.addOrder);

module.exports = router;
