// Route file (userRoutes.js)
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { upload } = require('../middleware/multerConfig');
const validateToken = require('../middleware/validateTokenHandler');
const { currentUser } = require('../controllers/userController');

router.post('/register', upload.array('images', 2), registerUser);
router.post('/login', loginUser);
router.get('/current', validateToken, currentUser);
module.exports = router;
