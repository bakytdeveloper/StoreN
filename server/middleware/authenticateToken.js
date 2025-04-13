const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Проверка наличия заголовка
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is required' });
    }

    // Проверка формата "Bearer <token>"
    if (!authHeader.startsWith('Bearer ')) {
        console.log('Invalid token format. Expected "Bearer <token>"');
        return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    // Валидация токена
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log('JWT verification failed:', err.message);
            return res.status(401).json({
                message: 'Invalid token',
                error: err.message
            });
        }
        req.user = decoded;
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