const router = require('express').Router();
const UserController = require('../controllers/user');
const productRoutes = require('./product');
const wishlistRoutes = require('./wishlist');
const authentication = require('../middlewares/authentication');
const upload = require('../middlewares/multer');
const uploadImage = upload.single('imgUrl');

router.post('/register', UserController.register)

router.post('/login', UserController.login)
router.post('/google-login', UserController.googleLogin)

router.use('/products', productRoutes);
router.use(authentication)

router.get('/profile', UserController.getProfile)
router.patch('/profile/image', uploadImage, UserController.updateProfile)


router.use('/wishlists', wishlistRoutes);

module.exports = router;