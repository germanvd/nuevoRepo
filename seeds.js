var mongoose = require('mongoose');
var Comment = require ("./models/comment");
var Blog = require ("./models/blog");

var testBlogs = [
    {
        name: "Singapore",
        image: "http://static.asiawebdirect.com/m/phuket/portals/www-singapore-com/homepage/attractions/all-attractions/pagePropertiesImage/singapore1.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        name: "Koh Rong Salmoel",
        image: "http://www.ourglobaltrek.com/wp-content/uploads/2014/12/pier-at-koh-rong-samloem.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        name: "Phnom Penh",
        image: "https://media.cntraveler.com/photos/56d9fde67243f8953e34534d/master/pass/phnom-penh-city-cr-getty.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }
];

var testComment = {
        author: "Jan",
        text: "We had the best time of our lives"
};

function seedDB() {
    Blog.remove ({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            testBlogs.forEach(function(testBlog) {
                Blog.create (testBlog, function (err, newBlog) {
                    if (err) {
                        console.log (err);
                    } else {
                        console.log ("You have seeded blogs page")
                    }
                });
            });
        }
    });
}

module.exports = seedDB;