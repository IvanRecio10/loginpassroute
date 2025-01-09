const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <form action="/" method="POST">
      <input type="text" name="palabra" placeholder="Introduce la palabra secreta" required />
      <button type="submit">Enviar</button>
    </form>
  `);
});

router.post('/', (req, res) => {
  const { palabra } = req.body;

  if (palabra === process.env.PALABRA_SECRETA) {
    res.send('<h1>Éxito: Has introducido la palabra correcta</h1>');
  } else {
    res.send('<h1>Error: La palabra no es correcta, inténtalo de nuevo</h1><a href="/">Volver</a>');
  }
});

module.exports = router;
