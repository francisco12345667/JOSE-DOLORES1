const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Lógica de validación con usuarios.db
    res.json({ success: true, token: "JWT_TOKEN_ESTRADA", user: { email, rango: "Soldado" } });
});

router.post('/registro', (req, res) => {
    res.json({ success: true, msg: "Recluta registrado con éxito" });
});

module.exports = router;