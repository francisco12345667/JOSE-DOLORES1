module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send("Acceso denegado: Se requiere identificación.");
    next();
};