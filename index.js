const express = require('express');
const path = require('path');
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');
const port = 7000;

const app = express();

app.use(expressLayout);

// middleware
app.use(express.urlencoded());
app.use(express.static('assets'));

// setting template engines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use('/', require('./routes'));

app.listen(port, ()=> {
    console.log("Server is running on port:", port);
})