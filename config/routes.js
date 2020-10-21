const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const commentControllers = require('../controllers/comment.controllers');
const spaceController = require('../controllers/spaces.controllers')
const chatController = require('../controllers/chat.controller')
const upload = require('./cloudinary.config');
const userController = require('../controllers/user.controller')
const spaceController = require('../controllers/spaces.controller')

router.get('/login', authMiddleware.isNotAuthenticated, userController.login)
router.post('/logout', authMiddleware.isAuthenticated, userController.logout)

// router.get('/tweets', authMiddleware.isAuthenticated, tweetsController.index)
// router.get('/tweets/:id', authMiddleware.isAuthenticated, tweetsController.show)
// router.post('/tweets/:id/comments', authMiddleware.isAuthenticated, tweetsController.addComment)
// router.post('/tweets/:id/like', authMiddleware.isAuthenticated, tweetsController.like)
// router.post('/tweets', authMiddleware.isAuthenticated, upload.single('image'), tweetsController.create)

 router.post('/users', authMiddleware.isNotAuthenticated, upload.single('avatar'), userController.createUser)
 router.get('/activate/:token', authMiddleware.isNotAuthenticated, userController.activateUser);
 router.get('/users', authMiddleware.isAuthenticated, userController.showUser)

// router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin)
// router.post('/logout', authMiddleware.isAuthenticated, usersController.logout)


router.post('/space/:id/comments', authMiddleware.isAuthenticated, commentControllers.addComment)
router.delete('/space/:id/comments', authMiddleware.isAuthenticated, commentControllers.deleteComment)
router.patch('/space/:id/comments', authMiddleware.isAuthenticated, commentControllers.editComment)


router.get('/space/user', authMiddleware.isNotAuthenticated, spaceController.showUser)
router.get('/space/:id', authMiddleware.isNotAuthenticated, spaceController.viewDetail)
router.post('/space/new', authMiddleware.isAuthenticated, upload.array('images'), spaceController.newSpace)
router.delete('/space/:id', authMiddleware.isAuthenticated, spaceController.deleteSpace)
router.put('/space/:id', authMiddleware.isAuthenticated, spaceController.editSpace)



module.exports = router;
