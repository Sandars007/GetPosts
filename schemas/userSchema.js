const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdOn: {type: Date, default: Date.now()},
    picture:{type: String, default:""},
    subscribed: {type: Array, default:[]},
    subscribers: {type: Array, default:[]}

})

const userModel = mongoose.model("User",userSchema)

module.exports = userModel