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

//  setting up the databases and listening to the server

mongoose.connect(keys.mongodb.dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))


app.set('view engine', 'ejs');


// Middleware 

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);



// intialize session cookie

app.use(session({ 		//Usuage
  secret: [keys.session.key],
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// intialize passport

app.use(passport.initialize());
app.use(passport.session());

// routes 

app.use("/", router)
app.use("/auth/", authRouter)



