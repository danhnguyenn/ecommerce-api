const addressController = require('../controllers/addressController');

const router = require('express').Router();

// //Get ALL Brand
// router.get('/', brandController.getAll);

//Add address
router.post('/', addressController.addAddress);

//Update Address
router.patch('/:id', addressController.updateAddress);

//Delete address
router.delete('/:id', addressController.deleleAddress);

// //Update Brand
// router.put('/edit-brand/:id', brandController.updateBrand);
module.exports = router;
