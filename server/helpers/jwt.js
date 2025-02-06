const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_SECRET

const signToken = (payload) => {
    return jwt.sign(payload, privateKey);
}

const verifyToken = (token) => {
    return jwt.verify(token, privateKey);
}

module.exports = {
    signToken,
    verifyToken
};