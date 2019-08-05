/*

Controllers folder should contain all routes dedicated to the particular document
Controllers should not directly access and manipulate the db, it should access the models folder files

*/
const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bodyparser = require("body-parser")
const auth = require("../middlewares/auth")
const Post = require("../models/post")

const app = express()

const urlencoder = bodyparser.urlencoded({
  extended : true
})

router.use(urlencoder)

// localhost:3000/user/register
router.post("/register", (req, res)=>{
  console.log("POST /user/register")
  var user = {
    username : req.body.username,
    password : req.body.password
  }

  User.create(user).then((user)=>{
      console.log("successful " + user)
      req.session.username = user.username
      res.render("home", {
        user
      })
  },(error)=>{
    res.render("index", {
      error : "some error in registering: " + error
    })
  })

})

// localhost:3000/user/login
router.post("/login", (req, res)=>{
  console.log("POST /user/login")
  let user = {
    username : req.body.username,
    password : req.body.password
  }
  console.log("post login " + req.body.username)
  console.log("post login " + user)

  User.authenticate(user).then((newUser)=>{
    console.log("authenticate " + newUser)
    if(newUser){
      req.session.username = user.username
      Post.getAll().then((posts)=>{
        res.render("home", {
          posts
        })
      })
    }
  }, (error)=>{
    res.render("index",{
      error : "some error in logging in: " + error
    })
  })
})

// always remember to export the router for index.js
module.exports = router
