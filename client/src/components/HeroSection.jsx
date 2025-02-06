import { FaMicrophone, FaHeadphones, FaWaveSquare, FaPlayCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <header className="hero-section">
      <div className="hero-content">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="hero-text"
              >
                <h1 className="hero-title neon-text">
                  Level Up Your
                  <span className="gradient-text"> Home Studio</span>
                </h1>
                <p className="hero-description">
                  Transform your space into a professional recording environment
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="https://api.whatsapp.com/send?phone=6281225244975&text=Hallo%20Home%20Rec%20di%20sini%2C%20Ada%20yang%20bisa%20dibantu%3F" className="cta-button neon-button">
                    Start Creating <FaPlayCircle className="ms-2" />
                  </a>
                </motion.div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="hero-image-container"
              >
                <FloatingCards />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-background">
        <div className="gradient-overlay"></div>
        <div className="particles"></div>
      </div>
    </header>
  )
}

function FloatingCards() {
  return (
    <div className="floating-cards">
      <FloatingCard
        icon={<FaMicrophone />}
        text="Pro Audio"
        animationDelay={0}
      />
      <FloatingCard
        icon={<FaHeadphones />}
        text="Crystal Clear"
        animationDelay={0.5}
      />
      <FloatingCard
        icon={<FaWaveSquare />}
        text="Perfect Mix"
        animationDelay={1}
      />
    </div>
  )
}

function FloatingCard({ icon, text, animationDelay }) {
  return (
    <motion.div
      className="floating-card neon-card"
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        repeatType: "reverse",
        delay: animationDelay,
      }}
    >
      {icon}
      <span>{text}</span>
    </motion.div>
  )
}