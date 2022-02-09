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

// route to the home page

app.get("/" , (req, res) => {
    Story.find()
        .then((result) => res.render('home', {title: "Home", stories: result, style: "/styles-home.css"}))
        .catch((err) => console.log("papappaa barraiii", err))
});

// route to the create page

app.get("/create", (req,res) => {
    res.render("create", {title: "Create", style: "/styles-create.css"})
})

app.get("/add", (req, res) => {
    const st = new Story({
        title: "Stability is the kel",
        snippet: "bara bara dummmm",
        genres: ["Action", "Adventure"],
        body: "lorem lore fafdf"
    });
    
    st.save()
        .then(() => {
            console.log('mission accomplished')
            res.redirect("/");
        }) 
        .catch((err) => console.log(err))
   
})
