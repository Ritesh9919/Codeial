const express = require('express');
const path = require('path');
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const port = 7000;

const app = express();




// middleware

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));

app.use(expressLayout);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);





app.use('/', require('./routes'));

// setting template engines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, ()=> {
    console.log("Server is running on port:", port);
})