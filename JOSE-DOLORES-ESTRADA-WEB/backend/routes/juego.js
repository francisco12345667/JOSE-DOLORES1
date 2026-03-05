const express = require('express');
const router = express.Router();

router.post('/guardar-progreso', (req, res) => {
    const { puntos, nivel } = req.body;
    console.log(`Guardando: ${puntos} puntos en el nivel ${nivel}`);
    res.json({ status: "Sincronizado con el Cuartel General" });
});

module.exports = router;