const router = require('express').Router();
const Story = require('../models/blog.js')

router.get("/" , (req, res) => {
    Story.find().sort({createdAt: -1})
        .then((result) => {
                res.render('home', {title: "Home", stories: result, style: "/styles-home.css"})
            })
        .catch((err) => console.log(err))
});

router.post("/", (req,res) => {

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

router.get('/stories/:slug', (req,res) =>{
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

router.get("/create", (req,res) => {
    res.render("create", {title: "Create", style: "/styles-create.css"})
})

module.exports = router
