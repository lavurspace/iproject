import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row g-4">
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-lg-4 col-md-6 footer-brand"
          >
            <h3 className="brand-title">Homerec Studio</h3>
            <p className="brand-description">
              Transform your space into a professional recording environment. We provide top-quality equipment and expert guidance.
            </p>
            <div className="social-links">
              <motion.a 
                whileHover={{ scale: 1.2, y: -5 }}
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaInstagram className="social-icon" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, y: -5 }}
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaYoutube className="social-icon" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, y: -5 }}
                href="https://soundcloud.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaSoundcloud className="social-icon" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-lg-4 col-md-6 footer-links"
          >
            <h4 className="links-title">Quick Links</h4>
            <ul>
              <motion.li whileHover={{ x: 10 }}>
                <a href="/#products" className="link">Equipment</a>
              </motion.li>
              <motion.li whileHover={{ x: 10 }}>
                <a href="/#room-layout" className="link">Room Layout</a>
              </motion.li>
              <motion.li whileHover={{ x: 10 }}>
                <a href="https://api.whatsapp.com/send?phone=6281225244975" target="_blank" rel="noopener noreferrer" className="link">
                  Consultation
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-lg-4 col-md-6 footer-contact"
          >
            <h4 className="contact-title">Contact Us</h4>
            <ul>
              <motion.li whileHover={{ x: 10 }}>
                <FaPhone className="contact-icon" />
                <a href="tel:+6281225244975" className="contact-link">
                  +62 812 2524 4975
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 10 }}>
                <FaEnvelope className="contact-icon" />
                <a href="mailto:info@homerecstudio.com" className="contact-link">
                  info@homerecstudio.com
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="footer-copyright"
        >
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Homerec Studio. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="footer-background" />
    </footer>
  );
}