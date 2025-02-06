import { motion } from 'framer-motion'
import { FaStar, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router'

export default function WishlistCard({ wishlist, onDelete }) {
  const navigate = useNavigate()

  if (!wishlist || !wishlist.Product) {
    return null
  }

  const { Product } = wishlist
  const { name, description, rating, stock, price, image, id: productId } = Product

  const handleClick = () => {
    navigate(`/products/${productId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        translateY: -10,
        boxShadow: "0 20px 40px rgba(255, 77, 77, 0.3)",
      }}
      className="product-card neon-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-image">
        <img src={image} alt={name} className="img-fluid rounded mb-3" />
      </div>
      <div className="product-details">
        <h3 className="product-title">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-info">
          <div className="product-rating">
            <FaStar className="star-icon" />
            <span>{rating?.toFixed(1)}</span>
          </div>
          <div className="product-stock">
            Stock: {stock}
          </div>
        </div>
        <div className="product-price gradient-text mb-3">
          Rp {price?.toLocaleString("id-ID")}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="wishlist-button neon-button-danger w-100"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(productId)
          }}
        >
          <FaTrash className="trash-icon" />
          Remove from Wishlist
        </motion.button>
      </div>
    </motion.div>
  )
}