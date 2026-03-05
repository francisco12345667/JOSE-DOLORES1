const express = require('express');
const router = express.Router();

router.post('/preguntar', async (req, res) => {
    const { mensaje } = req.body;
    // Lógica para conectar con el modelo usando la clave de config/api-keys.env
    res.json({ respuesta: "Respuesta procesada con honor patriótico." });
});

module.exports = router;