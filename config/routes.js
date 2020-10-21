const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const commentControllers = require('../controllers/comment.controllers');
const spaceController = require('../controllers/spaces.controllers')
const chatController = require('../controllers/chat.controller')
const upload = require('./cloudinary.config');
const userController = require('../controllers/user.controller')

//router.post('/users/:id', authMiddleware.isNotAuthenticated, userController.profile)
router.post('/users', authMiddleware.isNotAuthenticated, upload.single('avatar'), userController.createUser)
router.get('/activate/:token', authMiddleware.isNotAuthenticated, userController.activateUser);
router.post('/login', authMiddleware.isNotAuthenticated, userController.login)
router.post('/logout', authMiddleware.isAuthenticated, userController.logout)


router.post('/space/:id/comments', authMiddleware.isAuthenticated, commentControllers.addComment)
router.delete('/space/:id/comments', authMiddleware.isAuthenticated, commentControllers.deleteComment)
router.patch('/space/:id/comments', authMiddleware.isAuthenticated, commentControllers.editComment)


router.get('/space/user', authMiddleware.isNotAuthenticated, spaceController.showUser)
router.get('/space/:id', authMiddleware.isNotAuthenticated, spaceController.viewDetail)
router.post('/space/new', authMiddleware.isAuthenticated, upload.array('images'), spaceController.newSpace)
router.delete('/space/:id', authMiddleware.isAuthenticated, spaceController.deleteSpace)
router.put('/space/:id', authMiddleware.isAuthenticated, spaceController.editSpace)



module.exports = router;
