const User = require("../models/User");
const bcrypt = require("bcrypt");
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");


class AuthController {
    async registration(req, res, next) {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 5)
        })

        try {
            const savedUser = await newUser.save()
            const {password, ...other} = savedUser.dataValues
            res.status(200).json(other)
        } catch (e) {
            next(ApiError.internal(e))
        }
    }

    async login (req, res, next) {
        const {username} = req.body
        const user = await User.findOne({where: {username}})

        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }

        let comparePassword = bcrypt.compareSync(req.body.password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Неверный пароль'))
        }

        const token = jwt.sign({
                id: user.id,
                isAdmin: user.isAdmin
            },
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )
        const {password, ...other} = user.dataValues
        return res.status(200).json({...other, token})
    }
}

module.exports = new AuthController()