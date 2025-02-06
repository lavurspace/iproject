const wishlistRoutes = require('express').Router();
const WishlistController = require('../controllers/wishlist');

wishlistRoutes.get('/', WishlistController.getByUserLogin);
wishlistRoutes.post('/', WishlistController.addWishlist);
wishlistRoutes.delete('/:productId', WishlistController.deleteWishlist);

module.exports = wishlistRoutes;