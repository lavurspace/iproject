const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) throw { name: 'Unauthorized' }

        const token = authorization.split(' ')[1]

        if (!token) throw { name: 'Unauthorized' }

        const payload = verifyToken(token)

        const user = await User.findOne({
            where: {
                email: payload.email
            }
        })

        if (!user) throw { name: 'Unauthorized' }

        req.loginInfo = {
            userId: user.id,
            name: user.name,
            email: user.email
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication