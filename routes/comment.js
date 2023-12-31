const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controllers/commentController');
router.post('/create',passport.checkAuthentication, commentController.create);
router.get('/destroy/:id', passport.checkAuthentication, commentController.destroy);

module.exports = router;