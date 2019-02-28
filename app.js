var express                 = require('express');
var expressSanitizer        = require('express-sanitizer');
var methodOverride          = require('method-override');
var flash                   = require('connect-flash');
var mongoose                = require('mongoose');
var passport                = require ("passport");
var bodyParser              = require('body-parser');
var paginate                = require('paginate');
var LocalStrategy           = require ("passport-local");
var session                 = require('express-session');
mongoose.Promise            = require('bluebird');
var app                     = express();

var User = require ("./models/user");
var commentRoutes = require ("./routes/comments");
var blogRoutes = require ("./routes/blogs");
var indexRoutes = require ("./routes/index");

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
mongoose.connect('mongodb://germanvd:Gvd55999@ds113670.mlab.com:13670/agenda');
app.set("view engine", "ejs");
app.use (express.static(__dirname + "/public"));
app.use(flash());

app.use(session({
  secret: 'To bo kul travelApp!',
  resave: false,
  saveUninitialized: false
}));

app.use (passport.initialize());
app.use (passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success_messages = req.flash('success');
    res.locals.error_messages = req.flash('error');
    next();
});

app.use (indexRoutes);
app.use (blogRoutes);
app.use (commentRoutes);
app.set('port', process.env.PORT ||80);
app.listen (process.env.PORT||80, function() {
 console.log ("Exitosamente Conectado con Mongodb!"); });
