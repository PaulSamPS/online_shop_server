const User = require("../models/User");
const bcrypt = require("bcrypt");

class UserController {
    async changeUser (req, res) {
        const {username, password} = req.body
        const user = await User.findOne({where: {username}})

        if (req.body.password) {
            req.body.password = bcrypt.compareSync(password, user.password)
        }

        try {
            const updatedUser = await User.update(
                {
                    username: req.body.username,
                    isAdmin: req.body.isAdmin,
                    email: req.body.email
                },
                {where: {id: req.params.id}, returning: true}
            )
            const newUser = updatedUser[1][0]
            const {password, ...other} = newUser.dataValues
            res.status(200).json(other);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async deleteUser (req, res) {
        try {
            await User.destroy({where: {id: req.params.id}})
            res.status(200).json('Пользователь удалён')
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async findUser (req, res) {
        try {
            await User.findByPk(req.params.id).then(user => res.status(200).json(user))
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async findAllUsers (req, res) {
        try {
            const user = await User.findAndCountAll({offset: 5, limit: 5})
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new UserController()