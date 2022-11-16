const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');
const router = require('express').Router();

//Get All User
router.get('/', middlewareController.verifyToken, userController.getAll);

//Get Single User
router.get('/:id', userController.getUserSingle);

//Delete User
router.delete(
	'/:id',
	middlewareController.verifyTokenIsAdmin,
	userController.deleteUser
);

//Get Single User Address
router.get('/get-address/:id', userController.getUserSingleAddress);

//Get Product Liked
router.put(
	'/liked-product/:userId/:productId',
	userController.likedProductList
);

//Get user liked product

router.get('/liked-product/:id', userController.getUserLikedProduct);

//Delete liked product
router.delete('/delete-product/:id', userController.deleteLikedProduct);

module.exports = router;
