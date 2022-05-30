const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys.js')
const passport = require('./config/passport-setup.js')
const router = require('./routes/storiesRouter')
const authRouter = require('./routes/authRouter')


// setting up express app

const app = express()

//  setting up the database and listening to the server

mongoose.connect(keys.mongodb.dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))


app.set('view engine', 'ejs');



app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// routes 

app.use("/", router)
app.use("/auth", authRouter)



