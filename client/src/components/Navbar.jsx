import { useState, useEffect } from 'react'
import { FaMusic, FaHeadphones, FaWaveSquare, FaPhone, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Navbar({ isLoggedIn, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a className="navbar-brand neon-text" href="/">
            <FaMusic className="brand-icon" /> Homerec Studio
          </a>
        </motion.div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <NavItem icon={<FaHeadphones />} text="Equipment" href="/#products" />
            <NavItem icon={<FaWaveSquare />} text="Wishlists" href="/wishlists" />
            <NavItem icon={<FaPhone />} text="Consultation" href="https://api.whatsapp.com/send?phone=6281225244975&text=Hallo%20Home%20Rec%20di%20sini%2C%20Ada%20yang%20bisa%20dibantu%3F" />
            <motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              {isLoggedIn ? (
                <motion.div className="d-flex align-items-center">
                  <a className="nav-link neon-link me-3" href="/profile">
                    <FaUser className="nav-icon" /> Profile
                  </a>
                  <button onClick={onLogout} className="nav-link logout-btn neon-button-danger">
                    <FaSignOutAlt className="nav-icon" /> Logout
                  </button>
                </motion.div>
              ) : (
                <a className="nav-link login-btn neon-button" href="/login">
                  <FaUser className="nav-icon" /> Login
                </a>
              )}
            </motion.li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

function NavItem({ icon, text, href }) {
  return (
    <motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <a className="nav-link neon-link" href={href}>
        {icon} {text}
      </a>
    </motion.li>
  )
}