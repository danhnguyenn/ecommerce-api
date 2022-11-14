const brandController = require('../controllers/brandController');

const router = require('express').Router();

//Get ALL Brand
router.get('/', brandController.getAll);

//Add Brand
router.post('/', brandController.addBrand);

//Update Brand
router.put('/edit-brand/:id', brandController.updateBrand);
module.exports = router;
