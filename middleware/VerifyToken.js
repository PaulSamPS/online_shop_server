const jwt = require('jsonwebtoken')
const ApiError = require("../error/ApiError");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY, (e, user) => {
            if (e) res.status(403).json({message: 'Не валидный токен'})
            req.user = user
            next()
        })
    } else {
        res.status(401).json({message: 'Не авторизован'})
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('Нет доступа');
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('Нет доступа');
        }
    })
}


module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}