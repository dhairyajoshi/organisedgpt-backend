const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    token: { type: String, },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "GPTConv " }]
})

module.exports = mongoose.model("GPTUser", UserSchema)   