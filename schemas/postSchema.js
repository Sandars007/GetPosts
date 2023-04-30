const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{type: String, required: true},
    message: {type: String, required: true},
    createdOn: {type: Date, default: Date.now()},
    createdBy: {type: mongoose.SchemaTypes.ObjectId, required: true}
})

const postModel = mongoose.model("Post", postSchema)

module.exports = postModel