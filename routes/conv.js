const express = require('express')
const router = express.Router()
const convController = require('../controllers/convController')
router.post('/createchat', convController.createChat)
router.post('/addmessage', convController.addMessage)
router.post('/addmessages', convController.addMessages)
router.get('/getchats', convController.getChats)
router.get('/getmessages', convController.getMessages)
router.post('/updatemessages', convController.updateMessages)
router.post('/deletechat', convController.deleteChat)
router.post('/renamechat', convController.renameChat)

module.exports = router 