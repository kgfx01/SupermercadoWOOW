const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller.js');

router.get('/totals', productController.getDashboardTotals); 
router.get('/low-stock', productController.getLowStockProducts);
router.get('/', productController.getProducts);
router.post('/', productController.postProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;