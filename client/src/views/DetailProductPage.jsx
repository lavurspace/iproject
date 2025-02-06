import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { FaStar, FaHeart, FaSpinner, FaBox, FaArrowLeft } from 'react-icons/fa'

export default function DetailProductPage({ baseUrl }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [addingToWishlist, setAddingToWishlist] = useState(false)

    useEffect(() => {
        fetchProduct()
    }, [id])

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${baseUrl}/products/${id}`)
            setProduct(response.data.product)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch product')
            console.error('Error fetching product:', err)
        } finally {
            setLoading(false)
        }
    }

    

    if (loading) {
        return (
            <div className="container py-5 mt-5 text-center">
                <FaSpinner className="fa-spin" size={30} />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container py-5 mt-5 text-center">
                <h2 className="text-danger">Product not found</h2>
            </div>
        )
    }

    return (
        <div className="container py-5 mt-5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(-1)}
                    className="btn neon-button-secondary mb-4"
                >
                    <FaArrowLeft className="me-2" />
                    Back
                </motion.button>

                <div className="row">
                    <div className="col-md-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="product-image-container"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="img-fluid rounded shadow-lg"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    border: '3px solid rgba(255, 77, 77, 0.5)',
                                    boxShadow: '0 0 15px rgba(255, 77, 77, 0.3)'
                                }}
                            />
                        </motion.div>
                    </div>

                    <div className="col-md-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="product-details"
                        >
                            <h1 className="gradient-text mb-3">{product.name}</h1>
                            
                            <div className="d-flex align-items-center mb-3">
                                <div className="me-4">
                                    <FaStar className="text-warning me-1" />
                                    <span className="text-white">{product.rating.toFixed(1)}</span>
                                </div>
                                <div>
                                    <FaBox className="text-secondary me-1" />
                                    <span className="text-white">Stock: {product.stock}</span>
                                </div>
                            </div>

                            <h2 className="neon-text mb-4">
                                Rp {product.price.toLocaleString("id-ID")}
                            </h2>

                            <p className="text-secondary mb-4" style={{ fontSize: '1.1rem' }}>
                                {product.description}
                            </p>

                            {error && (
                                <div className="alert alert-danger mb-4">
                                    {error}
                                </div>
                            )}

                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}