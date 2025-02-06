const { Wishlist } = require('../models')

const authorzation = async (req, res, next) => {
    try {
        const { userId } = req.loginInfo

        const { productId } = req.params

        if (!userId) throw { name: 'Unauthorized' }

        const wishlist = await Wishlist.findOne( {
            where: {
                productId
            }
        })

        if (!wishlist) throw { name: 'NotFound' }

        if (wishlist.userId !== userId) throw { name: 'Unauthorized' }

        next()

    } catch (err) {
        next(err)
    }
}

module.exports = authorzation