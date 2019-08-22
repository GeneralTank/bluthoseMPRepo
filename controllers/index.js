/*

Controllers folder should contain all routes dedicated to the particular document
Controllers should not directly access and manipulate the db, it should access the models folder files

index.js should route all prefix paths to the proper controller files
index.js should set the home/index page
index.js should be named index.js, because server.js just refers to the controllers folder, which assumes an index file

*/

const express = require("express")
const router = express.Router()
const app = express()
const Post = require("../models/post")

// load all the controllers into router
router.use("/post", require("./post"))
router.use("/user", require("./user"))

// create the route for the index/home page
router.get("/", function (req, res) {
    console.log("GET /")
    
    if (req.session.user == undefined){
        res.render("index")
    } else {
        Post.getAll().then((posts) => {
            res.render("home", {
                posts,
                user: req.session.user
            })
        })
    }
})

module.exports = router
