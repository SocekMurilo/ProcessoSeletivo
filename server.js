const express = require('express');
const fileUpload = require('express-fileupload');
const routes = require('./routes');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(routes);

app.use(routes);
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(3000, () => console.log('Acesse: http://localhost:3000/'));
