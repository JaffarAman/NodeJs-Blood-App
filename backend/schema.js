const mongoose = require("mongoose")
const postSchema = mongoose.Schema({
    title:String,
    des:String,
    created_on : {
        type : Date,
        default : Date.now
    }
})


const postModel = mongoose.model("posts" , postSchema)
module.exports  = postModel