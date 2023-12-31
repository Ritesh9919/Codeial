const passport = require('passport');

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get('/sign-up', userController.signup);
router.get('/sign-in', userController.signin);
router.get('/profile/:id', passport.checkAuthentication,userController.profile);
router.post('/update/:id', userController.update);
router.post('/create', userController.create);
router.post('/create-session',passport.authenticate('local', {failureRedirect:'/users/sign-in'}),  userController.createSession);
router.get('/destroy-session', userController.destroySession);



router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}), userController.createSession);



module.exports = router;