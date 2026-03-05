module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'Acceso denegado. Se requiere autenticación.' });
    next();
};