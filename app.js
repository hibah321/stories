const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys.js')
const passportSetup = require('./config/passport-setup.js')
const router = require('./routes/storiesRouter')
const authRouter = require('./routes/authRouter')
const session = require('express-session');
const passport = require('passport')
const helmet = require("helmet");




// setting up express app

const app = express()

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

// intialize session cookie

app.use(session({ 		//Usuage
  secret: [keys.session.key],
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    secure: false,
    maxAge: (60 * 60 * 1000)
  }
}));

// intialize passport

app.use(passport.initialize());
app.use(passport.session());

//  setting up the databases and listening to the server

mongoose.connect(keys.mongodb.dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))


app.set('view engine', 'ejs');

// routes 

app.use("/", router)
app.use("/auth/", authRouter)



