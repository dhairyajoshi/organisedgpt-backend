const conversationModel = require("../models/conversationModel")
const messageModel = require("../models/messageModel")
const mongoose = require('mongoose')
const userModel = require("../models/userModel")

module.exports.addMessage = async (req, res, next) => {
    const chat = await conversationModel.findById(req.body.chatId)
    const message = messageModel({
        _id: new mongoose.Types.ObjectId(),
        user: req.UserData.userId,
        chat: req.body.chatId,
        u: req.body.u,
        a: req.body.a,
        t: req.body.t,
        c: req.body.c,
    })
    await message.save()
    chat.messages.push(message)
    await chat.save()

    res.status(200).json({ 'msg': 'message saved successfully', 'chat': message })
}

module.exports.addMessages = async (req, res, next) => {
    const chat = await conversationModel.findById(req.query.id)
    for (i = 0; i < req.body.length; i++) {

        const message = messageModel({
            _id: new mongoose.Types.ObjectId(),
            user: req.UserData.userId,
            chat: req.query.id,
            u: req.body[i].u,
            a: req.body[i].a,
            t: req.body[i].t,
            c: req.body[i].c,
        })
        await message.save()
        chat.messages.push(message)
    }
    await chat.save()

    res.status(200).json({ 'msg': 'message saved successfully', 'chat': chat })
}

module.exports.createChat = async (req, res, next) => {
    const user = await userModel.findById(req.UserData.userId)
    const chat = new conversationModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        user: req.UserData.userId,
        messages: []
    })

    await chat.save()
    user.chats.push(chat)
    user.save()

    res.status(200).json({ 'msg': 'chat created successfully', 'chat': chat })
}

module.exports.getChats = async (req, res, next) => {

    const chats = await conversationModel.find({ user: req.UserData.userId }).exec()

    res.status(200).json({ chats })
}

module.exports.getMessages = async (req, res, next) => {

    const chat = await conversationModel.findById(req.query.id).populate('messages')
    const messages = chat.messages

    res.status(200).json({ messages })
}

module.exports.updateMessages = async (req, res, next) => {

    const chat = await conversationModel.findById(req.query.id).exec()
    chat.messages = []

    messageModel.deleteMany({ chat: chat.id }).exec()

    console.log(req.body)
    for (i = 0; i < req.body.length; i++) {

        const message = messageModel({
            _id: new mongoose.Types.ObjectId(),
            user: req.UserData.userId,
            chat: req.query.id,
            u: req.body[i].u,
            a: req.body[i].a,
            t: req.body[i].t,
            c: req.body[i].c,
        })
        await message.save()
        chat.messages.push(message)
    }

    chat.save()

    res.status(200).json({ 'messages': chat })
}

module.exports.deleteChat = async (req, res, next) => {
    conversationModel.findByIdAndDelete(req.query.id).exec();
    messageModel.deleteMany({ chat: req.query.id }).exec()

    res.status(200).json({ 'msg': 'chat deleted successfully' })
}

module.exports.renameChat = async (req, res, next) => {
    chat = await conversationModel.findById(req.query.id).exec();

    chat.name = req.body.name;

    chat.save()

    res.status(200).json({ 'msg': 'chat renamed successfully' })
}