var Blog = require ("../models/blog");
var Comment = require ("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Blog.findById(req.params.id, function (err, foundBlog) {
            if(err) {
                res.redirect("back");
            } else {
                if (foundBlog.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash ("error", "You are not authorized to do that!")
                    res.redirect ("/blogs");
                }
            }
        });
   } else {
        req.flash ("error", "You have to be logged in to do that!");
        res.redirect ("/login");
   }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentId, function (err, foundComment) {
            if(err) {
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash ("error", "You are not authorized to do that!")
                    res.redirect ("/blogs");
                }
            }
        });
   } else {
        req.flash ("error", "You have to be logged in to do that!");
        res.redirect ("/login");
   }
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash ("error", "You have to be logged in to do that!");
    res.redirect ("/login");
};

module.exports = middlewareObj;