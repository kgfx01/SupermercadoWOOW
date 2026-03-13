const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orden.controller.js'); 

router.get('/', orderController.getOrders); 
router.post('/', orderController.postOrder);
router.put('/:id', orderController.updateOrderStatus);

module.exports = router;