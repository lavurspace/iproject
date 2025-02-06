const productRoutes = require('express').Router();

const ProductController = require('../controllers/product');

productRoutes.get('/', ProductController.getAllProducts);
productRoutes.get('/gemini', ProductController.gemini);
productRoutes.get('/:id', ProductController.getById);

module.exports = productRoutes;