const express = require('express')
const mongoose = require('mongoose')
const mongoURL = "mongodb+srv://hibah:Dunkkin321!@stories.kgu5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const Story = require('./models/blog.js')



// setting up express app

const app = express()

//  setting up the database and listening to the server

mongoose.connect(mongoURL, {useNewUrlParser: true , useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))


app.set('view engine', 'ejs');



app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// route to the home page

app.get("/" , (req, res) => {
    Story.find().sort({createdAt: -1})
        .then((result) => {
                res.render('home', {title: "Home", stories: result, style: "/styles-home.css"})
            })
        .catch((err) => console.log(err))
});

app.post("/", (req,res) => {

    const story = new Story({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    });


    story.save()
        .then(() => {
            res.redirect("/");
        }) 
        .catch((err) => console.log(err))
})


//  route to each stories unique page

app.get('/stories/:slug', (req,res) =>{
    Story.findOne({slug: req.params.slug})
        .then((result) => { 
            console.log('af', result);
            res.render('story', {title: result.title, style: "/styles-story.css", story: result})
        })
        .catch((err) => {
            console.log(err);
        })
        
})

// route to the create page

app.get("/create", (req,res) => {
    res.render("create", {title: "Create", style: "/styles-create.css"})
})




