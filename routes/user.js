const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get('/sign-up', userController.signup);
router.get('/sign-in', userController.signin);
router.get('/profile', userController.profile);
router.post('/create', userController.create);
router.post('/create-session', userController.createSession);



module.exports = router;