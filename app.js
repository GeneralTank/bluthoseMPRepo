/*

app.js file does all the set-up
app.js passes the routing to the controllers folder
app.js starts the server

*/

const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const mongoose = require("mongoose")
const session = require("express-session")
const PORT = process.env.PORT || 3000
const path = require("path")

const app = express()

hbs.registerPartials(path.join(__dirname, '/views/partials'))

mongoose.Promise = global.Promise

//mongodb://localhost:27017/bluthose
mongoose.connect("mongodb+srv://admin:passw0rd@bluthosecluster-f1quo.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
app.set("view engine", "hbs")
app.use(express.static(__dirname + "/public"))

app.use(express.static('public'))

app.use(session({
    secret: "secret",
    name: "secretname",
    resave: true,
    saveUninitialized: true
}))

app.use(require("./controllers"))

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
