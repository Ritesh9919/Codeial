const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/postController');
router.post('/create',passport.checkAuthentication, postController.create);

module.exports = router;