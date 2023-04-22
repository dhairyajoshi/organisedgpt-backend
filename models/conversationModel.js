const mongoose = require('mongoose')

const ConversationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "GPTUser" },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "GPTMessage" }]
})

module.exports = mongoose.model("GPTConv", ConversationSchema)    