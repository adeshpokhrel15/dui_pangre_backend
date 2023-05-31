const express = require('express');
const router = express.Router();
const multer = require('multer');
const { upload } = require('../middleware/multerConfig');

const {
    getVehicleRequests, acceptVechicleRequest, rejectVechicleRequest,
} = require('../controllers/vehicleRequestController');

// Retrieve all bike information without sorting
router.get('/', getVehicleRequests);


// // Create a new bike info
// router.post('/', createVehicleRequest);

// Delete bike info
router.delete('/accept/:id', acceptVechicleRequest);
router.delete('/reject/:id', rejectVechicleRequest);

// // Retrieve bike info by ID
// router.get('/:id', getBikeInfoById);

// // Update bike info
// router.put('/:id', updateBikeInfo);



module.exports = router;
