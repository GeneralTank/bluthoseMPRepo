const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const Comment = require("../models/comment.js")
const Post = require("../models/post.js")
const User = require("../models/user.js")
const prettyMs = require('pretty-ms')
const timestamp = require('time-stamp')
const marked = require('marked')
const app = express()

const urlencoder = bodyparser.urlencoded({
	extended : true
})

router.use(urlencoder)

