const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    username:String,
    pasword:String,
    email:String,
    phone:Number
})

module.exports = mongoose.model('user',userSchema)