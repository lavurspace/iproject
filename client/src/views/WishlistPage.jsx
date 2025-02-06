import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import WishlistCard from '../components/WishlistCard'

export default function WishlistPage({ baseUrl }) {
    const [wishlists, setWishlists] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchWishlists()
    }, [])

    const fetchWishlists = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${baseUrl}/wishlists`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setWishlists(response.data.wishlists)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch wishlists')
            console.error('Error fetching wishlists:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (wishlistId) => {
        try {
            await axios.delete(`${baseUrl}/wishlists/${wishlistId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            fetchWishlists()
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete wishlist')
            console.error('Error deleting wishlist:', err)
        }
    }

    return (
        <div className="container py-5 mt-5">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-center neon-text mb-5">My <span className="gradient-text">Wishlist</span></h1>

                {loading && (
                    <div className="text-center">
                        <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {!loading && !error && wishlists.length === 0 && (
                    <div className="text-center neon-text">
                        <h3>Your wishlist is empty</h3>
                        <p>Start adding some products to your wishlist!</p>
                    </div>
                )}

                <div className="row">
                    {wishlists.map((wishlist) => (
                        <div key={wishlist.id} className="col-md-4 mb-4">
                            <WishlistCard 
                                wishlist={wishlist} 
                                onDelete={handleDelete}
                            />
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}