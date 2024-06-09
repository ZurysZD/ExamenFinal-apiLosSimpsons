const express = require('express');
const axios = require('axios');
const app = express();

// Ruta para obtener todos los personajes o filtrar por nombre
app.get('/personajes', async (req, res) => {
    const { nombre } = req.query;

    try {
        // Obtener los datos de la API externa
        const response = await axios.get('https://apisimpsons.fly.dev/api/personajes');
        const personajes = response.data.docs;

        if (nombre) {
            // Filtrar personajes por nombre
            const resultados = personajes.filter(personaje =>
                personaje.Nombre.toLowerCase().includes(nombre.toLowerCase())
            );
            res.json(resultados);
        } else {
            // Si no se proporciona un nombre, devolver todos los personajes
            res.json(personajes);
        }
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener los personajes:', error);
        res.status(500).json({ error: 'Error al obtener los personajes' });
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
