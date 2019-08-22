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
    extended: true
})

router.use(urlencoder)

// localhost:3000/user/register
router.post("/register", (req, res) => {
    console.log("POST /user/register")
    var user = {
        username: req.body.username1,
        password: req.body.password1
    }

    User.create(user).then((user) => {
        console.log("successful " + user)
        req.session.user = user
        Post.getAll().then((posts) => {
                res.render("home", {
                    posts,
                    user
                })
            })
    }, (error) => {
//        res.render("index", {
//            error: "some error in registering: " + error
//        })
        res.redirect('/')
    })

})

// localhost:3000/user/login
router.post("/login", (req, res) => {
    console.log("POST /user/login")
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    console.log("post login " + req.body.username)
    console.log("post login " + user.password)

    User.authenticate(user).then((newUser) => {
        console.log("authenticate " + newUser)
        if (newUser) {
            req.session.user = user
            Post.getAll().then((posts) => {
                res.render("home", {
                    posts,
                    user: req.session.user
                })
            })
        }
    }, (error) => {
        res.render("home", {
            error: "some error in logging in: " + error
        })
    })
})

router.get('/logout', function (req, resp) {
    if (req.session.user === undefined) {
        resp.redirect('/?login=unlogged');
    } else {
        req.session.destroy(function (err) {
            resp.redirect('/');
        });
    }
});

// always remember to export the router for index.js
module.exports = router
