const express = require('express');
const fileUpload = require('express-fileupload');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/', routes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
