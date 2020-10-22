const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const commentControllers = require('../controllers/comment.controllers');
const spaceController = require('../controllers/spaces.controllers')
const chatController = require('../controllers/chat.controller')
const upload = require('./cloudinary.config');
const userController = require('../controllers/user.controller')
const reviewController = require('../controllers/review.controller')



router.post('/login', authMiddleware.isNotAuthenticated, userController.login)
router.post('/logout', authMiddleware.isAuthenticated, userController.logout)
router.post('/users', authMiddleware.isNotAuthenticated, upload.single('avatar'), userController.createUser)
router.get('/activate/:token', authMiddleware.isNotAuthenticated, userController.activateUser);
router.get('/user/:id', authMiddleware.isAuthenticated, userController.showUser)



router.post('/space/:id/comments', authMiddleware.isAuthenticated, commentControllers.addComment)//id space
router.delete('/space/:id/comments', authMiddleware.isAuthenticated, commentControllers.deleteComment) // id comment
router.patch('/space/:id/comments', authMiddleware.isAuthenticated, commentControllers.editComment) // id comment

router.get('/space/:id', spaceController.viewDetail)
router.post('/space/new', authMiddleware.isAuthenticated, upload.array('images'), spaceController.newSpace)
router.delete('/space/:id', authMiddleware.isAuthenticated, spaceController.deleteSpace)
router.patch('/space/:id', authMiddleware.isAuthenticated, spaceController.editSpace)

router.post('/chat/:id', authMiddleware.isAuthenticated, chatController.createChat) //Crea chat
router.get ('/chat/:id', authMiddleware.isAuthenticated, chatController.getChat) // te dice todos los mensajes de un chat en particular
router.post('/addMessage/:id', authMiddleware.isAuthenticated, chatController.sendMessage) // envia mensajes
router.get('/chat', authMiddleware.isAuthenticated, chatController.updateChat) // dice todos los chat que tu tienes

router.get('space/:id/review', authMiddleware.isAuthenticated, reviewController.reviews) 
router.post('space/:id/review', authMiddleware.isAuthenticated, reviewController.createReview) 
router.delete('space/:id/review', authMiddleware.isAuthenticated, reviewController.deleteReview) 
router.patch('space/:id/review', authMiddleware.isAuthenticated, reviewController.editReview) 



module.exports = router;
