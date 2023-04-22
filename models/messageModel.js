const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "GPTUser" },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "GPTConv" },
    u: { type: Number, required: true },
    a: { type: Number, required: true },
    t: { type: Number, required: true },
    c: { type: String, required: true },

})

module.exports = mongoose.model("GPTMessage", MessageSchema)    