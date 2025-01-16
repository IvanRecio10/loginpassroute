// Snippets de código para poder componer el programa

//?Usado?: SI
const middlewares = require('./middlewares');
//--- Explicación: Importa los middlewares definidos en middlewares.js.

// -------------------------------------------------------------------------------------

//?Usado?: SI 
const bodyParser = require('body-parser');
//--- Explicación: ermite tener acceso al objeto req.body cuando haces una peticion post.

// -------------------------------------------------------------------------------------

//?Usado?: SI
const session = require('express-session');
//--- Explicación: Para almacenar los datos de sesión en el servidor

// -------------------------------------------------------------------------------------

//?Usado?: SI 
const express = require('express');
//--- Explicación: Importa el framework Express.

// -------------------------------------------------------------------------------------

//Usado?: 
const bodyParser = require('body-parser');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: 
const session = require('express-session');
//--- Explicación:

// -------------------------------------------------------------------------------------

//?Usado?: SI 
const dotenv = require('dotenv');
//--- Explicación: Carga variables de entorno desde el archivo .env.

// -------------------------------------------------------------------------------------

//?Usado?: SI 
const middlewares = require('./middlewares');
//--- Explicación: Importa los middlewares definidos en middlewares.js.

// -------------------------------------------------------------------------------------

//?Usado?: SI 
const routes = require('./routes');
//--- Explicación: Importa las rutas definidas en routes.js.

// -------------------------------------------------------------------------------------

//?Usado?: SI 
dotenv.config();
//--- Explicación:   Activa las configuraciones del archivo .env.

// -------------------------------------------------------------------------------------

//?Usado?: SI  
const app = express();
//--- Explicación: Crea una aplicación Express.

// -------------------------------------------------------------------------------------

//?Usado?: SI 
const PORT = 4000;
//--- Explicación: Define el puerto donde se ejecutará la app.

// -------------------------------------------------------------------------------------

//Usado?: 
const dotenv = require('dotenv');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?:
dotenv.config();
//--- Explicación:

// -------------------------------------------------------------------------------------

//?Usado?: SI
middlewares.setupApp(app);
//--- Explicación: Aplica los middlewares configurados.

// -------------------------------------------------------------------------------------

//?Usado?: SI
routes.setup(app);
//--- Explicación:  Registra las rutas configuradas.

// -------------------------------------------------------------------------------------

//?Usado?: SI
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: Middleware para validar la palabra secreta.


// -------------------------------------------------------------------------------------


//?Usado?: SI
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: Después de validar o no la palabra, te muestra mensaje de error.


// -------------------------------------------------------------------------------------


//?Usado?: SI
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: Renderiza la página inicial con un formulario para ingresar la palabra.


// -------------------------------------------------------------------------------------

//?Usado?: SI
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación:

//?Usado?: SI
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: Renderiza la página de perfil después de validar la palabra.

// -------------------------------------------------------------------------------------

//?Usado?: SI
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: Procesa la info del req.body

// -------------------------------------------------------------------------------------

//Usado?:
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//?Usado?: SI
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: Se utiliza para que la web se muestre por el puerto que se le asigne.


// -------------------------------------------------------------------------------------

//?Usado?: SI
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: Middleware para acceder a la sesión luego de poner la palabra corecta

// -------------------------------------------------------------------------------------


//?Usado?: SI
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación:  Pasa por el middleware para acceder a /profile y mostrar la info.

// -------------------------------------------------------------------------------------


//?Usado?: SI
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: Para cerrar sesión

// -------------------------------------------------------------------------------------

//?Usado?: SI
module.exports = {
  setup,
};
//--- Explicación: Exporta la función

// -------------------------------------------------------------------------------------

//?Usado?: SI
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: Exporta los middlewares

// -------------------------------------------------------------------------------------