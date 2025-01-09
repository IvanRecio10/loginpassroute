const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');
require('dotenv').config(); 

const app = express();

app.use(middlewares);

app.use(routes);

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
