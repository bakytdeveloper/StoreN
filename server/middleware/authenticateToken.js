

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No token found');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log('Invalid token:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded; // Устанавливаем данные пользователя в req.user
        console.log('Authenticated user:', decoded);
        next();
    });
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            console.log('Access denied for user role:', req.user?.role);
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};



module.exports = {authenticateToken, checkRole};