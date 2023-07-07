const express = require('express');
const fileUpload = require('express-fileupload');
const routes = require('./routes');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "asddasd478asd4as8dsa478",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(routes);

app.use(cookieParser());

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(3000, () => console.log('Acesse: http://localhost:3000/Login'));
