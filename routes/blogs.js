var express = require('express');
var router = express.Router();
var Blog = require ("../models/blog");
var middleware = require ("../middleware");

//INDEX ROUTE
router.get ("/blogs", function (req, res) {
   Blog.find({}, function (err, blogs) {
      if (err) {
         console.log(err);
      } else {
         res.render ("blog/index", {blogs: blogs});
      }
   });
});

//NEW ROUTE
router.get ("/blogs/new", middleware.isLoggedIn, function (req, res) {
   res.render ("blog/new");
});

//CREATE ROUTE
router.post ("/blogs", function (req, res) {
    req.body.blog.description = req.sanitize(req.body.blog.description);
    Blog.create (req.body.blog, function (err, newBlog) {
      if (err) {
         console.log (err); 
      } else {
         newBlog.author.id = req.user._id;
         newBlog.author.username = req.user.username;
         newBlog.save();
         req.flash ("success", "You have created new blog post!");
         res.redirect ("/blogs");
      }
    });
});

//SHOW ROUTE
router.get ("/blogs/:id", function (req, res) {
   var id = req.params.id;
  Blog.findById (id).populate({path: "comments"}).exec(function (err, foundBlog) {
      if(err) {
         console.log(err);
      } else {
        res.render ("blog/show", {foundBlog: foundBlog});
      }
   });
});

//EDIT ROUTE
router.get ("/blogs/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
   Blog.findById(req.params.id, function (err, foundBlog) {
      if (err) {
         console.log(err);
      } else
      res.render ("blog/edit", {foundBlog: foundBlog});
   });
});

//UPDATE ROUTE
router.put ("/blogs/:id", middleware.checkCampgroundOwnership, function (req, res) {
   req.body.description = req.sanitize(req.body.description);
   var id = req.params.id;
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var updatedBlog = {name: name, image: image, description: description};
   Blog.findByIdAndUpdate (id, updatedBlog, function (err) {
      if(err) {
         console.log(err); 
      } else {
         req.flash ("success", "You have updated your blog post!")
         res.redirect ("/blogs/" + id);
      }
   });
});

//DELETE ROUTE
router.delete ("/blogs/:id", middleware.checkCampgroundOwnership, function(req, res) {
   var id = req.params.id;
   Blog.findByIdAndRemove (id, function (err) {
      if(err) {
         console.log(err);
      } else {
         req.flash ("success", "Your blog post has been deleted!");
         res.redirect ("/blogs/");
      }
   });
});

module.exports = router;