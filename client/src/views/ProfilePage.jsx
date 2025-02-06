import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FaCamera, FaSpinner } from 'react-icons/fa'

export default function ProfilePage({ baseUrl }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [uploadLoading, setUploadLoading] = useState(false)

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${baseUrl}/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setUser(response.data.user)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch profile')
            console.error('Error fetching profile:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Preview the image
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)

        // Upload to server
        setUploadLoading(true)
        try {
            const formData = new FormData()
            formData.append('imgUrl', file)
            
            const response = await axios.patch(`${baseUrl}/profile/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            setUser(prev => ({
                ...prev,
                imgUrl: response.data.imgUrl
            }))
            setError(null)
        } catch (err) {
            setError('Failed to upload image')
        } finally {
            setUploadLoading(false)
            setImagePreview(null)
        }
    }

    if (loading) {
        return (
            <div className="container py-5 mt-5 text-center">
                <FaSpinner className="fa-spin" size={30} />
            </div>
        )
    }

    return (
        <div className="container py-5 mt-5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="row justify-content-center"
            >
                <div className="col-md-8">
                    <div className="card neon-card bg-dark text-white border-0 shadow-lg">
                        <div className="card-body p-4">
                            <div className="text-center">
                                <div className="position-relative d-inline-block mb-4">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="profile-image-container"
                                    >
                                        <img
                                            src={imagePreview || user?.imgUrl || 'https://via.placeholder.com/150'}
                                            alt={user?.name}
                                            className="rounded-circle mb-3"
                                            style={{ 
                                                width: '150px', 
                                                height: '150px', 
                                                objectFit: 'cover',
                                                border: '3px solid rgba(255, 77, 77, 0.5)',
                                                boxShadow: '0 0 15px rgba(255, 77, 77, 0.3)'
                                            }}
                                        />
                                    </motion.div>
                                </div>

                                <h2 className="gradient-text mb-3">{user?.name}</h2>
                                <p className="text-secondary mb-4">{user?.email}</p>

                                <motion.div
                                    className="d-inline-block"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <label className="btn neon-button" style={{ cursor: 'pointer' }}>
                                        <FaCamera className="me-2" />
                                        Change Profile Picture
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                </motion.div>

                                {uploadLoading && (
                                    <div className="text-center mt-3">
                                        <FaSpinner className="fa-spin me-2" />
                                        Uploading image...
                                    </div>
                                )}

                                {error && (
                                    <div className="alert alert-danger text-center mt-4">
                                        {error}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}