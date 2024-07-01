const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
//
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
//
//     jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//         if (err) {
//             return res.status(401).json({ message: 'Invalid token' });
//         }
//
//         req.user = user; // Устанавливаем данные пользователя в req.user
//         next();
//     });
// };


// const authenticateToken = (req, res, next) => {
//     const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
//     console.log('Token:', token);
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
//     jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//         if (err) {
//             console.log('Invalid token:', err);
//             return res.status(401).json({ message: 'Invalid token' });
//         }
//         req.user = user; // Устанавливаем данные пользователя в req.user
//         next();
//     });
// };


const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log('Token:', token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            console.log('Invalid token:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user; // Устанавливаем данные пользователя в req.user
        next();
    });
};



const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};



module.exports = {authenticateToken, checkRole};
