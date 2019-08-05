const mongoose = require("mongoose")

var commentSchema = mongoose.Schema({
    _postID: mongoose.SchemaTypes.ObjectId,
	commentContent: String,
	commentAuthor: String,
	commentDateString: String,
	commentDate: Date,
	commentScore: Number,
	nestedComments: [mongoose.SchemaTypes.ObjectId],
	upvoteComment:[String],
	downvoteComment:[String]
})

var Comment = mongoose.model("commentList",commentSchema)

exports.get = function (id) {
	return new Promise(function (resolve, reject) {
		Comment.findOne({
			_id: id
		}).then((comment) => {
			resolve(comment)
		}, (err) => {
			reject(err)
		})
	})
}

exports.deleteComment = function(){
    
    
    
}

exports.editComment = function(){
    

}