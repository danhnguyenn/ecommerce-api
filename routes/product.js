const productController = require('../controllers/productController');
const multer = require('multer');
const router = require('express').Router();

const FILE_TYPE_MAP = {
	'image/png': 'png',
	'image/jpeg': 'jpeg',
	'image/jpg': 'jpq'
};

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const isValid = FILE_TYPE_MAP[file.mimetype];
		let uploadErr = new Error('Invalid image type');
		if (isValid) {
			uploadErr = null;
		}
		cb(uploadErr, 'public/uploads');
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname.split('.')[0];
		console.log(fileName);
		const extension = FILE_TYPE_MAP[file.mimetype];
		cb(null, `${fileName}.${extension}`);
	}
});
const uploadOptions = multer({ storage: storage });
//Add product
router.post(
	'/add-product',
	uploadOptions.single('imageUrl'),
	productController.addProduct
);

//Get ALL Product
router.get('/', productController.getAllProduct);

//Get Product Detail
router.get('/:id', productController.getProductDetail);

//Update Product
router.put('/edit-product/:id', productController.updateProduct);

module.exports = router;
