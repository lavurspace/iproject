const { Wishlist, Product } = require('../models')

class WishlistController {
    static async getByUserLogin(req, res, next) {
        try {
            const { userId } = req.loginInfo

            if (!userId) throw { name: 'Unauthorized' }

            const wishlists = await Wishlist.findAll({
                where: {
                    userId: userId
                },
                include: {
                    model: Product
                }
            },)

            res.status(200).json({
                wishlists
            })
        } catch (err) {
            next(err)
        }
    }

    static async addWishlist(req, res, next) {
        try {
            const { userId } = req.loginInfo
            const { productId } = req.body

            if (!userId || !productId) throw { name: 'BadRequest' }

            const product = await Product.findOne({
                where: {
                    id: productId
                }
            })

            if (!product) throw { name: 'NotFound' }

            const isWishlist = await Wishlist.findOne({
                where: {
                    userId, productId
                }
            })

            if (isWishlist) throw { name: 'Conflict' }

            const wishlist = await Wishlist.create({
                userId: userId,
                productId
            })

            res.status(201).json({
                message: 'Add to wishlist success',
                wishlist
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteWishlist(req, res, next) {
        try {
            const { productId } = req.params
            const { userId } = req.loginInfo

            const wishlist = await Wishlist.findOne({
                where: {
                    userId, productId
                }
            })

            if (!wishlist) throw { name: 'NotFound' }

            await wishlist.destroy()

            res.status(200).json({
                message: 'Wishlist deleted'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = WishlistController