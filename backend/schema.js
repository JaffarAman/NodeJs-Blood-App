const mongoose = require("mongoose")
const postSchema = mongoose.Schema({
    title:String,
    des:String,
    created_on : {
        type : Date,
        default : Date.now
    }
})


const authSchema = mongoose.Schema({
    user_name : String,
    user_email :String,
    user_password : String,
    user_phone : String,
    user_address : String,
    created_on : {
        type : Date,
        default:Date.now
    }
})

const authModel = mongoose.model("users",authSchema)


const postModel = mongoose.model("posts" , postSchema)
module.exports  = {postModel , authModel} 