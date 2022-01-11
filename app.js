const express = require("express");
const ejs = require("ejs");
const app = express();
const _ = require("lodash");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//lorem ipsum text to render to main pages
const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque facilisis facilisis pharetra. Quisque imperdiet volutpat leo quis malesuada. Sed malesuada arcu vel porta commodo. Mauris malesuada elementum velit. Sed ac mi et orci tempus dictum id eget purus. Nullam pellentesque vel arcu vel cursus. Nullam porttitor scelerisque elit, vitae pellentesque odio dignissim sed. Ut maximus pellentesque orci quis malesuada. Curabitur tortor mi, accumsan a est in, feugiat condimentum lectus. In dictum augue vitae sagittis tempor.";
const aboutContent = "Ut suscipit lacus sit amet enim aliquam, vitae scelerisque neque rutrum. Integer lacinia, tellus non fringilla condimentum, nibh diam pellentesque enim, quis volutpat magna turpis at risus. Aliquam at lacus aliquam, lacinia lacus nec, sagittis massa. Phasellus tristique lectus eget leo fringilla, sit amet euismod magna venenatis. Ut posuere volutpat sapien vel volutpat. Mauris non sollicitudin quam. Morbi mi velit, lobortis a scelerisque at, accumsan in sem. Etiam hendrerit lectus in urna rhoncus, vel rhoncus mauris dignissim. Interdum et malesuada fames ac ante ipsum primis in faucibus.";
const contactContent = "Nam quam justo, aliquam nec consequat at, rutrum nec risus. Aliquam mattis mauris nec nibh tincidunt tristique. Maecenas finibus odio in commodo pharetra. Fusce egestas, nisi eu iaculis commodo, sem ligula vulputate libero, vel imperdiet mauris nibh nec lacus. Etiam vel magna vehicula, convallis erat non, condimentum tellus. Cras ornare vitae neque vehicula efficitur. Mauris aliquet, arcu ac tincidunt porta, nisl sapien ultricies dolor, ut rutrum mauris turpis ac est. Ut porta tellus vel nisi condimentum venenatis. In convallis dui eget dui rhoncus consequat. Donec vel est bibendum, dignissim velit vel, semper mi. Maecenas tristique nibh libero, ac eleifend ex viverra eu. Integer libero mauris, placerat a lectus id, ornare consectetur ligula. Pellentesque nec ultricies diam. Pellentesque in rutrum nisi, eu pharetra leo. Fusce vel lorem id elit fringilla pellentesque nec ut ipsum. Quisque sit amet risus sapien.";

//store user posts in an array
const posts = [];

//render home
app.get('/', function(req, res) {

    res.render("home", { homeContent: homeStartingContent, newPosts: posts });

})

//render about
app.get('/about', function(req, res) {

    res.render("about", { aboutContent: contactContent });
})

//render contact
app.get('/contact', function(req, res) {

    res.render("contact", { contactContent: aboutContent });
})

//render compose
app.get('/compose', function(req, res) {

    res.render("compose");
})

//store title and content input by user
app.post("/compose", function(req, res) {

    const post = {
        title: req.body.title,
        urlTitle: _.kebabCase(req.body.title),
        content: req.body.postBody
    }
    posts.push(post);
    res.redirect("/");
})

//render post to individual page
app.get("/posts/:postName", function(req, res) {

    const titleRequested = _.lowerCase(req.params.postName);

    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === titleRequested) {

            res.render("post", ({ postTitle: post.title, postContent: post.content }));
        }
    });
})

//listen to port 3000
app.listen(3000, function() {
    console.log("Site is up on Port:3000")
})