
const jwt = require('jsonwebtoken');
// Middleware to check for a valid JWT token

function validateToken(req, res, next) {
    const token = req.header('Authorization');
    const secretKey=('this_is_secret')

    if (!token) {
        return res.status(401).json({ error: 'Access denied: Token not provided' });
    }

    try {
        const decodedToken = jwt.verify(token, secretKey);
        req.user = decodedToken;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Access denied: Invalid token' });
    }
}

module.exports = validateToken;
