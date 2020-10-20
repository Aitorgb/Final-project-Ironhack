const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('./cloudinary.config');
const userController = require('../controllers/user.controller')

router.get('/', authMiddleware.isNotAuthenticated, userController.baseroute)
router.get('/login', authMiddleware.isNotAuthenticated, userController.login)
router.post('/logout', authMiddleware.isAuthenticated, userController.logout)

router.get('/signup', authMiddleware.isNotAuthenticated, userController.signup);
// router.get('/tweets', authMiddleware.isAuthenticated, tweetsController.index)
// router.get('/tweets/:id', authMiddleware.isAuthenticated, tweetsController.show)
// router.post('/tweets/:id/comments', authMiddleware.isAuthenticated, tweetsController.addComment)
// router.post('/tweets/:id/like', authMiddleware.isAuthenticated, tweetsController.like)
// router.post('/tweets', authMiddleware.isAuthenticated, upload.single('image'), tweetsController.create)

 router.post('/users', authMiddleware.isNotAuthenticated, upload.single('avatar'), userController.createUser)
 router.get('/activate/:token', authMiddleware.isNotAuthenticated, userController.activateUser);
// router.get('/users/:username', authMiddleware.isAuthenticated, tweetsController.profile)

// router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin)
// router.post('/logout', authMiddleware.isAuthenticated, usersController.logout)

module.exports = router;
