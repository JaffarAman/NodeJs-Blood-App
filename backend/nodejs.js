const express = require("express")
const app = express()
const port = 5000

const cors = require("cors")

//// allow body///
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());


/////connect mongoose///
const  mongoose  = require("mongoose")
const postModel = require("./schema")
const DB_URI = "mongodb+srv://admin:jaffar123@cluster0.ev0b5.mongodb.net/BloodData"
mongoose.connect(DB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", ()=>console.log("mongoose connected"))
mongoose.connection.on("error", (error)=>console.log(error))



app.post("/create" , (req,res)=>{
    const body = req.body
    console.log(body);
    
    postModel.create( body , (err , data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("Data successfully Send....")
        }
    })
})


app.get("/posts" , (req,res)=>{
    // const headers = req.headers
    // console.log(req.headers);
    
    postModel.find( {} , (err , data)=>{
        if(err){
            console.log(err)
        }
        else{
            // res.send("Data successfully Send....")
            res.send(data)
        }
    })
})



app.listen(port, ()=>console.log("Server is Running localhost:" +port))