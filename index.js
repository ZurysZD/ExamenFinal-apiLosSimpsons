const express = require('express');
const app = express();
const cors = require('cors'); //Middleware para manejar CORS
const axios = require('axios'); //solicitudes HTTP

app.use(cors()); 

app.get('/api/personajes/:nombre', async (req, res) => {
  const nombre = req.params.nombre;
  try {
    const response = await axios.get(`https://apisimpsons.fly.dev/api/personajes/find/${nombre}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos del personaje' });
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});