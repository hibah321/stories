const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys.js')
const passportSetup = require('./config/passport-setup.js')
const router = require('./routes/storiesRouter')
const authRouter = require('./routes/authRouter')
const cookieSession = require('cookie-session')
const passport = require('passport')



// setting up express app

const app = express()

//  setting up the databases and listening to the server

mongoose.connect(keys.mongodb.dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))


app.set('view engine', 'ejs');


// Middleware 

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// intialize session cookie

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: keys.session.key
}))

// intialize passport

app.use(passport.initialize());
app.use(passport.session());

// routes 

app.use("/", router)
app.use("/auth", authRouter)



