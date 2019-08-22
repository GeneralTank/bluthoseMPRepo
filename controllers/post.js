/*

Controllers folder should contain all routes dedicated to the particular document
Controllers should not directly access and manipulate the db, it should access the models folder files

*/
const express = require("express")
const router = express.Router()
const Post = require("../models/post")
const bodyparser = require("body-parser")
const auth = require("../middlewares/auth")


const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)


// localhost:3000/post/
router.post("/", auth, (req, res) => {
    console.log("POST /post/")
    var post = {
        postTitle: req.body.postTitle,
        text: req.body.text,
        originalPosterID: req.session.user._id,
        originalPosterUsername: req.session.user.username
    }

    Post.create(post).then((post) => {
        Post.getAll().then((posts) => {
            res.redirect("home", {
                posts,
                user: req.session.user
            })
        })
    }, (error) => {
        console.log(error)
        res.redirect("home", {
            error: "some error in posting: " + error,
            user: req.session.user
        })
    })
    
})

// localhost:3000/post/someid
router.get("/:id", (req, res) => {
    console.log("POST /post/" + req.params.id)
    Post.get(req.params.id).then((post) => {
        console.log(post)
        res.redirect("post", {
            post
        })
    }, (error) => {
        res.redirect("home", {
            user: req.session.user,
            error
        })
    })
})

router.get("/delete/:id", (req, res) => {
	Post.delete(req.params.id).then((result) => {
		res.send(result)
	}, (error) => {
		res.send(null)
	})
})

router.get("/createnewpost/newPost", (req, res) => {
    res.redirect("newPost", {
        user: req.session.user
    })
})

// always remember to export the router
module.exports = router
