const express = require('express');
const fileUpload = require('express-fileupload');
const routes = require('./routes');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
  secret: "asddasd478asd4as8dsa478",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(routes);

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
