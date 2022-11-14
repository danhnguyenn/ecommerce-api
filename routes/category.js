const categoryController = require('../controllers/categoryController');

const router = require('express').Router();

//Add category
router.post('/add-category', categoryController.addCategory);

//Get ALl Category
router.get('/', categoryController.getAllCategory);

//Get Detail Category
router.get('/:id', categoryController.getCategoryDetail);

//Update Category
router.patch('/:id', categoryController.updateCategory);

//Delete Category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
