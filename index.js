var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log(err)
    } else {
      res.render("index", {blogs: blogs});
    }
  })
});

// app.get("/blogs", function(req, res){
//   res.render("index")
// });

app.get("/blogs/new", function(req, res){
  res.render("new");
})

app.listen(3005, () => console.log(`It's over Anakin. I have the high ground`));