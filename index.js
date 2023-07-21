const express = require('express');
const path = require('path');
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
// use for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMdware = require('./config/middleware');
const port = 7000;

const app = express();




// middleware

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));

app.use(expressLayout);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);







// setting template engines
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store uses to store the session cookie in db
app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/my-db',
        autoRemove:'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMdware.setFlash);

app.use('/', require('./routes'));

app.listen(port, ()=> {
    console.log("Server is running on port:", port);
})