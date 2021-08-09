const express = require("express")
const app = express()
const port = 5000

const cors = require("cors")

//// allow body///
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());


/////connect mongoose///
const mongoose = require("mongoose")
const { postModel, authModel } = require("./schema")
/////BLOOD DATA BASE URI/////
const DB_URI = "mongodb+srv://admin:jaffar123@cluster0.ev0b5.mongodb.net/BloodData"
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
mongoose.connection.on("connected", () => console.log("mongoose connected"))
mongoose.connection.on("error", (error) => console.log(error))


app.post("/create", (req, res) => {
    const body = req.body
    console.log(body);

    postModel.create(body, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Data successfully Send....")
        }
    })
})


app.get("/posts", (req, res) => {
    // const headers = req.headers
    // console.log(req.headers);

    postModel.find({}, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            // res.send("Data successfully Send....")
            res.send(data)
        }
    })
})



//////USER AUTH API//////
app.post("/signup", (req, res) => {
    const body = req.body
    try {

        authModel.findOne({ user_email: body.user_email }, (err, data) => {
            if (data == null) {
                authModel.create(body, (err, data) => {
                    if (err) {
                        throw err
                    } else {
                        console.log("Data email", data);
                        res.send({ msg: "Successfully SignUp...", error: false })
                    }
                })

            } else {
                res.send({ msg: "Your Email address is already Register...", error: true })

            }
        })
    }
    catch (err) {
        res.send(err)
    }
})

app.post("/signin", (req, res) => {
    const { user_email } = req.body
    const obj = {
        user_email: user_email
    }
    try {
        authModel.findOne(obj, (err, data) => {
            if (data == null) {
                res.send({ msg: "your Email account is not valid", error: true })
            }
            else {
                if (err) {
                    console.log(err)
                    throw err
                } else {
                    res.send({ msg: "SuccessFully login", error: false })
                    console.log(data)
                }

            }
        })
    } catch (error) {

    }
})


app.get("/alldata", (req, res) => {
    authModel.find({}, (err, data) => {
        if (err) {
            //
        } else {
            res.send(JSON.stringify(data))
        }
    })
})


app.listen(port, () => console.log("Server is Running localhost:" + port))