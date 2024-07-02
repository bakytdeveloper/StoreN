// const jwt = require('jsonwebtoken');
//
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
//
// const checkRole =(roles) => {
//     return (req, res, next) => {
//         if (!req.user || !roles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'Access denied' });
//         }
//         next();
//     };
// };
//
//
//
// module.exports = {authenticateToken, checkRole};


const jwt = require('jsonwebtoken');

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
//
// const checkRole = (roles) => {
//     return (req, res, next) => {
//         console.log('User role:', req.user.role);
//         if (!req.user || !roles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'Access denied' });
//         }
//         next();
//     };
// };



const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log('Token:', token);
    if (!token) {
        console.log('No token found');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            console.log('Invalid token:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user; // Устанавливаем данные пользователя в req.user
        console.log('Authenticated user:', user);
        next();
    });
};

const checkRole = (roles) => {
    return (req, res, next) => {
        console.log('User role:', req.user.role);
        if (!req.user || !roles.includes(req.user.role)) {
            console.log('Access denied for user role:', req.user.role);
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};



module.exports = {authenticateToken, checkRole};