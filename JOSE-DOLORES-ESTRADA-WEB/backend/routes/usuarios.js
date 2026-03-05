const express = require('express');
const router = express.Router();

router.get('/perfil/:id', (req, res) => {
    res.json({
        id: req.params.id,
        nombre: "Patriota Nicaragüense",
        rango: "Sargento de Septentrión",
        misiones_completadas: 5
    });
});

module.exports = router;